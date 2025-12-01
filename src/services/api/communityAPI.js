/**
 * Community API Service
 * Handle community features and social interactions
 */

const API_BASE =
  process.env.EXPO_PUBLIC_API_URL || 'https://lyriclingua-api.onrender.com/api';

/**
 * Get community feed
 * @param {Object} params - Feed parameters
 * @returns {Promise<Array>} Feed posts
 */
export const getFeed = async ({ page = 1, limit = 20, type = 'all' }) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      type,
    });

    const response = await fetch(`${API_BASE}/community/feed?${params}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch feed');
    }

    return await response.json();
  } catch (error) {
    console.error('Get feed error:', error);
    throw error;
  }
};

/**
 * Create a post
 * @param {Object} post - Post data
 * @returns {Promise<Object>} Created post
 */
export const createPost = async (post) => {
  try {
    const response = await fetch(`${API_BASE}/community/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    return await response.json();
  } catch (error) {
    console.error('Create post error:', error);
    throw error;
  }
};

/**
 * Like a post
 * @param {string} postId - Post identifier
 * @returns {Promise<Object>} Like result
 */
export const likePost = async (postId) => {
  try {
    const response = await fetch(`${API_BASE}/community/posts/${postId}/like`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to like post');
    }

    return await response.json();
  } catch (error) {
    console.error('Like post error:', error);
    throw error;
  }
};

/**
 * Add cultural note
 * @param {Object} note - Note data
 * @returns {Promise<Object>} Created note
 */
export const addCulturalNote = async (note) => {
  try {
    const response = await fetch(`${API_BASE}/community/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add cultural note');
    }

    return await response.json();
  } catch (error) {
    console.error('Add cultural note error:', error);
    throw error;
  }
};

/**
 * Get cultural notes for a song
 * @param {string} songId - Song identifier
 * @returns {Promise<Array>} Cultural notes
 */
export const getCulturalNotes = async (songId) => {
  try {
    const response = await fetch(`${API_BASE}/community/notes/${songId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch cultural notes');
    }

    return await response.json();
  } catch (error) {
    console.error('Get cultural notes error:', error);
    throw error;
  }
};

/**
 * Get top contributors
 * @param {number} limit - Number of contributors to fetch
 * @returns {Promise<Array>} Top contributors
 */
export const getTopContributors = async (limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE}/community/contributors?limit=${limit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch contributors');
    }

    return await response.json();
  } catch (error) {
    console.error('Get top contributors error:', error);
    throw error;
  }
};

/**
 * Follow a user
 * @param {string} userId - User identifier
 * @returns {Promise<Object>} Follow result
 */
export const followUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE}/community/follow/${userId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to follow user');
    }

    return await response.json();
  } catch (error) {
    console.error('Follow user error:', error);
    throw error;
  }
};

/**
 * Unfollow a user
 * @param {string} userId - User identifier
 * @returns {Promise<Object>} Unfollow result
 */
export const unfollowUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE}/community/unfollow/${userId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to unfollow user');
    }

    return await response.json();
  } catch (error) {
    console.error('Unfollow user error:', error);
    throw error;
  }
};

export default {
  getFeed,
  createPost,
  likePost,
  addCulturalNote,
  getCulturalNotes,
  getTopContributors,
  followUser,
  unfollowUser,
};




