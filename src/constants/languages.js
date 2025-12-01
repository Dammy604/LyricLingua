/**
 * Language Constants
 * Supported languages and their configurations
 */

export const LANGUAGES = {
  // Language codes (ISO 639-1)
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    direction: 'ltr',
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    direction: 'ltr',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇧🇷',
    direction: 'ltr',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    direction: 'ltr',
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    direction: 'ltr',
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    direction: 'ltr',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    direction: 'rtl',
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    direction: 'ltr',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    direction: 'ltr',
  },
};

// Default languages
export const DEFAULT_SOURCE_LANGUAGE = 'en';
export const DEFAULT_TARGET_LANGUAGE = 'es';

// Popular language pairs
export const POPULAR_PAIRS = [
  { source: 'en', target: 'es' },
  { source: 'en', target: 'fr' },
  { source: 'en', target: 'ja' },
  { source: 'en', target: 'ko' },
  { source: 'es', target: 'en' },
  { source: 'ja', target: 'en' },
  { source: 'ko', target: 'en' },
];

// Helper functions
export const getLanguageName = (code) => LANGUAGES[code]?.name || code;
export const getLanguageFlag = (code) => LANGUAGES[code]?.flag || '🌐';
export const getLanguageNativeName = (code) => LANGUAGES[code]?.nativeName || code;
export const isRTL = (code) => LANGUAGES[code]?.direction === 'rtl';

export default LANGUAGES;




