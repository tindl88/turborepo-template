import { ImageStyle } from 'react-native';

type ResizeModeType = {
  resizeCover: ImageStyle;
  resizeContain: ImageStyle;
  resizeStretch: ImageStyle;
  resizeRepeat: ImageStyle;
  resizeEnter: ImageStyle;
};

export type ImageStyles = {
  resizeMode: ResizeModeType;
};
