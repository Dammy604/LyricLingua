const express = require("express");
const { query, param } = require("express-validator");
const crypto = require("crypto");

const { validate } = require("../../middleware/validation");
const { spotifyLimiter } = require("../../middleware/rateLimit");
const { authenticate } = require("../../middleware/auth");
const { verifyToken } = require("../../utils/tokens");
const {
  getAuthorizeUrl,
  exchangeCodeForTokens,
  refreshAccessToken,
  searchTracks: spotifySearchTracks,
  getTrack: spotifyGetTrack,
  getClientCredentialsToken,
} = require("../../utils/spotifyClient");
const { searchLocalTracks } = require("../../utils/localTracks");
const { query: dbQuery } = require("../../db");

const router = express.Router();
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

let spotifyTableInitialized = false;

const ensureSpotifyTable = async () => {
  if (spotifyTableInitialized) return;
  await dbQuery('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await dbQuery(`
    CREATE TABLE IF NOT EXISTS spotify_tokens (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id uuid NOT NULL REFERENCES users(id),
      access_token text NOT NULL,
      refresh_token text NOT NULL,
      scope text,
      expires_at timestamp NOT NULL,
      created_at timestamp DEFAULT now(),
      updated_at timestamp DEFAULT now()
    );
  `);
  await dbQuery(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_spotify_tokens_user_id
      ON spotify_tokens(user_id);
  `);
  spotifyTableInitialized = true;
};

const parseCookies = (cookieHeader) => {
  if (!cookieHeader) return {};
  return cookieHeader.split(";").reduce((acc, part) => {
    const [k, v] = part.split("=");
    if (!k || !v) return acc;
    const key = k.trim();
    const value = decodeURIComponent(v.trim());
    acc[key] = value;
    return acc;
  }, {});
};

const upsertSpotifyTokens = async (userId, tokens) => {
  await ensureSpotifyTable();
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);
  await dbQuery(
    `
      INSERT INTO spotify_tokens (user_id, access_token, refresh_token, scope, expires_at)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (user_id)
      DO UPDATE SET
        access_token = EXCLUDED.access_token,
        refresh_token = EXCLUDED.refresh_token,
        scope = EXCLUDED.scope,
        expires_at = EXCLUDED.expires_at,
        updated_at = now()
    `,
    [userId, tokens.access_token, tokens.refresh_token, tokens.scope || null, expiresAt]
  );
};

const getValidSpotifyAccessTokenForUser = async (userId) => {
  await ensureSpotifyTable();
  const result = await dbQuery(
    `
      SELECT access_token, refresh_token, expires_at
      FROM spotify_tokens
      WHERE user_id = $1
    `,
    [userId]
  );
  if (result.rows.length === 0) {
    return null;
  }
  const row = result.rows[0];
  const now = new Date();
  const expiresAt = new Date(row.expires_at);
  if (expiresAt > new Date(now.getTime() + 60 * 1000)) {
    return row.access_token;
  }

  const refreshed = await refreshAccessToken(row.refresh_token);
  await upsertSpotifyTokens(userId, {
    ...refreshed,
    refresh_token: refreshed.refresh_token || row.refresh_token,
  });
  return refreshed.access_token;
};

// ===== /api/spotify/login =====

router.get("/login", spotifyLimiter, (req, res) => {
  if (!getAuthorizeUrl) {
    return res.status(500).json({
      error: "Spotify is not configured",
      code: "SPOTIFY_CONFIG_ERROR",
    });
  }

  const state = crypto.randomBytes(16).toString("hex");

  const appToken = req.query.appToken;
  if (appToken) {
    res.cookie("spotify_app_jwt", appToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/api/spotify/callback",
    });
  }

  res.cookie("spotify_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/api/spotify/callback",
  });

  const url = getAuthorizeUrl(state);
  return res.redirect(url);
});

// ===== /api/spotify/callback =====

router.get(
  "/callback",
  [
    query("code").optional().isString(),
    query("state").optional().isString(),
    query("error").optional().isString(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { code, state, error: spotifyError } = req.query;
      if (spotifyError) {
        return res.status(400).json({
          error: spotifyError,
          code: "SPOTIFY_AUTH_ERROR",
        });
      }
      if (!code || !state) {
        return res.status(400).json({
          error: "Missing code or state",
          code: "SPOTIFY_CALLBACK_INVALID",
        });
      }

      const cookies = parseCookies(req.headers.cookie || "");
      if (!cookies.spotify_oauth_state || cookies.spotify_oauth_state !== state) {
        return res.status(400).json({
          error: "State mismatch",
          code: "SPOTIFY_STATE_MISMATCH",
        });
      }
      const appToken = cookies.spotify_app_jwt;
      if (!appToken) {
        return res.status(401).json({
          error: "App authentication required",
          code: "UNAUTHORIZED",
        });
      }
      let decoded;
      try {
        decoded = verifyToken(appToken);
      } catch {
        return res.status(401).json({
          error: "Invalid app token",
          code: "INVALID_TOKEN",
        });
      }

      const tokens = await exchangeCodeForTokens(code);
      if (!tokens || !tokens.access_token || !tokens.refresh_token) {
        return res.status(500).json({
          error: "Failed to obtain Spotify tokens",
          code: "SPOTIFY_TOKEN_ERROR",
        });
      }

      await upsertSpotifyTokens(decoded.sub, tokens);
      const redirectTarget =
        process.env.SPOTIFY_POST_CONNECT_REDIRECT ||
        "http://localhost:3000/settings";

      return res.redirect(redirectTarget);
    } catch (err) {
      return next(err);
    }
  }
);

// ===== /api/spotify/search =====

router.get(
  "/search",
  authenticate,
  spotifyLimiter,
  [
    query("q").notEmpty().trim(),
    query("type").optional().isString(),
    query("limit").optional().isInt({ min: 1, max: 50 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { q, type = "track", limit = 20 } = req.query;
      const max = parseInt(limit, 10) || 20;

      const localResults = searchLocalTracks(q, max);
      const remaining = Math.max(0, max - localResults.length);

      let remoteResults = [];

      if (remaining > 0) {
        const accessToken = await getValidSpotifyAccessTokenForUser(req.user.id);
        if (!accessToken) {
          return res.status(401).json({
            error: "Spotify not connected for this user",
            code: "SPOTIFY_NOT_CONNECTED",
          });
        }

        const response = await spotifySearchTracks(accessToken, q, type, remaining);
        const trackItems = response.tracks?.items || [];
        remoteResults = trackItems.map((item) => ({
          id: item.id,
          title: item.name,
          artist: (item.artists?.[0]?.name) || "",
          source: "spotify",
          album: item.album?.name || null,
          art: item.album?.images?.[0]?.url || null,
          preview_url: item.preview_url || null,
          file: null,
          duration: item.duration_ms ? Math.round(item.duration_ms / 1000) : null,
        }));
      }

      const results = [...localResults, ...remoteResults];

      return res.json({
        results,
        total: results.length,
        sourceBreakdown: {
          local: localResults.length,
          spotify: remoteResults.length,
        },
      });
    } catch (err) {
      return next(err);
    }
  }
);

// ===== /api/spotify/track/:id =====

router.get(
  "/track/:id",
  authenticate,
  spotifyLimiter,
  [param("id").notEmpty()],
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const accessToken = await getValidSpotifyAccessTokenForUser(req.user.id);
      if (!accessToken) {
        return res.status(401).json({
          error: "Spotify not connected for this user",
          code: "SPOTIFY_NOT_CONNECTED",
        });
      }

      const track = await spotifyGetTrack(accessToken, id);

      const artistName = track.artists?.[0]?.name || "";
      const localCandidates = searchLocalTracks(
        `${track.name} ${artistName}`,
        1
      );
      const localMatch = localCandidates[0] || null;

      return res.json({
        id: track.id,
        title: track.name,
        artist: artistName,
        album: track.album?.name || null,
        art: track.album?.images?.[0]?.url || null,
        duration: track.duration_ms ? Math.round(track.duration_ms / 1000) : null,
        source: localMatch ? "local" : "spotify",
        preview_url: track.preview_url || null,
        file: localMatch?.file || null,
      });
    } catch (err) {
      return next(err);
    }
  }
);

// ===== /api/spotify/status =====

router.get("/status", authenticate, spotifyLimiter, async (req, res, next) => {
  try {
    await ensureSpotifyTable();
    const result = await dbQuery(
      "SELECT 1 FROM spotify_tokens WHERE user_id = $1",
      [req.user.id]
    );
    return res.json({ connected: result.rows.length > 0 });
  } catch (err) {
    return next(err);
  }
});

router.get(
  "/preview/:id",
  spotifyLimiter,
  [param("id").notEmpty()],
  validate,
  async (req, res, next) => {
    try {
      if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
        return res.status(500).json({
          error: "Spotify credentials are not configured on the server.",
          code: "SPOTIFY_CONFIG_ERROR",
        });
      }
      const accessToken = await getClientCredentialsToken();
      const track = await spotifyGetTrack(accessToken, req.params.id);
      if (!track?.preview_url) {
        return res.status(404).json({
          error: "Preview unavailable for this track.",
          code: "SPOTIFY_PREVIEW_UNAVAILABLE",
        });
      }

      const artistLine = Array.isArray(track.artists)
        ? track.artists.map((artist) => artist.name).join(", ")
        : "";

      return res.json({
        id: track.id,
        title: track.name,
        artist: artistLine,
        album: track.album?.name || null,
        artwork: track.album?.images?.[0]?.url || null,
        duration_ms: track.duration_ms || null,
        preview_url: track.preview_url,
        external_url: track.external_urls?.spotify || null,
      });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;


