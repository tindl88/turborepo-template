import React, { FC, memo, ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Colors, ds } from '@/design-system';

import { createStyle } from '@/utils/stylesheet.util';

import Text from './text';
import { CaptionType, ICoreUIBaseProps } from './types';

interface ICaptionProps extends ICoreUIBaseProps {
  as?: CaptionType;
  text?: string;
  weight?: string;
  children?: ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Caption: FC<ICaptionProps> = ({ text, children, color = Colors.neutral[700], visible = true, style }) => {
  const content = text || children;

  if (!visible) return null;

  return <Text style={[styles.component(color), styles.size, style]}>{content}</Text>;
};

export default memo(Caption);

const styles = createStyle({
  component: (color: string): TextStyle => {
    return {
      color: color
    };
  },
  size: { ...ds.text14 }
});
