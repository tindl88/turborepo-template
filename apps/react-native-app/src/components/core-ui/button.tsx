import React, { ReactNode, useState } from 'react';
import { Pressable, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Colors, ds } from '~react-native-design-system';

import { useThemeState } from '@/modules/theme/states/theme.state';

import Loading from './loading';
import Text from './text';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'default';

interface IButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  children?: ReactNode;
  size?: ButtonSize;
  loading?: boolean;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<PressableProps | ViewStyle>;
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
      height: 44,
      paddingHorizontal: 12,
      fontSize: 16,
      iconSize: 18
    },
    md: {
      height: 50,
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
        focusedBgColor: Colors.amber[400]
      }
    },
    dark: {
      default: {
        bgColor: configs.primary,
        textColor: configs.primaryForeground,
        disabledBgColor: Colors.slate[200],
        disabledTextColor: Colors.slate[400],
        focusedBgColor: Colors.amber[400]
      }
    }
  };
  const { height, paddingHorizontal, fontSize, iconSize } = buttonSizes[size];
  const { bgColor, textColor, disabledBgColor, disabledTextColor, focusedBgColor } =
    buttonVariants[theme.key as keyof typeof buttonVariants][variant];

  const buttonStyle: ViewStyle = {
    height,
    paddingHorizontal,
    backgroundColor: disabled ? disabledBgColor : isFocused ? focusedBgColor : bgColor,
    borderColor: isFocused ? focusedBgColor : 'transparent'
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
      <Text fontWeight="Bold" style={textStyle}>
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
