import React, { FC, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';

import View from '@/components/core-ui/view';

import { useThemeState } from '@/modules/theme/states/theme.state';

type BoxProps = {
  padding?: 0 | 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40;
  hasRounded?: boolean;
  hasBorder?: boolean;
  hasBg?: boolean;
  paddingHorizontal?: boolean;
  paddingVertical?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Box: FC<BoxProps> = ({
  children,
  hasRounded = true,
  hasBorder = false,
  hasBg = true,
  paddingHorizontal = true,
  paddingVertical = true,
  padding = 12,
  style
}) => {
  const { configs } = useThemeState();

  return (
    <View
      style={[
        hasRounded && ds.rounded12,
        hasBorder && [ds.border1, dynamicStyles.border(configs.border)],
        hasBg && dynamicStyles.background(configs.card),
        paddingVertical && dynamicStyles.paddingVerticle(padding),
        paddingHorizontal && dynamicStyles.paddingHorizontal(padding),
        style
      ]}
    >
      {children}
    </View>
  );
};

export default Box;
