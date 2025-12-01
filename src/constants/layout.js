/**
 * Layout Constants
 * Spacing, sizing, and layout tokens
 */

import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const LAYOUT = {
  // Screen dimensions
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },

  // Spacing scale
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
    '4xl': 48,
    '5xl': 64,
  },

  // Border radius
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    '3xl': 24,
    full: 9999,
  },

  // Typography sizes
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Font weights
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Component heights
  heights: {
    button: 48,
    buttonSmall: 36,
    input: 48,
    header: 56,
    tabBar: Platform.OS === 'ios' ? 84 : 64,
    playerMini: 64,
    playerFull: SCREEN_HEIGHT * 0.9,
  },

  // Component heights alias for clarity
  componentHeights: {
    primaryButton: 48,
    secondaryButton: 40,
    listItem: 56,
    toolbar: 48,
    tabBar: Platform.OS === 'ios' ? 84 : 64,
  },

  // Standard margins & paddings
  margins: {
    screen: 16,
    section: 24,
    card: 20,
    list: 12,
  },
  paddings: {
    screen: 16,
    section: 24,
    card: 20,
    compact: 12,
  },

  // Responsive breakpoints
  breakpoints: {
    phone: 0,
    tablet: 768,
    desktop: 1024,
  },

  // Grid definitions
  grid: {
    columns: 12,
    gutter: 16,
    maxWidth: 1200,
    cardMinWidth: 156,
  },

  // Icon sizes
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    '2xl': 40,
  },

  // Z-index layers
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    modal: 30,
    popover: 40,
    tooltip: 50,
    toast: 60,
    player: 100,
  },

  // Safe areas
  safeArea: {
    top: Platform.OS === 'ios' ? 44 : 0,
    bottom: Platform.OS === 'ios' ? 34 : 0,
  },
};

// Responsive helpers
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414;

export default LAYOUT;




