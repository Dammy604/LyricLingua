/**
 * Audio API Service
 * Handle audio streaming and playback
 */

const API_BASE =
  process.env.EXPO_PUBLIC_API_URL || 'https://lyriclingua-api.onrender.com/api';

/**
 * Get audio stream URL for a song
 * @param {string} songId - Song identifier
 * @returns {Promise<Object>} Stream info
 */
export const getAudioStream = async (songId) => {
  try {
    const response = await fetch(`${API_BASE}/audio/stream/${songId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get audio stream');
    }

    return await response.json();
  } catch (error) {
    console.error('Get audio stream error:', error);
    throw error;
  }
};

/**
 * Get song metadata
 * @param {string} songId - Song identifier
 * @returns {Promise<Object>} Song metadata
 */
export const getSongMetadata = async (songId) => {
  try {
    const response = await fetch(`${API_BASE}/audio/metadata/${songId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get song metadata');
    }

    return await response.json();
  } catch (error) {
    console.error('Get song metadata error:', error);
    throw error;
  }
};

/**
 * Search for songs
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} Search results
 */
export const searchSongs = async ({ query, language, genre, limit = 20, offset = 0 }) => {
  try {
    const params = new URLSearchParams({
      q: query,
      ...(language && { lang: language }),
      ...(genre && { genre }),
      limit: String(limit),
      offset: String(offset),
    });

    const response = await fetch(`${API_BASE}/audio/search?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to search songs');
    }

    return await response.json();
  } catch (error) {
    console.error('Search songs error:', error);
    throw error;
  }
};

/**
 * Get trending songs
 * @param {Object} params - Parameters
 * @returns {Promise<Array>} Trending songs
 */
export const getTrendingSongs = async ({ language, limit = 20 }) => {
  try {
    const params = new URLSearchParams({
      ...(language && { lang: language }),
      limit: String(limit),
    });

    const response = await fetch(`${API_BASE}/audio/trending?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to get trending songs');
    }

    return await response.json();
  } catch (error) {
    console.error('Get trending songs error:', error);
    throw error;
  }
};

/**
 * Get recommended songs
 * @param {number} limit - Number of recommendations
 * @returns {Promise<Array>} Recommended songs
 */
export const getRecommendations = async (limit = 20) => {
  try {
    const response = await fetch(
      `${API_BASE}/audio/recommendations?limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }

    return await response.json();
  } catch (error) {
    console.error('Get recommendations error:', error);
    throw error;
  }
};

/**
 * Record play event
 * @param {string} songId - Song identifier
 * @param {Object} data - Play event data
 * @returns {Promise<Object>} Event result
 */
export const recordPlayEvent = async (songId, data) => {
  try {
    const response = await fetch(`${API_BASE}/audio/play/${songId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to record play event');
    }

    return await response.json();
  } catch (error) {
    console.error('Record play event error:', error);
    // Non-critical, don't throw
    return null;
  }
};

export default {
  getAudioStream,
  getSongMetadata,
  searchSongs,
  getTrendingSongs,
  getRecommendations,
  recordPlayEvent,
};




