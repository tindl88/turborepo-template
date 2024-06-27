import { TextStyle, ViewStyle } from 'react-native';
import { createStyle } from './stylesheet.util';

export const dynamicStyles = createStyle({
  background: (color: string): ViewStyle => {
    return { backgroundColor: color };
  },
  border: (color: string): ViewStyle => {
    return { borderColor: color };
  },
  color: (color: string): TextStyle => {
    return { color: color };
  },
  padding: (padding: number): ViewStyle => {
    return { padding };
  },
  size: (size: number): ViewStyle => {
    return { width: size, height: size };
  },
  paddingVerticle: (padding: number): ViewStyle => {
    return { paddingVertical: padding };
  },
  paddingHorizontal: (padding: number): ViewStyle => {
    return { paddingHorizontal: padding };
  }
});
