import React, { ReactNode, useState } from 'react';
import { Pressable, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Colors, ds } from '~react-native-design-system';

import { useThemeState } from '@/modules/theme/states/theme.state';

import Loading from './loading';
import Text from './text';

type ButtonVariant = 'default' | 'outlined' | 'danger';
type ButtonSizeVariant = 'sm' | 'md' | 'lg';
type ButtonRoundedVariant = 'none' | 'sm' | 'md' | 'full';

interface IButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  children?: ReactNode;
  size?: ButtonSizeVariant;
  rounded?: ButtonRoundedVariant;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Button: React.FC<IButtonProps> = ({
  children,
  size = 'md',
  rounded = 'full',
  variant = 'default',
  disabled = false,
  loading = false,
  style,
  textStyle,
  onPress
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme, configs } = useThemeState();

  const defaultTheme = {
    bgColor: configs.primary[500],
    focusedBgColor: Colors.primary[600],
    textColor: configs.primaryForeground,
    disabledBgColor: Colors.neutral[500],
    disabledTextColor: Colors.neutral[600],
    disabledBorderColor: 'transparent',
    borderColor: 'transparent'
  };
  const outlineTheme = {
    bgColor: 'transparent',
    focusedBgColor: Colors.amber[100],
    textColor: configs.primary[500],
    disabledBgColor: 'transparent',
    disabledTextColor: Colors.neutral[600],
    disabledBorderColor: Colors.neutral[600],
    borderColor: configs.primary[500]
  };
  const dangerTheme = {
    bgColor: Colors.red[500],
    focusedBgColor: Colors.red[600],
    textColor: configs.primaryForeground,
    disabledBgColor: Colors.neutral[500],
    disabledTextColor: Colors.neutral[600],
    disabledBorderColor: 'transparent',
    borderColor: 'transparent'
  };

  const buttonVariants = {
    light: { default: defaultTheme, outlined: outlineTheme, danger: dangerTheme },
    dark: { default: defaultTheme, outlined: outlineTheme, danger: dangerTheme }
  };
  const buttonSizes = {
    sm: { height: 46, paddingHorizontal: 12, fontSize: 16, iconSize: 18 },
    md: { height: 52, paddingHorizontal: 20, fontSize: 18, iconSize: 20 },
    lg: { height: 56, paddingHorizontal: 28, fontSize: 20, iconSize: 22 }
  };
  const buttonRoundedVariants = {
    none: { borderRadius: 0 },
    sm: { borderRadius: 4 },
    md: { borderRadius: 8 },
    lg: { borderRadius: 12 },
    full: { borderRadius: 9999 }
  };
  const { bgColor, textColor, disabledBgColor, disabledTextColor, disabledBorderColor, focusedBgColor, borderColor } =
    buttonVariants[theme.key as keyof typeof buttonVariants][variant];
  const { height, paddingHorizontal, fontSize, iconSize } = buttonSizes[size];
  const { borderRadius } = buttonRoundedVariants[rounded];

  const buttonStyle: ViewStyle = {
    height,
    paddingHorizontal,
    backgroundColor: disabled ? disabledBgColor : isFocused ? focusedBgColor : bgColor,
    borderColor: disabled ? disabledBorderColor : borderColor,
    borderWidth: variant === 'outlined' ? 1 : 0,
    borderRadius
  };
  const buttonTextStyle: TextStyle = {
    fontSize,
    color: disabled ? disabledTextColor : textColor
  };

  return (
    <Pressable
      style={[ds.rounded10, ds.itemsCenter, ds.justifyCenter, ds.row, ds.gap10, buttonStyle, style]}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      onPressIn={() => setIsFocused(true)}
      onPressOut={() => setIsFocused(false)}
    >
      {loading && <Loading size={iconSize} />}
      {children && (
        <Text fontWeight="Bold" style={[buttonTextStyle, textStyle]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
