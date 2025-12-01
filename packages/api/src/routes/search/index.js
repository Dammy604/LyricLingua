/**
 * Unified Search Route
 *
 * GET /api/search?q=...&limit=20
 * - Returns local tracks first (source: 'local').
 * - Spotify-backed results will be appended in a later step.
 */

const express = require("express");
const { query } = require("express-validator");

const { validate } = require("../../middleware/validation");
const { searchLocalTracks } = require("../../utils/localTracks");
const { authenticate, optionalAuth } = require("../../middleware/auth");
const {
  searchTracks: spotifySearchTracks,
} = require("../../utils/spotifyClient");
const { query: dbQuery } = require("../../db");

const router = express.Router();

router.get(
  "/",
  optionalAuth,
  [
    query("q").notEmpty().trim(),
    query("limit").optional().isInt({ min: 1, max: 50 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { q, limit = 20 } = req.query;
      const max = parseInt(limit, 10) || 20;

      const localResults = searchLocalTracks(q, max);
      let remoteResults = [];

      const remaining = Math.max(0, max - localResults.length);

      if (remaining > 0 && req.user && req.user.id) {
        const spotifyRow = await dbQuery(
          "SELECT access_token, refresh_token, expires_at FROM spotify_tokens WHERE user_id = $1",
          [req.user.id]
        );
        if (spotifyRow.rows.length > 0) {
          const accessToken = spotifyRow.rows[0].access_token;
          try {
            const response = await spotifySearchTracks(
              accessToken,
              q,
              "track",
              remaining
            );
            const items = response.tracks?.items || [];
            remoteResults = items.map((item) => ({
              id: item.id,
              title: item.name,
              artist: (item.artists?.[0]?.name) || "",
              source: "spotify",
              album: item.album?.name || null,
              art: item.album?.images?.[0]?.url || null,
              preview_url: item.preview_url || null,
              file: null,
              duration: item.duration_ms
                ? Math.round(item.duration_ms / 1000)
                : null,
            }));
          } catch {
            // If Spotify fails, we still return local results
            remoteResults = [];
          }
        }
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

module.exports = router;


