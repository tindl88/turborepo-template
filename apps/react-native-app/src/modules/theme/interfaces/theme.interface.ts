import { ColorShades } from '~react-native-design-system/config';

export type ThemeEntity = {
  key: string;
  value: string;
};

export type Theme = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: ColorShades;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
};

export type ThemeConfig = {
  dark: Theme;
  light: Theme;
};
