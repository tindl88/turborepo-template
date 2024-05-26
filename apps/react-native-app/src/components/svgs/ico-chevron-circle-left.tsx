/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconChevronCircleLeftProps {}

const IconChevronCircleLeft: FC<IIconChevronCircleLeftProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M13.53 9.53003L11.06 12L13.53 14.47C13.823 14.763 13.823 15.238 13.53 15.531C13.384 15.677 13.192 15.751 13 15.751C12.808 15.751 12.616 15.678 12.47 15.531L9.46997 12.531C9.17697 12.238 9.17697 11.763 9.46997 11.47L12.47 8.46997C12.763 8.17697 13.238 8.17697 13.531 8.46997C13.824 8.76297 13.823 9.23703 13.53 9.53003ZM21.75 12C21.75 17.376 17.376 21.75 12 21.75C6.624 21.75 2.25 17.376 2.25 12C2.25 6.624 6.624 2.25 12 2.25C17.376 2.25 21.75 6.624 21.75 12ZM20.25 12C20.25 7.451 16.549 3.75 12 3.75C7.451 3.75 3.75 7.451 3.75 12C3.75 16.549 7.451 20.25 12 20.25C16.549 20.25 20.25 16.549 20.25 12Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconChevronCircleLeft;
