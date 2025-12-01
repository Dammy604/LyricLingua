/**
 * Audio Slice
 * Manages audio playback state
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTrack: null,
  playback: {
    status: 'idle', // idle | loading | ready | error
    isPlaying: false,
    isBuffering: false,
    currentTime: 0,
    duration: 0,
    volume: 1.0,
    rate: 1.0,
    repeatMode: 'off', // off | one | all
    shuffle: false,
  },
  queue: [],
  history: [],
  error: null,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
      state.playback.currentTime = 0;
      state.playback.duration = action.payload?.duration || 0;
      state.error = null;
    },
    clearCurrentTrack: (state) => {
      state.currentTrack = null;
      state.playback = {
        ...state.playback,
        status: 'idle',
        isPlaying: false,
        currentTime: 0,
        duration: 0,
      };
    },
    updatePlaybackStatus: (state, action) => {
      state.playback = {
        ...state.playback,
        ...action.payload,
      };
    },
    setQueue: (state, action) => {
      state.queue = action.payload || [];
    },
    enqueueTrack: (state, action) => {
      state.queue.push(action.payload);
    },
    dequeueTrack: (state) => {
      state.queue.shift();
    },
    pushHistory: (state, action) => {
      state.history = [action.payload, ...state.history].slice(0, 25);
    },
    clearHistory: (state) => {
      state.history = [];
    },
    setVolume: (state, action) => {
      state.playback.volume = action.payload;
    },
    setRate: (state, action) => {
      state.playback.rate = action.payload;
    },
    setRepeatMode: (state, action) => {
      state.playback.repeatMode = action.payload;
    },
    toggleShuffle: (state) => {
      state.playback.shuffle = !state.playback.shuffle;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.playback.status = 'error';
    },
    clearError: (state) => {
      state.error = null;
      if (state.playback.status === 'error') {
        state.playback.status = 'idle';
      }
    },
  },
});

export const {
  setCurrentTrack,
  clearCurrentTrack,
  updatePlaybackStatus,
  setQueue,
  enqueueTrack,
  dequeueTrack,
  pushHistory,
  clearHistory,
  setVolume,
  setRate,
  setRepeatMode,
  toggleShuffle,
  setError,
  clearError,
} = audioSlice.actions;

export const selectCurrentTrack = (state) => state.audio.currentTrack;
export const selectPlaybackState = (state) => state.audio.playback;
export const selectQueue = (state) => state.audio.queue;
export const selectHistory = (state) => state.audio.history;

export default audioSlice.reducer;




