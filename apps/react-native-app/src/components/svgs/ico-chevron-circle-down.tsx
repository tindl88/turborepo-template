/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconChevronCircleDownProps {}

const IconChevronCircleDown: FC<IIconChevronCircleDownProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M12 2.25C6.624 2.25 2.25 6.624 2.25 12C2.25 17.376 6.624 21.75 12 21.75C17.376 21.75 21.75 17.376 21.75 12C21.75 6.624 17.376 2.25 12 2.25ZM12 20.25C7.451 20.25 3.75 16.549 3.75 12C3.75 7.451 7.451 3.75 12 3.75C16.549 3.75 20.25 7.451 20.25 12C20.25 16.549 16.549 20.25 12 20.25ZM15.53 10.469C15.823 10.762 15.823 11.237 15.53 11.53L12.53 14.53C12.384 14.676 12.192 14.75 12 14.75C11.808 14.75 11.616 14.677 11.47 14.53L8.46997 11.53C8.17697 11.237 8.17697 10.762 8.46997 10.469C8.76297 10.176 9.23801 10.176 9.53101 10.469L12.001 12.939L14.471 10.469C14.763 10.177 15.237 10.177 15.53 10.469Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconChevronCircleDown;