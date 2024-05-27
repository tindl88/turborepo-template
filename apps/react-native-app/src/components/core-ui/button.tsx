import React, { ReactNode, useState } from 'react';
import { Pressable, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Colors, ds } from '@/design-system';

import Text from './text';

const buttonSizes = {
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14
  },
  md: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16
  },
  lg: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    fontSize: 18
  }
};

const buttonVariants = {
  default: {
    bgColor: Colors.amber[500],
    textColor: Colors.white,
    disabledBgColor: Colors.slate[200],
    disabledTextColor: Colors.slate[400],
    focusedBgColor: Colors.amber[400]
  }
};

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'default';

interface IButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  children?: ReactNode;
  size?: ButtonSize;
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
  style,
  onPress
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const { paddingVertical, paddingHorizontal, fontSize } = buttonSizes[size];
  const { bgColor, textColor, disabledBgColor, disabledTextColor, focusedBgColor } = buttonVariants[variant];

  const buttonStyle: ViewStyle = {
    paddingVertical,
    paddingHorizontal,
    backgroundColor: disabled ? disabledBgColor : isFocused ? focusedBgColor : bgColor,
    borderColor: isFocused ? focusedBgColor : 'transparent'
  };

  const textStyle: TextStyle = {
    fontSize,
    color: disabled ? disabledTextColor : textColor
  };

  return (
    <Pressable
      style={[ds.rounded4, ds.itemsCenter, ds.justifyCenter, buttonStyle, style]}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      onPressIn={() => setIsFocused(true)}
      onPressOut={() => setIsFocused(false)}
    >
      <Text fontWeight="Bold" style={textStyle}>
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
