/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '~react-native-design-system';

import { ISvgBaseProps } from './types';

const IconHomeSolid: FC<ISvgBaseProps> = ({ size = 24, strokeWidth = 1, color = Colors.neutral[700], ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M18,21H14.8a.3.3,0,0,1-.3-.3V16.5A2.5,2.5,0,0,0,12,14h0a2.5,2.5,0,0,0-2.5,2.5v4.2a.3.3,0,0,1-.3.3H6a2.652,2.652,0,0,1-3-3V11.651c0-2,.523-2.3,1.43-3.065l5.964-5a2.5,2.5,0,0,1,3.212,0l5.964,5c.907.76,1.43,1.066,1.43,3.065V18A2.652,2.652,0,0,1,18,21Z"
        fill={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default IconHomeSolid;
