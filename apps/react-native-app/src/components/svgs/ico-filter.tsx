/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { Colors } from '@/components/core-ui/themes';

import { ISvgBaseProps } from './types';

interface IIconFilterProps {}

const IconFilter: FC<IIconFilterProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M18.5 2.25H5.5C4.259 2.25 3.25 3.259 3.25 4.5V6.58606C3.25 7.05306 3.432 7.493 3.763 7.823L8.884 12.944C9.12 13.18 9.25 13.494 9.25 13.828V21C9.25 21.284 9.41101 21.544 9.66501 21.671C9.77101 21.724 9.886 21.75 10 21.75C10.159 21.75 10.318 21.699 10.45 21.6L14.45 18.6C14.638 18.458 14.75 18.236 14.75 18V13.829C14.75 13.495 14.88 13.1809 15.116 12.9449L20.237 7.82397C20.568 7.49297 20.75 7.05404 20.75 6.58704V4.50098C20.75 3.25898 19.741 2.25 18.5 2.25ZM5.5 3.75H18.5C18.914 3.75 19.25 4.086 19.25 4.5V6.25H4.75V4.5C4.75 4.086 5.086 3.75 5.5 3.75ZM14.056 11.884C13.536 12.404 13.25 13.094 13.25 13.829V17.625L10.75 19.5V13.829C10.75 13.094 10.464 12.404 9.944 11.884L5.81 7.75H18.189L14.056 11.884Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconFilter;
