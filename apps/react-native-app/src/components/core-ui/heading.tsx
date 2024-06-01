import React, { FC, memo, ReactNode } from 'react';
import { TextStyle } from 'react-native';
import { ds } from '@/design-system';

import { useThemeState } from '@/modules/theme/states/theme.state';

import { createStyle } from '@/utils/stylesheet.util';

import Text from './text';

type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IHeadingProps extends React.ComponentPropsWithoutRef<typeof Text> {
  as?: HeadingType;
  text?: string;
  children?: ReactNode;
}

const Heading: FC<IHeadingProps> = ({
  text,
  children,
  as = 'h1',
  color,
  fontWeight,
  visible = true,
  style,
  onPress
}) => {
  const { configs } = useThemeState();

  const textColor = color ?? configs.foreground;
  const content = text || children;

  if (!visible) return null;

  return (
    <Text color={textColor} fontWeight={fontWeight ?? 'Bold'} style={[styles[as], style]} onPress={onPress}>
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
