import React, { FC, memo, ReactNode } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { ds } from '@/design-system';

import { createStyle } from '@/utils/stylesheet.util';

import Text from './text';
import { HeadingType, ICoreUIBaseProps } from './types';

interface IHeadingProps extends ICoreUIBaseProps {
  as?: HeadingType;
  text?: string;
  children?: ReactNode;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Heading: FC<IHeadingProps> = ({ text, children, as = 'h1', color = 'transparent', visible = true, style }) => {
  const content = text || children;

  if (!visible) return null;

  return (
    <Text fontWeight={'Bold'} style={[styles.component(color), styles[as], style]}>
      {content}
    </Text>
  );
};

export default memo(Heading);

const styles = createStyle({
  component: (color: string): TextStyle => {
    return {
      color: color
    };
  },
  h1: { ...ds.text32 },
  h2: { ...ds.text28 },
  h3: { ...ds.text24 },
  h4: { ...ds.text20 },
  h5: { ...ds.text18 },
  h6: { ...ds.text16 }
});
