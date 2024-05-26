/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '@/design-system';

import { ISvgBaseProps } from './types';

interface IIconChevronCircleRightProps {}

const IconChevronCircleRight: FC<IIconChevronCircleRightProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M12 2.25C6.624 2.25 2.25 6.624 2.25 12C2.25 17.376 6.624 21.75 12 21.75C17.376 21.75 21.75 17.376 21.75 12C21.75 6.624 17.376 2.25 12 2.25ZM12 20.25C7.451 20.25 3.75 16.549 3.75 12C3.75 7.451 7.451 3.75 12 3.75C16.549 3.75 20.25 7.451 20.25 12C20.25 16.549 16.549 20.25 12 20.25ZM14.53 11.469C14.823 11.762 14.823 12.237 14.53 12.53L11.53 15.53C11.384 15.676 11.192 15.75 11 15.75C10.808 15.75 10.616 15.677 10.47 15.53C10.177 15.237 10.177 14.762 10.47 14.469L12.94 11.999L10.47 9.52905C10.177 9.23605 10.177 8.76102 10.47 8.46802C10.763 8.17502 11.238 8.17502 11.531 8.46802L14.53 11.469Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconChevronCircleRight;
