/**
 * Translation API Service
 * Handle translation requests and management
 */

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Get translation for lyrics
 * @param {string} songId - Song identifier
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} Translation data
 */
export const getTranslation = async (songId, targetLang) => {
  try {
    const response = await fetch(
      `${API_BASE}/translations/${songId}?target=${targetLang}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch translation');
    }

    return await response.json();
  } catch (error) {
    console.error('Get translation error:', error);
    throw error;
  }
};

/**
 * Translate text using machine translation
 * @param {string} text - Text to translate
 * @param {string} sourceLang - Source language code
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} Translation result
 */
export const translateText = async (text, sourceLang, targetLang) => {
  try {
    const response = await fetch(`${API_BASE}/translations/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        source: sourceLang,
        target: targetLang,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Translation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Translate text error:', error);
    throw error;
  }
};

/**
 * Submit community translation
 * @param {Object} translation - Translation data
 * @returns {Promise<Object>} Submission result
 */
export const submitTranslation = async (translation) => {
  try {
    const response = await fetch(`${API_BASE}/translations/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(translation),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit translation');
    }

    return await response.json();
  } catch (error) {
    console.error('Submit translation error:', error);
    throw error;
  }
};

/**
 * Vote on translation
 * @param {string} translationId - Translation identifier
 * @param {string} vote - 'up' or 'down'
 * @returns {Promise<Object>} Vote result
 */
export const voteTranslation = async (translationId, vote) => {
  try {
    const response = await fetch(
      `${API_BASE}/translations/${translationId}/vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote }),
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to submit vote');
    }

    return await response.json();
  } catch (error) {
    console.error('Vote translation error:', error);
    throw error;
  }
};

/**
 * Get translation history for a song
 * @param {string} songId - Song identifier
 * @param {string} targetLang - Target language code
 * @returns {Promise<Array>} Translation history
 */
export const getTranslationHistory = async (songId, targetLang) => {
  try {
    const response = await fetch(
      `${API_BASE}/translations/${songId}/history?target=${targetLang}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch translation history');
    }

    return await response.json();
  } catch (error) {
    console.error('Get translation history error:', error);
    throw error;
  }
};

export default {
  getTranslation,
  translateText,
  submitTranslation,
  voteTranslation,
  getTranslationHistory,
};




