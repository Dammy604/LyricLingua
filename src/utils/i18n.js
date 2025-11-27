/**
 * Internationalization Utility
 * Handle app translations and localization
 */

import { LANGUAGES } from '../constants/languages';

// Default translations (English)
const translations = {
  en: {
    // Navigation
    home: 'Home',
    search: 'Search',
    library: 'Library',
    learn: 'Learn',
    community: 'Community',
    profile: 'Profile',
    settings: 'Settings',

    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    done: 'Done',
    next: 'Next',
    back: 'Back',
    close: 'Close',

    // Home
    welcomeBack: 'Welcome back!',
    continuelearning: 'Continue Learning',
    quickActions: 'Quick Actions',
    featuredSongs: 'Featured Songs',
    yourProgress: 'Your Progress',
    songs: 'Songs',
    words: 'Words',
    streak: 'Streak',

    // Search
    searchPlaceholder: 'Search songs, artists, or lyrics...',
    byLanguage: 'By Language',
    browseByGenre: 'Browse by Genre',
    trendingNow: 'Trending Now',
    recentSearches: 'Recent Searches',

    // Library
    myLibrary: 'My Library',
    all: 'All',
    inProgress: 'In Progress',
    completed: 'Completed',
    favorites: 'Favorites',
    recentlyPlayed: 'Recently Played',
    downloaded: 'Downloaded',
    playlists: 'Playlists',
    createPlaylist: 'Create Playlist',
    emptyLibrary: 'Your library is empty',
    emptyLibraryDesc: 'Start adding songs from the Search tab',

    // Learn
    practice: 'Practice',
    dailyGoal: 'Daily Goal',
    wordsToReview: 'Words to Review',
    practiceModes: 'Practice Modes',
    flashcards: 'Flashcards',
    fillInBlanks: 'Fill in the Blanks',
    listeningQuiz: 'Listening Quiz',
    matchWords: 'Match Words',
    achievements: 'Achievements',

    // Community
    activityFeed: 'Activity Feed',
    translations: 'Translations',
    culturalNotes: 'Cultural Notes',
    following: 'Following',
    contributions: 'Your Contributions',
    topContributors: 'Top Contributors',
    addTranslation: 'Add Translation',
    writeNote: 'Write Note',

    // Player
    nowPlaying: 'Now Playing',
    lyrics: 'Lyrics',
    original: 'Original',
    translation: 'Translation',
    dualView: 'Dual View',

    // Profile
    guestUser: 'Guest User',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    learningStats: 'Learning Stats',
    targetLanguage: 'Target Language',
    nativeLanguage: 'Native Language',
    reminderSettings: 'Reminder Settings',
    appSettings: 'App Settings',
    help: 'Help & FAQ',
    feedback: 'Send Feedback',
    about: 'About',

    // Errors
    networkError: 'Network error. Please check your connection.',
    unknownError: 'Something went wrong. Please try again.',
    loadError: 'Failed to load content.',
  },
};

let currentLanguage = 'en';

/**
 * Set the app language
 * @param {string} langCode - Language code
 */
export const setLanguage = (langCode) => {
  if (translations[langCode]) {
    currentLanguage = langCode;
  }
};

/**
 * Get current language
 * @returns {string} Current language code
 */
export const getLanguage = () => currentLanguage;

/**
 * Get translation for a key
 * @param {string} key - Translation key
 * @param {Object} params - Interpolation parameters
 * @returns {string} Translated string
 */
export const t = (key, params = {}) => {
  const langTranslations = translations[currentLanguage] || translations.en;
  let text = langTranslations[key] || translations.en[key] || key;

  // Handle interpolation
  Object.keys(params).forEach((param) => {
    text = text.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
  });

  return text;
};

/**
 * Get language display name
 * @param {string} code - Language code
 * @returns {string} Display name
 */
export const getLanguageName = (code) => {
  return LANGUAGES[code]?.name || code;
};

/**
 * Get language native name
 * @param {string} code - Language code
 * @returns {string} Native name
 */
export const getLanguageNativeName = (code) => {
  return LANGUAGES[code]?.nativeName || code;
};

/**
 * Get language flag emoji
 * @param {string} code - Language code
 * @returns {string} Flag emoji
 */
export const getLanguageFlag = (code) => {
  return LANGUAGES[code]?.flag || '🌐';
};

/**
 * Check if language is RTL
 * @param {string} code - Language code
 * @returns {boolean}
 */
export const isRTL = (code) => {
  return LANGUAGES[code]?.direction === 'rtl';
};

/**
 * Format number with locale
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  return new Intl.NumberFormat(currentLanguage).format(num);
};

/**
 * Format date with locale
 * @param {Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat(currentLanguage, {
    ...defaultOptions,
    ...options,
  }).format(date);
};

/**
 * Get relative time string
 * @param {Date} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return formatDate(date);
};

export default {
  setLanguage,
  getLanguage,
  t,
  getLanguageName,
  getLanguageNativeName,
  getLanguageFlag,
  isRTL,
  formatNumber,
  formatDate,
  getRelativeTime,
};




