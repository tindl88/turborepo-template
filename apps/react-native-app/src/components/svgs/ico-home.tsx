/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '~react-native-design-system';

import { ISvgBaseProps } from './types';

const IconHome: FC<ISvgBaseProps> = ({ size = 24, strokeWidth = 1, color = Colors.neutral[700], ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M19.978 7.31544L14.978 3.29403C13.252 1.90655 10.748 1.90655 9.022 3.29403L4.022 7.31544C2.896 8.22075 2.25 9.5682 2.25 11.0127V17.0068C2.25 19.6237 4.381 21.7534 7 21.7534H9.75V17.0068C9.75 15.7684 10.759 14.76 12 14.76C13.241 14.76 14.25 15.7684 14.25 17.0068V21.7534H17C19.619 21.7534 21.75 19.6247 21.75 17.0068V11.0127C21.75 9.5682 21.104 8.22075 19.978 7.31544ZM20.25 17.0068C20.25 18.7964 18.792 20.2529 17 20.2529H15.75V17.0068C15.75 14.9411 14.068 13.2594 12 13.2594C9.932 13.2594 8.25 14.9411 8.25 17.0068V20.2529H7C5.208 20.2529 3.75 18.7964 3.75 17.0068V11.0127C3.75 10.0254 4.191 9.10406 4.961 8.48485L9.961 4.46344C11.143 3.51411 12.857 3.51411 14.038 4.46344L19.038 8.48485C19.808 9.10406 20.249 10.0254 20.249 11.0127V17.0068H20.25Z"
        fill={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default IconHome;
