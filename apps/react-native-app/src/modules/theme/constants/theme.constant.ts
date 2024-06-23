import { Colors } from '~react-native-design-system';

import { ThemeConfig, ThemeEntity } from '../interfaces/theme.interface';

export const themeItems: ThemeEntity[] = [
  { key: 'dark', value: 'Dark' },
  { key: 'light', value: 'Light' }
];

export const themeConfig: ThemeConfig = {
  dark: {
    background: Colors.stone[900],
    foreground: Colors.stone[200],
    card: Colors.stone[800],
    cardForeground: Colors.stone[200],
    popover: Colors.stone[800],
    popoverForeground: Colors.stone[200],
    primary: Colors.primary,
    primaryForeground: Colors.primary[900],
    secondary: Colors.stone[700],
    secondaryForeground: Colors.stone[50],
    muted: Colors.stone[700],
    mutedForeground: Colors.stone[400],
    accent: Colors.stone[700],
    accentForeground: Colors.stone[50],
    destructive: Colors.red[700],
    destructiveForeground: Colors.red[200],
    border: Colors.stone[700],
    input: Colors.stone[700],
    ring: Colors.primary[900]
  },
  light: {
    background: Colors.stone[200],
    foreground: Colors.stone[600],
    card: Colors.stone[100],
    cardForeground: Colors.stone[900],
    popover: Colors.white,
    popoverForeground: Colors.stone[900],
    primary: Colors.primary,
    primaryForeground: Colors.slate[50],
    secondary: Colors.stone[100],
    secondaryForeground: Colors.stone[800],
    muted: Colors.stone[100],
    mutedForeground: Colors.stone[500],
    accent: Colors.stone[100],
    accentForeground: Colors.stone[800],
    destructive: Colors.red[600],
    destructiveForeground: Colors.stone[50],
    border: Colors.stone[300],
    input: Colors.stone[400],
    ring: Colors.primary[600]
  }
};
