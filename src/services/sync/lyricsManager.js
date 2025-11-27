import { fetchLyricsForSong } from '../data/libraryService';
import { MOCK_LYRICS } from '../mockData/lyrics';

const lyricsCache = new Map();

const formatLyricsPayload = (lyricsDoc) => {
  if (!lyricsDoc) {
    return null;
  }

  const availableTranslations = lyricsDoc.availableTranslations || Object.keys(lyricsDoc.translations || {});

  return {
    songId: lyricsDoc.songId,
    metadata: {
      artist: lyricsDoc.artist,
      title: lyricsDoc.title,
      album: lyricsDoc.album,
      duration: lyricsDoc.duration,
    },
    lyrics: lyricsDoc.lyrics || [],
    translations: lyricsDoc.translations || {},
    availableTranslations,
  };
};

export const lyricsManager = {
  async getLyricsBySongId(songId) {
    const cacheKey = songId;

    if (cacheKey && lyricsCache.has(cacheKey)) {
      return lyricsCache.get(cacheKey);
    }

    let rawLyrics = null;
    if (songId) {
      rawLyrics = await fetchLyricsForSong(songId);
    }

    if (!rawLyrics && songId && MOCK_LYRICS[songId]) {
      rawLyrics = MOCK_LYRICS[songId];
    }

    const payload = formatLyricsPayload(rawLyrics);

    if (payload && cacheKey) {
      lyricsCache.set(cacheKey, payload);
    }

    return payload;
  },

  async getAvailableTranslations(songId) {
    const lyrics = await this.getLyricsBySongId(songId);
    return lyrics?.availableTranslations || [];
  },

  clearCache(songId) {
    if (songId) {
      lyricsCache.delete(songId);
    } else {
      lyricsCache.clear();
    }
  },
};

export default lyricsManager;

