/**
 * Redux Store Configuration
 */

import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './slices/audioSlice';
import lyricsReducer from './slices/lyricsSlice';
import userReducer from './slices/userSlice';
import communityReducer from './slices/communitySlice';

export const store = configureStore({
  reducer: {
    audio: audioReducer,
    lyrics: lyricsReducer,
    user: userReducer,
    community: communityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['audio/updatePlaybackStatus'],
        ignoredPaths: ['audio.playback.currentTime'],
      },
    }),
});

export default store;




