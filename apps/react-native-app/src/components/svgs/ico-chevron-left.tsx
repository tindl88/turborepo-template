/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconChevronLeftProps {}

const IconChevronLeft: FC<IIconChevronLeftProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M17.0295 20.4694C17.3225 20.7624 17.3225 21.2374 17.0295 21.5304C16.8835 21.6764 16.6915 21.7504 16.4995 21.7504C16.3075 21.7504 16.1155 21.6774 15.9695 21.5304L6.96948 12.5304C6.67648 12.2374 6.67648 11.7624 6.96948 11.4694L15.9695 2.46938C16.2625 2.17638 16.7375 2.17638 17.0305 2.46938C17.3235 2.76238 17.3235 3.23742 17.0305 3.53042L8.56048 12.0004L17.0295 20.4694Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconChevronLeft;
