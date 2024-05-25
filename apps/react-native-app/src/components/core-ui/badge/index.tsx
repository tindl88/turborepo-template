import React, {FC} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import Text from '../text';
import {ICoreUIBaseProps} from '../types';

interface IBadgeProps extends ICoreUIBaseProps {
  size?: number;
  value?: string;
  style?: StyleProp<ViewStyle>;
}

const Badge: FC<IBadgeProps> = ({size = 12, value = '', visible = true}) => {
  if (!visible) return null;

  return (
    <View style={styles.component(size)}>
      <Text>{value}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  component(size: number): ViewStyle;
}>({
  component: size => {
    return {
      width: size,
      height: size
    };
  }
});
