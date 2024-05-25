/* Magicoon - Regular */
import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '@/components/core-ui/themes';

import {ISvgBaseProps} from './types';

interface IIconCommentDotProps {}

const IconCommentDot: FC<IIconCommentDotProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M17 2.75H7C4.381 2.75 2.25 4.881 2.25 7.5V20.5C2.25 20.803 2.43301 21.077 2.71301 21.193C2.80601 21.232 2.903 21.25 3 21.25C3.195 21.25 3.387 21.174 3.53 21.03L5.944 18.616C6.18 18.38 6.494 18.25 6.828 18.25H17C19.619 18.25 21.75 16.119 21.75 13.5V7.5C21.75 4.881 19.619 2.75 17 2.75ZM20.25 13.5C20.25 15.292 18.792 16.75 17 16.75H6.82901C6.09401 16.75 5.404 17.036 4.884 17.556L3.75 18.6899V7.5C3.75 5.708 5.208 4.25 7 4.25H17C18.792 4.25 20.25 5.708 20.25 7.5V13.5ZM9 10.5C9 11.052 8.552 11.5 8 11.5C7.448 11.5 7 11.052 7 10.5C7 9.948 7.448 9.5 8 9.5C8.552 9.5 9 9.948 9 10.5ZM13 10.5C13 11.052 12.552 11.5 12 11.5C11.448 11.5 11 11.052 11 10.5C11 9.948 11.448 9.5 12 9.5C12.552 9.5 13 9.948 13 10.5ZM17 10.5C17 11.052 16.552 11.5 16 11.5C15.448 11.5 15 11.052 15 10.5C15 9.948 15.448 9.5 16 9.5C16.552 9.5 17 9.948 17 10.5Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconCommentDot;
