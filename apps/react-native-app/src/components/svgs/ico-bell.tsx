/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '~react-native-design-system';

import { ISvgBaseProps } from './types';

const IconBell: FC<ISvgBaseProps> = ({ size = 24, strokeWidth = 1, color = Colors.neutral[700], ...props }) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M20.4547 15.6465L19.3487 13.8005C18.9527 13.1405 18.7447 12.3855 18.7447 11.6165V8.9895C18.7447 5.2735 15.7187 2.24951 11.9997 2.24951C8.28068 2.24951 5.25466 5.2725 5.25466 8.9895V11.6165C5.25466 12.3855 5.04566 13.1405 4.65066 13.8005L3.54467 15.6465C3.15967 16.2875 3.15067 17.0595 3.51867 17.7095C3.88767 18.3615 4.55466 18.7505 5.30366 18.7505H9.28367C9.27567 18.8345 9.25067 18.9155 9.25067 19.0005C9.25067 20.5175 10.4837 21.7505 12.0007 21.7505C13.5177 21.7505 14.7507 20.5175 14.7507 19.0005C14.7507 18.9155 14.7257 18.8345 14.7177 18.7505H18.6977C19.4467 18.7505 20.1147 18.3615 20.4827 17.7104C20.8497 17.0594 20.8397 16.2875 20.4547 15.6465ZM13.2487 19.0005C13.2487 19.6895 12.6877 20.2505 11.9987 20.2505C11.3097 20.2505 10.7487 19.6895 10.7487 19.0005C10.7487 18.9155 10.7647 18.8325 10.7817 18.7505H13.2157C13.2327 18.8325 13.2487 18.9155 13.2487 19.0005ZM19.1757 16.9705C19.1277 17.0545 18.9867 17.2495 18.6957 17.2495H5.30166C5.01166 17.2495 4.86967 17.0545 4.82167 16.9705C4.77467 16.8865 4.67967 16.6655 4.82867 16.4175L5.93467 14.5715C6.47067 13.6785 6.75267 12.6565 6.75267 11.6165V8.9895C6.75267 6.1005 9.10566 3.74951 11.9977 3.74951C14.8897 3.74951 17.2427 6.1005 17.2427 8.9895V11.6165C17.2427 12.6565 17.5257 13.6785 18.0607 14.5715L19.1667 16.4175C19.3167 16.6655 19.2227 16.8865 19.1757 16.9705Z"
        fill={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default IconBell;
