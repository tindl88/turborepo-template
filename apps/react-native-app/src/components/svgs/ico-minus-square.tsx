/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconMinusSquareProps {}

const IconMinusSquare: FC<IIconMinusSquareProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M15 2.25H9C5.278 2.25 2.25 5.278 2.25 9V15C2.25 18.722 5.278 21.75 9 21.75H15C18.722 21.75 21.75 18.722 21.75 15V9C21.75 5.278 18.722 2.25 15 2.25ZM20.25 15C20.25 17.895 17.895 20.25 15 20.25H9C6.105 20.25 3.75 17.895 3.75 15V9C3.75 6.105 6.105 3.75 9 3.75H15C17.895 3.75 20.25 6.105 20.25 9V15ZM16.75 12C16.75 12.414 16.414 12.75 16 12.75H8C7.586 12.75 7.25 12.414 7.25 12C7.25 11.586 7.586 11.25 8 11.25H16C16.414 11.25 16.75 11.586 16.75 12Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconMinusSquare;