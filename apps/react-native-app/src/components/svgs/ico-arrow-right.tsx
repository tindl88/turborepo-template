/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconArrowRightProps {}

const IconArrowRight: FC<IIconArrowRightProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M21.28 12.5301L14.28 19.5301C14.134 19.6761 13.942 19.75 13.75 19.75C13.558 19.75 13.366 19.6771 13.22 19.5301C12.927 19.2371 12.927 18.762 13.22 18.469L18.94 12.749H2.75C2.336 12.749 2 12.413 2 11.999C2 11.585 2.336 11.249 2.75 11.249H18.939L13.219 5.52902C12.926 5.23602 12.926 4.76104 13.219 4.46804C13.512 4.17504 13.987 4.17504 14.28 4.46804L21.28 11.468C21.573 11.763 21.573 12.2371 21.28 12.5301Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconArrowRight;
