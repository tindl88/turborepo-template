import React, { FC } from 'react';
import { StatusBar as RNStatusBar, StyleProp, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import { useThemeState } from '@/modules/theme/states/theme.state';

import { ICoreUIBaseProps } from './types';
import View from './view';

interface IStatusBarProps extends ICoreUIBaseProps {
  background?: string;
  color?: 'dark-content' | 'light-content';
  style?: StyleProp<ViewProps>;
}

const StatusBar: FC<IStatusBarProps> = ({ style, background, visible = true }) => {
  const insets = useSafeAreaInsets();
  const { theme, configs } = useThemeState();

  const textColor = theme.key === 'dark' ? 'light-content' : 'dark-content';

  return (
    <>
      <RNStatusBar barStyle={textColor} hidden={!visible} translucent={true} backgroundColor={Colors.transparent} />
      {visible && (
        <View style={[{ height: insets.top }, dynamicStyles.background(background ?? configs.card), style]} />
      )}
    </>
  );
};

export default StatusBar;
