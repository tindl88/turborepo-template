import React, { FC } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

import { ICoreUIBaseProps } from './types';

interface IImageProps extends FastImageProps {}

const Image: FC<IImageProps & ICoreUIBaseProps> = ({ visible = true, ...props }) => {
  if (!visible) return null;

  return <FastImage {...props} />;
};

export default Image;
