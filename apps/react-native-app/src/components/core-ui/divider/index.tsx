import React, {FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {ICoreUIBaseProps} from '../types';

interface IDividerProps extends ICoreUIBaseProps {
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const Divider: FC<IDividerProps> = ({height = 10, visible = true}) => {
  if (!visible) return null;

  return <View style={styles.component(height)} />;
};

export default Divider;

const styles = StyleSheet.create<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  component(height: number): ViewStyle;
}>({
  component: height => {
    return {
      height: height
    };
  }
});
