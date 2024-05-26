/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconSlidersProps {}

const IconSliders: FC<IIconSlidersProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M8.5 3.75C6.967 3.75 5.68701 4.82 5.34601 6.25H3C2.586 6.25 2.25 6.586 2.25 7C2.25 7.414 2.586 7.75 3 7.75H5.34601C5.68701 9.18 6.967 10.25 8.5 10.25C10.292 10.25 11.75 8.792 11.75 7C11.75 5.208 10.292 3.75 8.5 3.75ZM8.5 8.75C7.535 8.75 6.75 7.965 6.75 7C6.75 6.035 7.535 5.25 8.5 5.25C9.465 5.25 10.25 6.035 10.25 7C10.25 7.965 9.465 8.75 8.5 8.75ZM14.25 7C14.25 6.586 14.586 6.25 15 6.25H21C21.414 6.25 21.75 6.586 21.75 7C21.75 7.414 21.414 7.75 21 7.75H15C14.586 7.75 14.25 7.414 14.25 7ZM21 16.25H18.654C18.313 14.82 17.033 13.75 15.5 13.75C13.708 13.75 12.25 15.208 12.25 17C12.25 18.792 13.708 20.25 15.5 20.25C17.033 20.25 18.313 19.18 18.654 17.75H21C21.414 17.75 21.75 17.414 21.75 17C21.75 16.586 21.414 16.25 21 16.25ZM15.5 18.75C14.535 18.75 13.75 17.965 13.75 17C13.75 16.035 14.535 15.25 15.5 15.25C16.465 15.25 17.25 16.035 17.25 17C17.25 17.965 16.465 18.75 15.5 18.75ZM9.75 17C9.75 17.414 9.414 17.75 9 17.75H3C2.586 17.75 2.25 17.414 2.25 17C2.25 16.586 2.586 16.25 3 16.25H9C9.414 16.25 9.75 16.586 9.75 17Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconSliders;
