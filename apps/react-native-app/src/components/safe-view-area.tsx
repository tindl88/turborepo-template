import React, { FC, ReactNode } from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ds } from '~react-native-design-system';
import { createStyle } from '~react-native-design-system/utils/stylesheet.util';

interface ISafeViewAreaProps extends ViewProps {
  children: ReactNode;
  backgroundColor?: string;
  spacingTop?: boolean;
  spacingRight?: boolean;
  spacingBottom?: boolean;
  spacingLeft?: boolean;
}

const SafeViewArea: FC<ISafeViewAreaProps> = ({
  children,
  spacingTop,
  spacingRight,
  spacingBottom,
  spacingLeft,
  ...rest
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        ds.flex1,
        spacingTop && styles.spacingTop(insets),
        spacingRight && styles.spacingRight(insets),
        spacingBottom && styles.spacingBottom(insets),
        spacingLeft && styles.spacingLeft(insets)
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
