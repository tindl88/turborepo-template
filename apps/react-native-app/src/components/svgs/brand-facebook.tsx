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
<svg width="800" height="796" viewBox="0 0 800 796" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M800 400C800 179.086 620.913 0 400 0C179.086 0 0 179.086 0 400C0 599.65 146.274 765.133 337.5 795.14V515.627H235.937V400H337.5V311.875C337.5 211.625 397.217 156.25 488.587 156.25C532.35 156.25 578.127 164.063 578.127 164.063V262.5H527.687C477.997 262.5 462.5 293.334 462.5 324.966V400H573.437L555.703 515.627H462.5V795.14C653.727 765.133 800 599.65 800 400Z"
    fill="#1847BF"
  />
</svg>;
