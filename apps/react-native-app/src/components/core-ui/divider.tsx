import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { createStyle } from '~react-native-design-system/utils/stylesheet.util';

import { ICoreUIBaseProps } from './types';
import View from './view';

interface IDividerProps extends ICoreUIBaseProps {
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const Divider: FC<IDividerProps> = ({ height = 10, visible = true }) => {
  if (!visible) return null;

  return <View style={styles.component(height)} />;
};

export default Divider;

const styles = createStyle({
  component: (height: number): ViewStyle => {
    return {
      height: height
    };
  }
});
