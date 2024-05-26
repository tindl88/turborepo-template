import React, { FC, memo } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Colors, ds } from '@/design-system';

import Text from '../text';
import { ICoreUIBaseProps, RoundedType } from '../types';

interface IProgressBarProps extends ICoreUIBaseProps {
  value?: number;
  height?: number;
  barColor?: string;
  trackColor?: string;
  showText?: boolean;
  text?: string;
  textSize?: number;
  textColor?: string;
  rounded?: RoundedType;
}

const ProgressBar: FC<IProgressBarProps> = ({
  value = 0,
  barColor = Colors.amber[100],
  trackColor = Colors.gray[50],
  height = 10,
  rounded = 4,
  text,
  textSize = 12,
  textColor = Colors.white,
  showText = false,
  visible = true
}) => {
  if (!visible) return null;

  return (
    <View style={ds.relative}>
      <View style={[ds.flex, styles.track(height, trackColor, rounded)]}>
        <View style={[ds.hFull, styles.bar(value, barColor)]} />
      </View>
      {showText && (
        <View style={[ds.absolute, ds.top0, ds.hFull, ds.wFull, ds.flex1, ds.itemsCenter, ds.justifyCenter]}>
          <Text style={styles.text(textSize, textColor)}>{text ? text : value + '%'}</Text>
        </View>
      )}
    </View>
  );
};

export default memo(ProgressBar);

const styles = StyleSheet.create<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  track(height: number, background: string, rounded: number): ViewStyle;
  bar(value: number, color: string): ViewStyle;
  text(size: number, color: string): TextStyle;
}>({
  track: (height, color, rounded) => {
    return {
      height: height,
      width: '100%',
      backgroundColor: color,
      borderRadius: rounded
    };
  },
  bar: (value, color) => {
    return {
      width: `${value}%`,
      backgroundColor: color
    };
  },
  text: (size, color) => {
    return {
      fontSize: size,
      color: color
    };
  }
});
