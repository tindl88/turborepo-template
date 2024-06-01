import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ds } from '@/design-system';

import { useThemeState } from '@/modules/theme/states/theme.state';

interface ISeparatorProps {
  orientation?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewStyle>;
}
function Separator({ orientation = 'horizontal', style, ...rest }: ISeparatorProps) {
  const { configs } = useThemeState();

  const bgColor: ViewStyle = { backgroundColor: configs.border };

  return (
    <View
      style={[orientation === 'horizontal' ? [ds.wFull, { height: 1 }] : [ds.hFull, { width: 1 }], bgColor, style]}
      {...rest}
    />
  );
}

export default Separator;
