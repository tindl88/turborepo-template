/* Magicoon - Regular */
import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '@/components/core-ui/themes';

import {ISvgBaseProps} from './types';

interface IIconImageProps {}

const IconImage: FC<IIconImageProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M17 3.25H7C4.381 3.25 2.25 5.381 2.25 8V16C2.25 16.373 2.30299 16.731 2.38499 17.079C2.39699 17.126 2.40699 17.1709 2.42799 17.2159C2.96899 19.2439 4.804 20.75 7 20.75H17C19.619 20.75 21.75 18.619 21.75 16V8C21.75 5.381 19.619 3.25 17 3.25ZM7 4.75H17C18.792 4.75 20.25 6.208 20.25 8V13.189L16.24 9.17896C15.556 8.49496 14.443 8.49496 13.76 9.17896L9 13.939L8.24001 13.179C7.55601 12.495 6.44299 12.495 5.75999 13.179L3.75 15.189V8C3.75 6.208 5.208 4.75 7 4.75ZM17 19.25H7C5.597 19.25 4.41099 18.352 3.95599 17.104L6.82001 14.24C6.94701 14.113 7.052 14.113 7.179 14.24L8.119 15.1801C8.604 15.6651 9.394 15.6651 9.88 15.1801L14.82 10.24C14.918 10.142 15.082 10.142 15.179 10.24L20.249 15.3101V16C20.25 17.792 18.792 19.25 17 19.25ZM7 9C7 8.448 7.448 8 8 8C8.552 8 9 8.448 9 9C9 9.552 8.552 10 8 10C7.448 10 7 9.552 7 9Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconImage;
