import React, {forwardRef, ReactNode, Ref} from 'react';
import {StyleProp, StyleSheet, Text as RNText, TextStyle, useColorScheme} from 'react-native';

import {Colors} from '@/components/core-ui/themes';

import {fontMaker, FontMakerOptions} from '../themes/fonts';
import {FontStyle, FontWeight, ICoreUIBaseProps} from '../types';

interface ITextProps extends ICoreUIBaseProps {
  className?: string;
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
      className,
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
      {name: fontName, weight: fontWeight, style: fontStyle},
      {fontSize, lineHeight, color: color ? color : textColor}
    );

    if (!visible) return null;

    return (
      <RNText ref={ref} className={className} style={[dStyle.font, dStyle.text, style]} onPress={onPress}>
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
  text: {color: string; fontSize: number; lineHeight: number}
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
