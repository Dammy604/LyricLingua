import { useThemeContext } from '../context/ThemeProvider';

export const useTheme = () => {
  const context = useThemeContext();

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default useTheme;

