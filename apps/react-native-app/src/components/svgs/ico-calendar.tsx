/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconCalendarProps {}

const IconCalendar: FC<IIconCalendarProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M17 3.25H16.75V3C16.75 2.586 16.414 2.25 16 2.25C15.586 2.25 15.25 2.586 15.25 3V3.25H8.75V3C8.75 2.586 8.414 2.25 8 2.25C7.586 2.25 7.25 2.586 7.25 3V3.25H7C4.381 3.25 2.25 5.381 2.25 8V17C2.25 19.619 4.381 21.75 7 21.75H17C19.619 21.75 21.75 19.619 21.75 17V8C21.75 5.381 19.619 3.25 17 3.25ZM7 4.75H7.25V6C7.25 6.414 7.586 6.75 8 6.75C8.414 6.75 8.75 6.414 8.75 6V4.75H15.25V6C15.25 6.414 15.586 6.75 16 6.75C16.414 6.75 16.75 6.414 16.75 6V4.75H17C18.792 4.75 20.25 6.208 20.25 8V8.25H3.75V8C3.75 6.208 5.208 4.75 7 4.75ZM17 20.25H7C5.208 20.25 3.75 18.792 3.75 17V9.75H20.25V17C20.25 18.792 18.792 20.25 17 20.25ZM17 13C17 13.552 16.552 14 16 14C15.448 14 15 13.552 15 13C15 12.448 15.448 12 16 12C16.552 12 17 12.448 17 13ZM13 13C13 13.552 12.552 14 12 14C11.448 14 11 13.552 11 13C11 12.448 11.448 12 12 12C12.552 12 13 12.448 13 13ZM9 13C9 13.552 8.552 14 8 14C7.448 14 7 13.552 7 13C7 12.448 7.448 12 8 12C8.552 12 9 12.448 9 13ZM17 17C17 17.552 16.552 18 16 18C15.448 18 15 17.552 15 17C15 16.448 15.448 16 16 16C16.552 16 17 16.448 17 17ZM13 17C13 17.552 12.552 18 12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17ZM9 17C9 17.552 8.552 18 8 18C7.448 18 7 17.552 7 17C7 16.448 7.448 16 8 16C8.552 16 9 16.448 9 17Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconCalendar;
