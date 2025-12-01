const fs = require("fs");
const path = require("path");

let cache = null;

const loadLocalTracks = () => {
  if (cache) return cache;

  const filePath = path.join(__dirname, "../../../data/localTracks.json");
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    cache = Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[localTracks] Failed to load localTracks.json", err.message);
    cache = [];
  }
  return cache;
};

const normalize = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isMatch = (track, queryNorm) => {
  const titleNorm = normalize(track.title || "");
  const artistNorm = normalize(track.artist || "");
  if (!titleNorm || !artistNorm || !queryNorm) return false;

  // Deterministic rule: both normalized title and artist must appear in the query.
  return (
    queryNorm.includes(titleNorm) &&
    queryNorm.includes(artistNorm)
  );
};

const searchLocalTracks = (query, limit = 20) => {
  const q = normalize(query || "");
  if (!q) return [];

  const tracks = loadLocalTracks();

  const matches = tracks.filter((track) => isMatch(track, q));

  const sliced = matches.slice(0, limit);

  return sliced.map((track) => ({
    id: track.id,
    title: track.title,
    artist: track.artist,
    source: track.source || "local",
    album: track.album || null,
    art: track.art || null,
    preview_url: track.preview_url || null,
    file: track.file,
    duration: track.duration || null,
  }));
};

module.exports = {
  loadLocalTracks,
  searchLocalTracks,
};




