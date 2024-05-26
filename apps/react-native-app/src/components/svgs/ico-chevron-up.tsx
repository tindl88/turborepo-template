/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '@/design-system';

import { ISvgBaseProps } from './types';

interface IIconChevronUpProps {}

const IconChevronUp: FC<IIconChevronUpProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M21.5305 17.0304C21.3845 17.1764 21.1925 17.2504 21.0005 17.2504C20.8085 17.2504 20.6165 17.1774 20.4705 17.0304L12.0005 8.56045L3.53051 17.0304C3.23751 17.3234 2.76248 17.3234 2.46948 17.0304C2.17648 16.7374 2.17648 16.2624 2.46948 15.9694L11.4695 6.96938C11.7625 6.67638 12.2375 6.67638 12.5305 6.96938L21.5305 15.9694C21.8235 16.2624 21.8235 16.7374 21.5305 17.0304Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconChevronUp;
