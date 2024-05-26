/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconQuestionProps {}

const IconQuestion: FC<IIconQuestionProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M12 2.25C6.624 2.25 2.25 6.624 2.25 12C2.25 17.376 6.624 21.75 12 21.75C17.376 21.75 21.75 17.376 21.75 12C21.75 6.624 17.376 2.25 12 2.25ZM12 20.25C7.451 20.25 3.75 16.549 3.75 12C3.75 7.451 7.451 3.75 12 3.75C16.549 3.75 20.25 7.451 20.25 12C20.25 16.549 16.549 20.25 12 20.25ZM15.691 9.32605C15.954 10.823 15.318 12.1651 13.901 13.1071C12.96 13.7321 12.755 14.107 12.711 14.24C12.605 14.553 12.313 14.75 12 14.75C11.92 14.75 11.84 14.7371 11.76 14.7111C11.368 14.5791 11.157 14.153 11.289 13.76C11.502 13.128 12.068 12.524 13.071 11.858C14 11.241 14.373 10.4971 14.213 9.58606C14.055 8.68506 13.315 7.94499 12.413 7.78699C11.734 7.66699 11.072 7.841 10.553 8.276C10.042 8.705 9.74899 9.334 9.74899 10C9.74899 10.414 9.41299 10.75 8.99899 10.75C8.58499 10.75 8.24899 10.414 8.24899 10C8.24899 8.889 8.73699 7.84195 9.58899 7.12695C10.44 6.41295 11.562 6.11396 12.673 6.30896C14.185 6.57396 15.426 7.81505 15.691 9.32605ZM13 17C13 17.552 12.552 18 12 18C11.448 18 11 17.552 11 17C11 16.448 11.448 16 12 16C12.552 16 13 16.448 13 17Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconQuestion;