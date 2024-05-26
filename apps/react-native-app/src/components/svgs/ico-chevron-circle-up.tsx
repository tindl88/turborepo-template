/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconChevronCircleUpProps {}

const IconChevronCircleUp: FC<IIconChevronCircleUpProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M12 2.25C6.624 2.25 2.25 6.624 2.25 12C2.25 17.376 6.624 21.75 12 21.75C17.376 21.75 21.75 17.376 21.75 12C21.75 6.624 17.376 2.25 12 2.25ZM12 20.25C7.451 20.25 3.75 16.549 3.75 12C3.75 7.451 7.451 3.75 12 3.75C16.549 3.75 20.25 7.451 20.25 12C20.25 16.549 16.549 20.25 12 20.25ZM15.53 12.469C15.823 12.762 15.823 13.237 15.53 13.53C15.384 13.676 15.192 13.75 15 13.75C14.808 13.75 14.616 13.677 14.47 13.53L12 11.0601L9.53003 13.53C9.23703 13.823 8.76199 13.823 8.46899 13.53C8.17599 13.237 8.17599 12.762 8.46899 12.469L11.469 9.46899C11.762 9.17599 12.237 9.17599 12.53 9.46899L15.53 12.469Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconChevronCircleUp;