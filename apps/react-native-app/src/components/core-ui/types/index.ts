export type ButtonVariantType = 'default' | 'contained' | 'outlined';

export type ButtonColorType = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';

export type DirectionType = 'left' | 'right';

export type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type CaptionType = 'error-message' | 'fig-caption';

export type FontWeight = 'Light' | 'Regular' | 'Medium' | 'SemiBold' | 'Bold' | 'ExtraBold' | 'Black';

export type FontStyle = 'Normal' | 'Italic';

export type RoundedType = 0 | 2 | 4 | 6 | 8 | 12 | 14 | 16 | 18 | 20 | 22 | 24;

export type IconSizeType = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48;

export interface ICoreUIBaseProps {
  visible?: boolean;
  disabled?: boolean;
}
