import React, { FC } from 'react';
import {
  StatusBar as RNStatusBar,
  StyleProp,
  StyleSheet,
  useColorScheme,
  View,
  ViewProps,
  ViewStyle
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/design-system';

import { ICoreUIBaseProps } from '../types';

interface IStatusBarProps extends ICoreUIBaseProps {
  background?: string;
  color?: 'dark-content' | 'light-content';
  style?: StyleProp<ViewProps>;
}

const StatusBar: FC<IStatusBarProps> = ({ style, background = Colors.transparent, visible = true }) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  const textColor = colorScheme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <>
      <RNStatusBar barStyle={textColor} hidden={!visible} translucent={true} backgroundColor={Colors.transparent} />
      {visible && <View style={[{ height: insets.top }, styles.background(background), style]} />}
    </>
  );
};

export default StatusBar;

const styles = StyleSheet.create<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  background(color: string): ViewStyle;
}>({
  background: color => {
    return { backgroundColor: color };
  }
});
