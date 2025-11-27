import React, { createContext, useContext, useMemo } from 'react';
import { Appearance } from 'react-native';

import { THEME } from '../constants/theme';

const DEFAULT_THEME_VALUES = {
  '--bg': '#0f172a',
  '--surface': '#0b1220',
  '--text': '#e6eef8',
  '--muted': '#9aa6b2',
  '--primary': '#6366F1',
  '--accent': '#06b6d4',
  '--success': '#22c55e',
  '--danger': '#ef4444',
  '--radius': '12px',
  '--spacing': '8px',
};

const ThemeContext = createContext({
  tokens: THEME,
  colors: {},
  spacing: () => 8,
  radius: 12,
  getColorVar: () => '',
  navigationTheme: undefined,
});

const parsePxValue = (value, fallback) => {
  if (!value) {
    return fallback;
  }

  const parsed = parseFloat(value.replace('px', '').trim());
  return Number.isNaN(parsed) ? fallback : parsed;
};

const resolveTokenValue = (token) => {
  if (typeof document !== 'undefined' && document?.documentElement) {
    const cssValue = getComputedStyle(document.documentElement).getPropertyValue(token);
    if (cssValue?.trim()) {
      return cssValue.trim();
    }
  }

  return DEFAULT_THEME_VALUES[token];
};

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance?.getColorScheme?.() || 'dark';

  const value = useMemo(() => {
    const getColorFromToken = (token) => resolveTokenValue(token);
    const baseSpacing = parsePxValue(getColorFromToken(THEME.spacing), 8);
    const baseRadius = parsePxValue(getColorFromToken(THEME.radius), 12);

    const colors = {
      background: getColorFromToken(THEME.colorBg),
      surface: getColorFromToken(THEME.colorSurface),
      text: getColorFromToken(THEME.colorText),
      muted: getColorFromToken(THEME.colorMuted),
      primary: getColorFromToken(THEME.colorPrimary),
      accent: getColorFromToken(THEME.colorAccent),
      success: getColorFromToken(THEME.colorSuccess),
      danger: getColorFromToken(THEME.colorDanger),
    };

    const spacing = (multiplier = 1) => baseSpacing * multiplier;

    const navigationTheme = {
      dark: colorScheme !== 'light',
      colors: {
        primary: colors.primary,
        background: colors.background,
        card: colors.surface,
        text: colors.text,
        border: colors.muted,
        notification: colors.accent,
      },
    };

    return {
      tokens: THEME,
      colors,
      spacing,
      radius: baseRadius,
      getColorVar: (token) => `var(${token})`,
      navigationTheme,
    };
  }, [colorScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeProvider;

