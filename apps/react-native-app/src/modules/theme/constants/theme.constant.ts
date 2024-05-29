import { Colors } from '@/design-system';

import { ThemeConfig } from '../interfaces/theme.interface';

export const themeConfig: ThemeConfig = {
  dark: {
    background: Colors.gray[900],
    foreground: Colors.gray[200],
    card: Colors.gray[800],
    cardForeground: Colors.gray[200],
    popover: Colors.gray[800],
    popoverForeground: Colors.gray[200],
    primary: Colors.primary[500],
    primaryForeground: Colors.primary[900],
    secondary: Colors.gray[700],
    secondaryForeground: Colors.gray[50],
    muted: Colors.gray[700],
    mutedForeground: Colors.gray[400],
    accent: Colors.gray[700],
    accentForeground: Colors.gray[50],
    destructive: Colors.red[700],
    destructiveForeground: Colors.red[200],
    border: Colors.gray[700],
    input: Colors.gray[700],
    ring: Colors.primary[900]
  },
  light: {
    background: Colors.white,
    foreground: Colors.gray[800],
    card: Colors.gray[200],
    cardForeground: Colors.gray[900],
    popover: Colors.white,
    popoverForeground: Colors.gray[900],
    primary: Colors.primary[600],
    primaryForeground: Colors.slate[50],
    secondary: Colors.gray[100],
    secondaryForeground: Colors.gray[800],
    muted: Colors.gray[100],
    mutedForeground: Colors.gray[500],
    accent: Colors.gray[100],
    accentForeground: Colors.gray[800],
    destructive: Colors.red[600],
    destructiveForeground: Colors.gray[50],
    border: Colors.gray[300],
    input: Colors.gray[400],
    ring: Colors.primary[600]
  }
};
