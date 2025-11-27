/**
 * Shared TypeScript Types
 */

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  nativeLanguage: string;
  learningLanguages: string[];
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  autoPlay: boolean;
  karaokeMode: boolean;
  showRomanization: boolean;
  hapticFeedback: boolean;
  dailyGoal: number;
}

// Song types
export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  language: string;
  duration: number;
  genre?: string;
  coverUrl?: string;
  audioUrl?: string;
}

// Lyrics types
export interface Lyrics {
  id: string;
  songId: string;
  plainText: string;
  syncedLyrics: SyncedLine[];
  language: string;
}

export interface SyncedLine {
  time: number;
  text: string;
  romanization?: string;
}

// Translation types
export interface Translation {
  id: string;
  lyricsId: string;
  targetLanguage: string;
  translatedText: string;
  syncedTranslation: TranslatedLine[];
  source: 'google' | 'deepl' | 'community';
  upvotes: number;
  submittedBy?: string;
}

export interface TranslatedLine {
  time: number;
  original: string;
  translated: string;
}

// Progress types
export interface LearningProgress {
  userId: string;
  songId: string;
  progressPercent: number;
  wordsLearned: string[];
  timeSpent: number;
  completed: boolean;
}

// Community types
export interface Post {
  id: string;
  userId: string;
  type: 'post' | 'translation' | 'note';
  content: string;
  songId?: string;
  likes: number;
  commentsCount: number;
  createdAt: Date;
}

export interface CulturalNote {
  id: string;
  songId: string;
  content: string;
  authorId: string;
  upvotes: number;
  createdAt: Date;
}







