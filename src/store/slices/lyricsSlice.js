/**
 * Lyrics Slice
 * Manages lyrics display and synchronization state
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLyrics: null,
  currentLineIndex: -1,
  viewMode: 'original', // original | translation | dual
  availableTranslations: [],
  activeTranslation: null,
  isLoading: false,
  error: null,
};

const lyricsSlice = createSlice({
  name: 'lyrics',
  initialState,
  reducers: {
    setLyricsData: (state, action) => {
      state.currentLyrics = action.payload;
      state.currentLineIndex = 0;
      const translations = action.payload?.availableTranslations || [];
      state.availableTranslations = translations;
      if (!translations.length) {
        state.activeTranslation = null;
      } else if (!state.activeTranslation || !translations.includes(state.activeTranslation)) {
        state.activeTranslation = translations[0];
      }
      state.error = null;
    },
    clearLyrics: (state) => {
      state.currentLyrics = null;
      state.currentLineIndex = -1;
      state.availableTranslations = [];
      state.activeTranslation = null;
    },
    setCurrentLineIndex: (state, action) => {
      state.currentLineIndex = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setAvailableTranslations: (state, action) => {
      const translations = action.payload || [];
      state.availableTranslations = translations;
      if (!translations.length) {
        state.activeTranslation = null;
      } else if (!translations.includes(state.activeTranslation)) {
        state.activeTranslation = translations[0];
      }
    },
    setActiveTranslation: (state, action) => {
      state.activeTranslation = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLyricsData,
  clearLyrics,
  setCurrentLineIndex,
  setViewMode,
  setAvailableTranslations,
  setActiveTranslation,
  setLoading,
  setError,
  clearError,
} = lyricsSlice.actions;

export const selectLyricsState = (state) => state.lyrics;
export const selectLyricsLines = (state) => state.lyrics.currentLyrics?.lyrics || [];
export const selectLyricsMetadata = (state) => state.lyrics.currentLyrics?.metadata || null;

export default lyricsSlice.reducer;




