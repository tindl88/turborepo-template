/* Magicoon - Regular */
import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '@/components/core-ui/themes';

import {ISvgBaseProps} from './types';

interface IIconBookmarkProps {}

const IconBookmark: FC<IIconBookmarkProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M15 2.25073H9C6.381 2.25073 4.25 4.38173 4.25 7.00073V19.9988C4.25 20.6518 4.60899 21.2457 5.18799 21.5487C5.76799 21.8517 6.46001 21.8088 6.99701 21.4368L11.856 18.0697C11.942 18.0107 12.056 18.0107 12.141 18.0697L17.004 21.4368C17.303 21.6438 17.65 21.7488 18 21.7488C18.278 21.7488 18.557 21.6827 18.812 21.5477C19.391 21.2447 19.75 20.6507 19.75 19.9977V7.00073C19.75 4.38173 17.619 2.25073 15 2.25073ZM18.25 19.9988C18.25 20.1308 18.166 20.1947 18.116 20.2207C18.067 20.2477 17.967 20.2807 17.857 20.2047L12.994 16.8378C12.696 16.6308 12.347 16.5277 11.998 16.5277C11.649 16.5277 11.299 16.6318 11.001 16.8378L6.142 20.2037C6.034 20.2777 5.934 20.2457 5.884 20.2197C5.834 20.1937 5.75 20.1298 5.75 19.9988V7.00073C5.75 5.20873 7.208 3.75073 9 3.75073H15C16.792 3.75073 18.25 5.20873 18.25 7.00073V19.9988Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconBookmark;
