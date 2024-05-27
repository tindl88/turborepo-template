import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text as RNText, TextStyle, useColorScheme } from 'react-native';
import { Colors } from '@/design-system';
import { FontStyle, FontWeight } from '@/design-system/interfaces/font.interface';
import { fontMaker, FontMakerOptions } from '@/design-system/utils/font.util';

import { ICoreUIBaseProps } from './types';

interface ITextProps extends ICoreUIBaseProps {
  text?: string;
  fontName?: string;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
  onPress?: () => void;
}

const Text = forwardRef<RNText, ITextProps>(
  (
    {
      text,
      children,
      style,
      color,
      fontName,
      fontStyle,
      fontWeight = 'Regular',
      fontSize = 16,
      lineHeight = 22,
      visible = true,
      onPress
    },
    ref
  ) => {
    const colorScheme = useColorScheme();

    const isDark = colorScheme === 'dark';

    const textColor = isDark ? Colors.white : Colors.black;
    const content = text || children;
    const dStyle = dynamicStyles(
      { name: fontName, weight: fontWeight, style: fontStyle },
      { fontSize, lineHeight, color: color ? color : textColor }
    );

    if (!visible) return null;

    return (
      <RNText ref={ref} style={[dStyle.font, dStyle.text, style]} onPress={onPress}>
        {content}
      </RNText>
    );
  }
);

export default Text;

interface IDynamicStyles {
  font: TextStyle;
  text: TextStyle;
}

const dynamicStyles = (
  font: FontMakerOptions,
  text: { color: string; fontSize: number; lineHeight: number }
): IDynamicStyles => {
  return StyleSheet.create({
    font: {
      ...(fontMaker(font) as TextStyle)
    },
    text: {
      color: text.color,
      fontSize: text.fontSize,
      lineHeight: text.lineHeight
    }
  });
};
