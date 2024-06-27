import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { createStyle } from '~react-native-design-system/utils/stylesheet.util';

import Text from './text';
import { ICoreUIBaseProps } from './types';
import View from './view';

interface IBadgeProps extends ICoreUIBaseProps {
  size?: number;
  value?: string;
  style?: StyleProp<ViewStyle>;
}

const Badge: FC<IBadgeProps> = ({ size = 12, value = '', visible = true }) => {
  if (!visible) return null;

  return (
    <View style={styles.component(size)}>
      <Text>{value}</Text>
    </View>
  );
};

export default Badge;

const styles = createStyle({
  component: (size: number): ViewStyle => {
    return {
      width: size,
      height: size
    };
  }
});
