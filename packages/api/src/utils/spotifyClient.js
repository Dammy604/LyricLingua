const https = require("https");

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} = process.env;
let cachedClientToken = null;
let cachedClientTokenExpiry = 0;

const SPOTIFY_ACCOUNTS_HOST = "accounts.spotify.com";
const SPOTIFY_API_HOST = "api.spotify.com";

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REDIRECT_URI) {
  // eslint-disable-next-line no-console
  console.warn(
    "[spotifyClient] SPOTIFY_CLIENT_ID/SECRET/REDIRECT_URI not fully configured. Spotify endpoints will be disabled."
  );
}

const encodeForm = (params) =>
  Object.entries(params)
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`
    )
    .join("&");

const httpRequest = (options, body) =>
  new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data || "{}");
          if (res.statusCode >= 400) {
            const err = new Error(
              parsed.error_description || parsed.error || "Spotify API error"
            );
            err.status = res.statusCode;
            err.body = parsed;
            reject(err);
          } else {
            resolve(parsed);
          }
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on("error", reject);

    if (body) {
      req.write(body);
    }
    req.end();
  });

const getAuthorizeUrl = (state) => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID || "",
    redirect_uri: SPOTIFY_REDIRECT_URI || "",
    scope: [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
    ].join(" "),
    state,
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

const exchangeCodeForTokens = async (code) => {
  const body = encodeForm({
    grant_type: "authorization_code",
    code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
  });

  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const options = {
    host: SPOTIFY_ACCOUNTS_HOST,
    path: "/api/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basic}`,
      "Content-Length": Buffer.byteLength(body),
    },
  };

  return httpRequest(options, body);
};

const refreshAccessToken = async (refreshToken) => {
  const body = encodeForm({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const options = {
    host: SPOTIFY_ACCOUNTS_HOST,
    path: "/api/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basic}`,
      "Content-Length": Buffer.byteLength(body),
    },
  };

  return httpRequest(options, body);
};

const getClientCredentialsToken = async () => {
  if (
    cachedClientToken &&
    cachedClientTokenExpiry &&
    Date.now() < cachedClientTokenExpiry - 60_000
  ) {
    return cachedClientToken;
  }

  const body = encodeForm({
    grant_type: "client_credentials",
  });

  const basic = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const options = {
    host: SPOTIFY_ACCOUNTS_HOST,
    path: "/api/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basic}`,
      "Content-Length": Buffer.byteLength(body),
    },
  };

  const response = await httpRequest(options, body);
  cachedClientToken = response.access_token;
  cachedClientTokenExpiry = Date.now() + (response.expires_in || 3600) * 1000;
  return cachedClientToken;
};

const apiGet = (accessToken, path) => {
  const options = {
    host: SPOTIFY_API_HOST,
    path,
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest(options);
};

const searchTracks = async (accessToken, query, type = "track", limit = 20) => {
  const params = new URLSearchParams({
    q: query,
    type,
    limit: String(limit),
  });
  return apiGet(accessToken, `/v1/search?${params.toString()}`);
};

const getTrack = async (accessToken, id) => {
  return apiGet(accessToken, `/v1/tracks/${encodeURIComponent(id)}`);
};

module.exports = {
  getAuthorizeUrl,
  exchangeCodeForTokens,
  refreshAccessToken,
  getClientCredentialsToken,
  searchTracks,
  getTrack,
};




