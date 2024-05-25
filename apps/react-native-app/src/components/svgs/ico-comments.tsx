/* Magicoon - Regular */
import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '@/components/core-ui/themes';

import {ISvgBaseProps} from './types';

interface IIconCommentsProps {}

const IconComments: FC<IIconCommentsProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M18 7.25H17.75V6C17.75 3.932 16.068 2.25 14 2.25H6C3.932 2.25 2.25 3.932 2.25 6V16C2.25 16.305 2.435 16.579 2.716 16.694C2.808 16.732 2.904 16.75 3 16.75C3.198 16.75 3.39201 16.672 3.53601 16.525L5.27499 14.75H6.25V16C6.25 18.068 7.932 19.75 10 19.75H18.725L20.464 21.525C20.608 21.672 20.802 21.75 21 21.75C21.096 21.75 21.192 21.732 21.284 21.694C21.566 21.579 21.75 21.304 21.75 21V11C21.75 8.932 20.068 7.25 18 7.25ZM4.95999 13.25C4.75799 13.25 4.56501 13.331 4.42401 13.475L3.75 14.163V6C3.75 4.759 4.759 3.75 6 3.75H14C15.241 3.75 16.25 4.759 16.25 6V11C16.25 12.241 15.241 13.25 14 13.25H4.95999ZM20.25 19.163L19.576 18.475C19.435 18.331 19.242 18.25 19.04 18.25H10C8.759 18.25 7.75 17.241 7.75 16V14.75H14C16.068 14.75 17.75 13.068 17.75 11V8.75H18C19.241 8.75 20.25 9.759 20.25 11V19.163Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconComments;
