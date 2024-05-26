import React, { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { DesignSystem as ds } from '@/components/core-ui/themes';

import { useScreenState } from '@/modules/screen/states/screen.state';

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

const styles = StyleSheet.create<{
  [k: string]: any;
  spacingTop(insets: EdgeInsets): ViewStyle;
  spacingRight(insets: EdgeInsets): ViewStyle;
  spacingBottom(insets: EdgeInsets): ViewStyle;
  spacingLeft(insets: EdgeInsets): ViewStyle;
}>({
  spacingTop: insets => {
    return { paddingTop: insets.top };
  },
  spacingRight: insets => {
    return { paddingRight: insets.right };
  },
  spacingBottom: insets => {
    return { paddingBottom: insets.bottom };
  },
  spacingLeft: insets => {
    return { paddingLeft: insets.left };
  }
});
