import React, { FC } from 'react';
import { StatusBar as RNStatusBar, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/design-system';

import { useTheme } from '@/modules/theme/components/provider';

import { createStyle } from '@/utils/stylesheet.util';

import { ICoreUIBaseProps } from './types';

interface IStatusBarProps extends ICoreUIBaseProps {
  background?: string;
  color?: 'dark-content' | 'light-content';
  style?: StyleProp<ViewProps>;
}

const StatusBar: FC<IStatusBarProps> = ({ style, background = Colors.transparent, visible = true }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? 'light-content' : 'dark-content';

  return (
    <>
      <RNStatusBar barStyle={textColor} hidden={!visible} translucent={true} backgroundColor={Colors.transparent} />
      {visible && <View style={[{ height: insets.top }, styles.background(background), style]} />}
    </>
  );
};

export default StatusBar;

const styles = createStyle({
  background: (color: string): ViewStyle => {
    return { backgroundColor: color };
  }
});
