import React, { FC } from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

import { ISvgBaseProps } from './types';

const BrandFacebook: FC<ISvgBaseProps> = ({ size = 32, ...props }) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" {...props}>
      <Rect width="32" height="32" rx="16" fill="#337FFF" />
      <Path
        d="M19.9145 17.0416L20.3704 14.1448H17.5618V12.2618C17.5618 11.4697 17.954 10.6957 19.2078 10.6957H20.5026V8.22881C19.7486 8.10857 18.9866 8.04351 18.223 8.03418C15.9114 8.03418 14.4022 9.42377 14.4022 11.9359V14.1448H11.8398V17.0416H14.4022V24.0484H17.5618V17.0416H19.9145Z"
        fill="white"
      />
    </Svg>
  );
};

export default BrandFacebook;
