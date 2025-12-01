/**
 * User Slice
 * Manages user authentication and preferences
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Authentication
  isAuthenticated: false,
  user: null,
  token: null,

  // Profile
  profile: {
    displayName: 'Guest',
    avatar: null,
    nativeLanguage: 'en',
    learningLanguages: [],
  },

  // Learning progress
  progress: {
    songsLearned: 0,
    wordsLearned: 0,
    totalTime: 0,
    currentStreak: 0,
    longestStreak: 0,
    dailyGoal: 10,
    todayProgress: 0,
  },

  // Preferences
  preferences: {
    theme: 'dark',
    autoPlay: true,
    karaokeMode: true,
    showRomanization: true,
    hapticFeedback: true,
    soundEffects: true,
    downloadQuality: 'high',
    offlineMode: 'auto',
  },

  // Notifications
  notifications: {
    enabled: false,
    reminderTime: null,
    dailyReminder: false,
    streakReminder: true,
  },

  // Loading states
  isLoading: false,
  isUpdating: false,

  // Errors
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Authentication
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.profile = { ...state.profile, ...action.payload.profile };
      state.error = null;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.profile = initialState.profile;
      state.progress = initialState.progress;
    },

    // Profile updates
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    setLearningLanguages: (state, action) => {
      state.profile.learningLanguages = action.payload;
    },

    addLearningLanguage: (state, action) => {
      if (!state.profile.learningLanguages.includes(action.payload)) {
        state.profile.learningLanguages.push(action.payload);
      }
    },

    removeLearningLanguage: (state, action) => {
      state.profile.learningLanguages = state.profile.learningLanguages.filter(
        (lang) => lang !== action.payload
      );
    },

    // Progress updates
    updateProgress: (state, action) => {
      state.progress = { ...state.progress, ...action.payload };
    },

    incrementSongsLearned: (state) => {
      state.progress.songsLearned += 1;
    },

    incrementWordsLearned: (state, action) => {
      state.progress.wordsLearned += action.payload || 1;
    },

    addLearningTime: (state, action) => {
      state.progress.totalTime += action.payload;
    },

    updateDailyProgress: (state, action) => {
      state.progress.todayProgress = action.payload;
    },

    incrementStreak: (state) => {
      state.progress.currentStreak += 1;
      if (state.progress.currentStreak > state.progress.longestStreak) {
        state.progress.longestStreak = state.progress.currentStreak;
      }
    },

    resetStreak: (state) => {
      state.progress.currentStreak = 0;
    },

    setDailyGoal: (state, action) => {
      state.progress.dailyGoal = action.payload;
    },

    // Preferences
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },

    togglePreference: (state, action) => {
      const key = action.payload;
      if (typeof state.preferences[key] === 'boolean') {
        state.preferences[key] = !state.preferences[key];
      }
    },

    // Notifications
    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },

    // Loading states
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },

    // Error handling
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isUpdating = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  login,
  logout,
  updateProfile,
  setLearningLanguages,
  addLearningLanguage,
  removeLearningLanguage,
  updateProgress,
  incrementSongsLearned,
  incrementWordsLearned,
  addLearningTime,
  updateDailyProgress,
  incrementStreak,
  resetStreak,
  setDailyGoal,
  updatePreferences,
  togglePreference,
  updateNotifications,
  setLoading,
  setUpdating,
  setError,
  clearError,
} = userSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUser = (state) => state.user.user;
export const selectProfile = (state) => state.user.profile;
export const selectProgress = (state) => state.user.progress;
export const selectPreferences = (state) => state.user.preferences;
export const selectNotifications = (state) => state.user.notifications;

export default userSlice.reducer;




