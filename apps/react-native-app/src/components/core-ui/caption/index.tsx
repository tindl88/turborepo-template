import React, {FC, memo, ReactNode} from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';

import Text from '../text';
import {Colors, DesignSystem as ds} from '../themes';
import {CaptionType, ICoreUIBaseProps} from '../types';

interface ICaptionProps extends ICoreUIBaseProps {
  as?: CaptionType;
  text?: string;
  weight?: string;
  children?: ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Caption: FC<ICaptionProps> = ({
  text,
  children,
  as = 'figcaption',
  color = Colors.neutral[700],
  visible = true,
  style
}) => {
  const content = text || children;

  if (!visible) return null;

  return <Text style={[styles.component(color), styles.size, styles[as], style]}>{content}</Text>;
};

export default memo(Caption);

const styles = StyleSheet.create<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  component(color: string): TextStyle;
}>({
  component: color => {
    return {
      color: color
    };
  },
  size: {...ds.text14}
});
