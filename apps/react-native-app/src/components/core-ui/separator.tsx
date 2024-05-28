import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { ds } from '@/design-system';

import { useTheme } from '@/modules/theme/components/provider';

interface ISeparatorProps {
  orientation?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewStyle>;
}
function Separator({ orientation = 'horizontal', style, ...rest }: ISeparatorProps) {
  const { themeConfigs } = useTheme();

  const bgColor: ViewStyle = { backgroundColor: themeConfigs.border };

  return (
    <View
      style={[orientation === 'horizontal' ? [ds.wFull, { height: 1 }] : [ds.hFull, { width: 1 }], bgColor, style]}
      {...rest}
    />
  );
}

export default Separator;
