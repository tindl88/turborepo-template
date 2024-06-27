import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type StaticStyle = ViewStyle | TextStyle | ImageStyle;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DynamicStyleFunction = (...args: any[]) => StaticStyle;

type NamedStyles<T> = { [P in keyof T]: StaticStyle | DynamicStyleFunction };

export function createStyle<T extends NamedStyles<T>>(styles: T) {
  const staticStyles: { [P in keyof T]?: StaticStyle } = {};
  const dynamicStyles: { [P in keyof T]?: DynamicStyleFunction } = {};

  for (const key in styles) {
    const style = styles[key];

    if (typeof style !== 'function') {
      staticStyles[key] = style as StaticStyle;
    } else {
      dynamicStyles[key] = style as DynamicStyleFunction;
    }
  }

  const createdStaticStyles = StyleSheet.create(staticStyles as { [P in keyof T]: StaticStyle });

  return { ...createdStaticStyles, ...dynamicStyles } as T;
}
