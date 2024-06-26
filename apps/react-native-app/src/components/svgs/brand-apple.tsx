import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

import { ISvgBaseProps } from './types';

const BrandApple: FC<ISvgBaseProps> = ({ size = 32, ...props }) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M23.3294 30.7161C21.5202 32.4048 19.5448 32.1382 17.6434 31.3383C15.6311 30.5206 13.785 30.485 11.662 31.3383C9.00359 32.4403 7.60055 32.1204 6.0129 30.7161C-2.99608 21.775 -1.66689 8.15897 8.56053 7.66126C11.0528 7.78568 12.7881 8.97664 14.2465 9.0833C16.4249 8.65668 18.511 7.43017 20.8371 7.59015C23.6247 7.80346 25.7293 8.86999 27.1139 10.7897C21.354 14.1138 22.7201 21.4195 28 23.4637C26.9477 26.13 25.5816 28.7786 23.3109 30.7339L23.3294 30.7161ZM14.0619 7.5546C13.785 3.59066 17.1264 0.31996 20.9663 0C21.5017 4.58609 16.6465 7.99899 14.0619 7.5546Z"
        fill="#78716c"
      />
    </Svg>
  );
};

export default BrandApple;
