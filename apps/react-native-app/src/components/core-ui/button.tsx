import React, { ReactNode, useState } from 'react';
import { Pressable, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Colors, ds } from '~react-native-design-system';

import { useThemeState } from '@/modules/theme/states/theme.state';

import Loading from './loading';
import Text from './text';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'default' | 'outlined' | 'danger';

interface IButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  children?: ReactNode;
  size?: ButtonSize;
  loading?: boolean;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Button: React.FC<IButtonProps> = ({
  children,
  size = 'md',
  variant = 'default',
  disabled = false,
  loading = false,
  style,
  onPress
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { theme, configs } = useThemeState();

  const buttonSizes = {
    sm: {
      height: 46,
      paddingHorizontal: 12,
      fontSize: 16,
      iconSize: 18
    },
    md: {
      height: 52,
      paddingHorizontal: 20,
      fontSize: 18,
      iconSize: 20
    },
    lg: {
      height: 56,
      paddingHorizontal: 28,
      fontSize: 20,
      iconSize: 22
    }
  };

  const buttonVariants = {
    light: {
      default: {
        bgColor: configs.primary,
        textColor: configs.primaryForeground,
        disabledBgColor: Colors.slate[200],
        disabledTextColor: Colors.slate[400],
        focusedBgColor: Colors.amber[400],
        borderColor: 'transparent'
      },
      outlined: {
        bgColor: 'transparent',
        textColor: configs.primary,
        disabledBgColor: Colors.slate[200],
        disabledTextColor: Colors.slate[400],
        focusedBgColor: Colors.amber[100],
        borderColor: configs.primary
      },
      danger: {
        bgColor: Colors.red[500],
        textColor: Colors.white,
        disabledBgColor: Colors.slate[200],
        disabledTextColor: Colors.slate[400],
        focusedBgColor: Colors.red[700],
        borderColor: 'transparent'
      }
    },
    dark: {
      default: {
        bgColor: configs.primary,
        textColor: configs.primaryForeground,
        disabledBgColor: Colors.slate[200],
        disabledTextColor: Colors.slate[400],
        focusedBgColor: Colors.amber[400],
        borderColor: 'transparent'
      },
      outlined: {
        bgColor: 'transparent',
        textColor: configs.primary,
        disabledBgColor: Colors.slate[200],
        disabledTextColor: Colors.slate[400],
        focusedBgColor: Colors.amber[100],
        borderColor: configs.primary
      },
      danger: {
        bgColor: Colors.red[500],
        textColor: Colors.white,
        disabledBgColor: Colors.slate[200],
        disabledTextColor: Colors.slate[400],
        focusedBgColor: Colors.red[700],
        borderColor: 'transparent'
      }
    }
  };

  const { height, paddingHorizontal, fontSize, iconSize } = buttonSizes[size];
  const { bgColor, textColor, disabledBgColor, disabledTextColor, focusedBgColor, borderColor } =
    buttonVariants[theme.key as keyof typeof buttonVariants][variant];

  const buttonStyle: ViewStyle = {
    height,
    paddingHorizontal,
    backgroundColor: disabled ? disabledBgColor : isFocused ? focusedBgColor : bgColor,
    borderColor: borderColor || (isFocused ? focusedBgColor : 'transparent'),
    borderWidth: variant === 'outlined' ? 1 : 0
  };

  const textStyle: TextStyle = { fontSize, color: disabled ? disabledTextColor : textColor };

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
        <Text fontWeight="Bold" style={textStyle}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
