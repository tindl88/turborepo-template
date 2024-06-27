import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, Text as RNText, TextStyle } from 'react-native';
import { FontStyle, FontWeight } from '~react-native-design-system/interfaces/font.interface';
import { fontMaker, FontMakerOptions } from '~react-native-design-system/utils/font.util';
import { createStyle } from '~react-native-design-system/utils/stylesheet.util';

import { useThemeState } from '@/modules/theme/states/theme.state';

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
      fontSize = 18,
      lineHeight = 22,
      visible = true,
      onPress
    },
    ref
  ) => {
    const { configs } = useThemeState();

    const textColor = color ?? configs.foreground;
    const content = text || children;

    if (!visible) return null;

    return (
      <RNText
        ref={ref}
        style={[
          styles.font({
            name: fontName,
            weight: fontWeight,
            style: fontStyle
          }),
          styles.text(textColor, fontSize, lineHeight),
          style
        ]}
        onPress={onPress}
      >
        {content}
      </RNText>
    );
  }
);

export default Text;

const styles = createStyle({
  font: (options: FontMakerOptions): TextStyle => {
    return {
      ...(fontMaker(options) as TextStyle)
    };
  },
  text: (color: string, fontSize: number, lineHeight: number): TextStyle => {
    return {
      color: color,
      fontSize: fontSize,
      lineHeight: lineHeight
    };
  }
});
