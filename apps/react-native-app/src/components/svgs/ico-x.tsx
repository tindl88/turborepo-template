import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconXProps {}

const IconX: FC<IIconXProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  thickness = 1.5,
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path d="M18 6L6 18" stroke={color} strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 6L18 18" stroke={color} strokeWidth={thickness} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default IconX;
