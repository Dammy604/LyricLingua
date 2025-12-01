/**
 * Lyrics API Service
 * Handle lyrics fetching and management
 */

const API_BASE =
  process.env.EXPO_PUBLIC_API_URL || 'https://lyriclingua-api.onrender.com/api';

/**
 * Search for lyrics
 * @param {Object} params - Search parameters
 * @returns {Promise<Array>} Search results
 */
export const searchLyrics = async ({ query, language, limit = 20, offset = 0 }) => {
  try {
    const params = new URLSearchParams({
      q: query,
      ...(language && { lang: language }),
      limit: String(limit),
      offset: String(offset),
    });

    const response = await fetch(`${API_BASE}/lyrics/search?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to search lyrics');
    }

    return await response.json();
  } catch (error) {
    console.error('Search lyrics error:', error);
    throw error;
  }
};

/**
 * Get lyrics by song ID
 * @param {string} songId - Song identifier
 * @returns {Promise<Object>} Lyrics data
 */
export const getLyrics = async (songId) => {
  try {
    const response = await fetch(`${API_BASE}/lyrics/${songId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch lyrics');
    }

    return await response.json();
  } catch (error) {
    console.error('Get lyrics error:', error);
    throw error;
  }
};

/**
 * Get synchronized lyrics (LRC format)
 * @param {string} songId - Song identifier
 * @returns {Promise<Object>} Synced lyrics data
 */
export const getSyncedLyrics = async (songId) => {
  try {
    const response = await fetch(`${API_BASE}/lyrics/${songId}/synced`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch synced lyrics');
    }

    return await response.json();
  } catch (error) {
    console.error('Get synced lyrics error:', error);
    throw error;
  }
};

/**
 * Submit lyrics correction
 * @param {string} songId - Song identifier
 * @param {Object} correction - Correction data
 * @returns {Promise<Object>} Submission result
 */
export const submitCorrection = async (songId, correction) => {
  try {
    const response = await fetch(`${API_BASE}/lyrics/${songId}/corrections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(correction),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit correction');
    }

    return await response.json();
  } catch (error) {
    console.error('Submit correction error:', error);
    throw error;
  }
};

/**
 * Report lyrics issue
 * @param {string} songId - Song identifier
 * @param {Object} report - Report data
 * @returns {Promise<Object>} Report result
 */
export const reportLyrics = async (songId, report) => {
  try {
    const response = await fetch(`${API_BASE}/lyrics/${songId}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit report');
    }

    return await response.json();
  } catch (error) {
    console.error('Report lyrics error:', error);
    throw error;
  }
};

export default {
  searchLyrics,
  getLyrics,
  getSyncedLyrics,
  submitCorrection,
  reportLyrics,
};




