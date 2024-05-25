/* Magicoon - Regular */
import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '@/components/core-ui/themes';

import {ISvgBaseProps} from './types';

interface IIconMessageProps {}

const IconMessage: FC<IIconMessageProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M17 2.75H7C4.381 2.75 2.25 4.881 2.25 7.5V20.5C2.25 20.803 2.43301 21.077 2.71301 21.193C2.80601 21.232 2.903 21.25 3 21.25C3.195 21.25 3.387 21.174 3.53 21.03L5.944 18.616C6.18 18.38 6.494 18.25 6.828 18.25H17C19.619 18.25 21.75 16.119 21.75 13.5V7.5C21.75 4.881 19.619 2.75 17 2.75ZM20.25 13.5C20.25 15.292 18.792 16.75 17 16.75H6.82901C6.09401 16.75 5.404 17.036 4.884 17.556L3.75 18.6899V7.5C3.75 5.708 5.208 4.25 7 4.25H17C18.792 4.25 20.25 5.708 20.25 7.5V13.5Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconMessage;
