import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { ds } from '@/design-system';

interface ILineProps {
  orientation?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewStyle | TextStyle>;
}
function Line({ orientation = 'horizontal', style, ...rest }: ILineProps) {
  return <View style={[orientation === 'horizontal' ? [ds.wFull, ds.h10] : [ds.hFull, ds.w10], style]} {...rest} />;
}

export default Line;
