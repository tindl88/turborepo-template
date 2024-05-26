/* Magicoon - Regular */
import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '@/design-system';

import { ISvgBaseProps } from './types';

interface IIconHeartProps {}

const IconHeart: FC<IIconHeartProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M20.1097 5.0965C18.8627 3.5835 17.1297 2.75049 15.2277 2.75049C14.0837 2.75049 12.9777 3.02847 11.9997 3.55847C11.0227 3.02847 9.91674 2.75049 8.77174 2.75049C6.86974 2.75049 5.13575 3.5835 3.88975 5.0965C2.53375 6.7425 1.97175 8.9905 2.38475 11.1095C3.35975 16.1055 8.44774 19.5955 10.5907 20.8635C11.0257 21.1205 11.5127 21.2495 11.9997 21.2495C12.4867 21.2495 12.9747 21.1215 13.4097 20.8635C15.5517 19.5945 20.6407 16.1055 21.6157 11.1095C22.0277 8.9905 21.4657 6.7425 20.1097 5.0965ZM20.1427 10.8225C19.2847 15.2215 14.6137 18.4075 12.6447 19.5725C12.2477 19.8085 11.7517 19.8075 11.3547 19.5725C9.38575 18.4075 4.71473 15.2215 3.85673 10.8225C3.52773 9.13851 3.97374 7.35448 5.04674 6.05048C6.00374 4.88948 7.32574 4.25049 8.77174 4.25049C9.78974 4.25049 10.7657 4.53049 11.5957 5.06049C11.8417 5.21749 12.1577 5.21749 12.4037 5.06049C13.2337 4.53049 14.2097 4.25049 15.2277 4.25049C16.6727 4.25049 17.9957 4.88948 18.9527 6.05048C20.0257 7.35448 20.4707 9.13751 20.1427 10.8225Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconHeart;
