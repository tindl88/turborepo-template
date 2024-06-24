import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ds } from '~react-native-design-system';

import View from './view';

interface ILineProps {
  orientation?: 'vertical' | 'horizontal';
  style?: StyleProp<ViewStyle | TextStyle>;
}
function Line({ orientation = 'horizontal', style, ...rest }: ILineProps) {
  return <View style={[orientation === 'horizontal' ? [ds.wFull, ds.h10] : [ds.hFull, ds.w10], style]} {...rest} />;
}

export default Line;
