import { useContext } from 'react';
import { ThemeContext } from '../contexts/themes.context';
import { ThemeContextType } from '../interfaces/themes.interface';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
