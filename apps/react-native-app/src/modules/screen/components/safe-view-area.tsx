import React, { FC, ReactNode } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ds } from '@/design-system';

import { useScreenState } from '@/modules/screen/states/screen.state';

import { createStyle } from '@/utils/stylesheet.util';

interface ISafeViewAreaProps extends ViewProps {
  children: ReactNode;
  backgroundColor?: string;
  spacingTop?: boolean;
  spacingRight?: boolean;
  spacingBottom?: boolean;
  spacingLeft?: boolean;
}

const SafeViewArea: FC<ISafeViewAreaProps> = ({ children, ...rest }) => {
  const insets = useSafeAreaInsets();
  const screenState = useScreenState();

  return (
    <View
      style={[
        ds.flex1,
        screenState.spacingTop && styles.spacingTop(insets),
        screenState.spacingRight && styles.spacingRight(insets),
        screenState.spacingBottom && styles.spacingBottom(insets),
        screenState.spacingLeft && styles.spacingLeft(insets)
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default SafeViewArea;

const styles = createStyle({
  spacingTop: (insets: EdgeInsets): ViewStyle => {
    return { paddingTop: insets.top };
  },
  spacingRight: (insets: EdgeInsets): ViewStyle => {
    return { paddingRight: insets.right };
  },
  spacingBottom: (insets: EdgeInsets): ViewStyle => {
    return { paddingBottom: insets.bottom };
  },
  spacingLeft: (insets: EdgeInsets): ViewStyle => {
    return { paddingLeft: insets.left };
  }
});
