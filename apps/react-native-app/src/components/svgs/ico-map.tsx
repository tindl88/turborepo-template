/* Magicoon - Regular */
import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '@/components/core-ui/themes';

import {ISvgBaseProps} from './types';

interface IIconMapProps {}

const IconMap: FC<IIconMapProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M20.414 3.67554C19.603 3.17954 18.611 3.14154 17.764 3.57654L15.553 4.71155C15.208 4.88955 14.796 4.88955 14.45 4.71155L10.239 2.54944C9.85498 2.35244 9.43397 2.25344 9.01297 2.25244C9.00897 2.25244 9.00498 2.25049 9.00098 2.25049C8.99698 2.25049 8.99298 2.25244 8.98898 2.25244C8.56798 2.25444 8.14797 2.35244 7.76297 2.54944L4.31598 4.31946C3.04198 4.97346 2.25098 6.28546 2.25098 7.74146V17.9185C2.25098 18.9135 2.75098 19.8125 3.58798 20.3235C4.39998 20.8205 5.39198 20.8575 6.23798 20.4225L8.44897 19.2875C8.79397 19.1095 9.20597 19.1095 9.55197 19.2875L13.763 21.4495C14.145 21.6465 14.564 21.7435 14.983 21.7455C14.989 21.7455 14.994 21.7495 15 21.7495C15.006 21.7495 15.011 21.7465 15.017 21.7455C15.436 21.7425 15.855 21.6455 16.237 21.4495L19.684 19.6794C20.958 19.0254 21.749 17.7134 21.749 16.2574V6.08044C21.751 5.08644 21.251 4.18654 20.414 3.67554ZM5.55298 19.0895C5.16798 19.2865 4.73796 19.2705 4.36996 19.0455C3.98196 18.8095 3.75098 18.3885 3.75098 17.9205V7.74353C3.75098 6.85153 4.22998 6.05152 5.00198 5.65552L8.25098 3.98755V17.7755C8.08498 17.8235 7.91998 17.8755 7.76398 17.9565L5.55298 19.0895ZM10.239 17.9545C10.083 17.8745 9.91698 17.8214 9.75098 17.7734V3.98547L13.763 6.04553C13.919 6.12553 14.085 6.17844 14.251 6.22644V20.0145L10.239 17.9545ZM20.251 16.2585C20.251 17.1505 19.772 17.9504 19 18.3464L15.751 20.0145V6.22644C15.917 6.17844 16.082 6.12653 16.238 6.04553L18.448 4.91052C18.832 4.71352 19.263 4.72947 19.631 4.95447C20.019 5.19047 20.25 5.61147 20.25 6.07947V16.2585H20.251Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconMap;
