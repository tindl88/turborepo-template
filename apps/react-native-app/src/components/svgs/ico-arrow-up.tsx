/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconArrowUpProps {}

const IconArrowUp: FC<IIconArrowUpProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M19.5305 10.5299C19.3845 10.6759 19.1925 10.7499 19.0005 10.7499C18.8085 10.7499 18.6165 10.6769 18.4705 10.5299L12.7505 4.80996V20.9999C12.7505 21.4139 12.4145 21.7499 12.0005 21.7499C11.5865 21.7499 11.2505 21.4139 11.2505 20.9999V4.81094L5.53051 10.5309C5.23751 10.8239 4.76248 10.8239 4.46948 10.5309C4.17648 10.2379 4.17648 9.76287 4.46948 9.46987L11.4695 2.46987C11.7625 2.17687 12.2375 2.17687 12.5305 2.46987L19.5305 9.46987C19.8235 9.76287 19.8235 10.2369 19.5305 10.5299Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconArrowUp;
