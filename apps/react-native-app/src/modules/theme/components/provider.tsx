import React, { createContext, ReactNode, useContext } from 'react';

import { ColorScheme, Theme } from '../interfaces/theme.interface';

import { useThemeState } from '../states/theme.state';

interface IThemeContextProps {
  theme: ColorScheme;
  themeConfigs: Theme;
  setTheme: (theme: ColorScheme) => void;
}

const ThemeContext = createContext<IThemeContextProps | undefined>(undefined);

export const useTheme = (): IThemeContextProps => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const themeState = useThemeState();

  const setTheme = (theme: ColorScheme) => themeState.setTheme(theme);

  return (
    <ThemeContext.Provider value={{ theme: themeState.theme, themeConfigs: themeState.configs, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
