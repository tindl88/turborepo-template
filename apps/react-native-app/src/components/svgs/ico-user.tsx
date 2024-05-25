/* Magicoon - Regular */
import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {Colors} from '@/components/core-ui/themes';

import {ISvgBaseProps} from './types';

interface IIconUserProps {}

const IconUser: FC<IIconUserProps & ISvgBaseProps> = ({
  width = 24,
  height = 24,
  color = Colors.neutral[700],
  ...props
}) => {
  return (
    <Svg height={height} width={width} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" {...props}>
      <Path
        d="M11.999 12.7498C14.894 12.7498 17.249 10.3948 17.249 7.49976C17.249 4.60476 14.894 2.24976 11.999 2.24976C9.10399 2.24976 6.74899 4.60476 6.74899 7.49976C6.74899 10.3948 9.10399 12.7498 11.999 12.7498ZM11.999 3.74976C14.067 3.74976 15.749 5.43176 15.749 7.49976C15.749 9.56776 14.067 11.2498 11.999 11.2498C9.93099 11.2498 8.24899 9.56776 8.24899 7.49976C8.24899 5.43176 9.93099 3.74976 11.999 3.74976ZM19.749 17.9668V18.9778C19.749 19.9128 19.408 20.8088 18.788 21.4998C18.64 21.6658 18.435 21.7498 18.229 21.7498C18.051 21.7498 17.872 21.6867 17.729 21.5587C17.42 21.2827 17.395 20.8088 17.671 20.4998C18.044 20.0828 18.25 19.5428 18.25 18.9788V17.9678C18.25 16.4538 17.246 15.1437 15.807 14.7827C15.554 14.7187 15.282 14.7538 15.061 14.8788C13.16 15.9368 10.834 15.9327 8.94498 14.8817C8.71898 14.7527 8.447 14.7157 8.194 14.7817C6.755 15.1437 5.74997 16.4538 5.74997 17.9678V18.9788C5.74997 19.5438 5.95601 20.0838 6.32901 20.4998C6.60501 20.8088 6.57897 21.2827 6.27097 21.5587C5.96097 21.8357 5.48701 21.8087 5.21201 21.5007C4.59201 20.8087 4.25101 19.9128 4.25101 18.9788V17.9678C4.25101 15.7658 5.72197 13.8578 7.82797 13.3278C8.45097 13.1698 9.12798 13.2598 9.68198 13.5758C11.112 14.3718 12.884 14.3748 14.326 13.5728C14.873 13.2608 15.55 13.1717 16.175 13.3287C18.278 13.8557 19.749 15.7638 19.749 17.9668Z"
        fill={color}
      />
    </Svg>
  );
};

export default IconUser;
