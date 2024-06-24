/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '~react-native-design-system';

import { ISvgBaseProps } from './types';

const IconArrowDown: FC<ISvgBaseProps> = ({ size = 24, strokeWidth = 1, color = Colors.neutral[700], ...props }) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M19.5295 14.53L12.5295 21.53C12.3835 21.676 12.1915 21.75 11.9995 21.75C11.8075 21.75 11.6155 21.677 11.4695 21.53L4.46948 14.53C4.17648 14.237 4.17648 13.762 4.46948 13.469C4.76248 13.176 5.23751 13.176 5.53051 13.469L11.2505 19.189V3C11.2505 2.586 11.5865 2.25 12.0005 2.25C12.4145 2.25 12.7505 2.586 12.7505 3V19.189L18.4705 13.469C18.7635 13.176 19.2385 13.176 19.5315 13.469C19.8245 13.762 19.8225 14.237 19.5295 14.53Z"
        fill={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default IconArrowDown;
