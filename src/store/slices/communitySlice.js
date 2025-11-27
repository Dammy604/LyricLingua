/**
 * Community Slice
 * Manages community content and social features
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Feed
  feed: [],
  feedPage: 1,
  hasMoreFeed: true,

  // Translations
  translations: [],
  userTranslations: [],

  // Cultural notes
  culturalNotes: [],

  // Contributors
  topContributors: [],

  // User stats
  contributions: {
    translations: 0,
    notes: 0,
    likes: 0,
    verified: 0,
  },

  // Following
  following: [],
  followers: [],

  // Loading states
  isLoadingFeed: false,
  isLoadingTranslations: false,
  isSubmitting: false,

  // Errors
  error: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    // Feed
    setFeed: (state, action) => {
      state.feed = action.payload;
      state.feedPage = 1;
    },

    appendFeed: (state, action) => {
      state.feed = [...state.feed, ...action.payload];
      state.feedPage += 1;
    },

    setHasMoreFeed: (state, action) => {
      state.hasMoreFeed = action.payload;
    },

    addToFeed: (state, action) => {
      state.feed.unshift(action.payload);
    },

    // Translations
    setTranslations: (state, action) => {
      state.translations = action.payload;
    },

    addTranslation: (state, action) => {
      state.translations.unshift(action.payload);
      state.contributions.translations += 1;
    },

    updateTranslation: (state, action) => {
      const index = state.translations.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.translations[index] = action.payload;
      }
    },

    setUserTranslations: (state, action) => {
      state.userTranslations = action.payload;
    },

    // Cultural notes
    setCulturalNotes: (state, action) => {
      state.culturalNotes = action.payload;
    },

    addCulturalNote: (state, action) => {
      state.culturalNotes.unshift(action.payload);
      state.contributions.notes += 1;
    },

    // Contributors
    setTopContributors: (state, action) => {
      state.topContributors = action.payload;
    },

    // User contributions
    setContributions: (state, action) => {
      state.contributions = action.payload;
    },

    incrementLikes: (state) => {
      state.contributions.likes += 1;
    },

    // Following
    setFollowing: (state, action) => {
      state.following = action.payload;
    },

    addFollowing: (state, action) => {
      state.following.push(action.payload);
    },

    removeFollowing: (state, action) => {
      state.following = state.following.filter((id) => id !== action.payload);
    },

    setFollowers: (state, action) => {
      state.followers = action.payload;
    },

    // Voting
    upvoteItem: (state, action) => {
      const { type, id } = action.payload;
      let items = type === 'translation' ? state.translations : state.culturalNotes;
      const item = items.find((i) => i.id === id);
      if (item) {
        item.upvotes = (item.upvotes || 0) + 1;
        item.userVoted = 'up';
      }
    },

    downvoteItem: (state, action) => {
      const { type, id } = action.payload;
      let items = type === 'translation' ? state.translations : state.culturalNotes;
      const item = items.find((i) => i.id === id);
      if (item) {
        item.downvotes = (item.downvotes || 0) + 1;
        item.userVoted = 'down';
      }
    },

    // Loading states
    setLoadingFeed: (state, action) => {
      state.isLoadingFeed = action.payload;
    },

    setLoadingTranslations: (state, action) => {
      state.isLoadingTranslations = action.payload;
    },

    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },

    // Error handling
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoadingFeed = false;
      state.isLoadingTranslations = false;
      state.isSubmitting = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Reset
    resetCommunity: () => initialState,
  },
});

export const {
  setFeed,
  appendFeed,
  setHasMoreFeed,
  addToFeed,
  setTranslations,
  addTranslation,
  updateTranslation,
  setUserTranslations,
  setCulturalNotes,
  addCulturalNote,
  setTopContributors,
  setContributions,
  incrementLikes,
  setFollowing,
  addFollowing,
  removeFollowing,
  setFollowers,
  upvoteItem,
  downvoteItem,
  setLoadingFeed,
  setLoadingTranslations,
  setSubmitting,
  setError,
  clearError,
  resetCommunity,
} = communitySlice.actions;

// Selectors
export const selectFeed = (state) => state.community.feed;
export const selectTranslations = (state) => state.community.translations;
export const selectCulturalNotes = (state) => state.community.culturalNotes;
export const selectContributions = (state) => state.community.contributions;
export const selectTopContributors = (state) => state.community.topContributors;

export default communitySlice.reducer;




