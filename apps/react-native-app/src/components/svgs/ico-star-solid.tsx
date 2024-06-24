/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '~react-native-design-system';

import { ISvgBaseProps } from './types';

const IconStarSolid: FC<ISvgBaseProps> = ({ size = 24, strokeWidth = 1, color = Colors.neutral[700], ...props }) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M12.962,4.6,14.9,8.513a1,1,0,0,0,.755.546l4.482.649a1,1,0,0,1,.555,1.705l-3.241,3.145a1,1,0,0,0-.289.886l.741,4.3a1.07,1.07,0,0,1-1.553,1.127L12.466,18.84a1.009,1.009,0,0,0-.932,0L7.649,20.874a1.073,1.073,0,0,1-1.556-1.13l.741-4.3a1,1,0,0,0-.289-.886L3.3,11.413a1,1,0,0,1,.555-1.7l4.482-.649A1,1,0,0,0,9.1,8.513L11.038,4.6A1.074,1.074,0,0,1,12.962,4.6Z"
        fill={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default IconStarSolid;
