/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconChevronRightProps {}

const IconChevronRight: FC<IIconChevronRightProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M17.03 12.5309L8.02998 21.5309C7.88398 21.6769 7.69195 21.7509 7.49995 21.7509C7.30795 21.7509 7.11592 21.6779 6.96992 21.5309C6.67692 21.2379 6.67692 20.7629 6.96992 20.4699L15.4399 11.9999L6.96992 3.52993C6.67692 3.23693 6.67692 2.7619 6.96992 2.4689C7.26292 2.1759 7.73795 2.1759 8.03095 2.4689L17.031 11.4689C17.323 11.7629 17.323 12.2379 17.03 12.5309Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconChevronRight;
