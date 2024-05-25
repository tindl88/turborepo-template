/* Magicoon - Regular */
import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '@/components/core-ui/themes';

import {ISvgBaseProps} from './types';

interface IIconChevronDownProps {}

const IconChevronDown: FC<IIconChevronDownProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M21.5295 8.03042L12.5295 17.0304C12.3835 17.1764 12.1915 17.2504 11.9995 17.2504C11.8075 17.2504 11.6155 17.1774 11.4695 17.0304L2.46948 8.03042C2.17648 7.73742 2.17648 7.26238 2.46948 6.96938C2.76248 6.67638 3.23751 6.67638 3.53051 6.96938L12.0005 15.4394L20.4705 6.96938C20.7635 6.67638 21.2385 6.67638 21.5315 6.96938C21.8245 7.26238 21.8225 7.73742 21.5295 8.03042Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconChevronDown;
