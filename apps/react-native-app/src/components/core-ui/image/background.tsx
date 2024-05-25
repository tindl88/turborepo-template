import React, {ComponentProps, FC} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {ICoreUIBaseProps} from '../types';

interface IImageBackgroundProps extends ComponentProps<typeof FastImage> {}

const ImageBackground: FC<IImageBackgroundProps & ICoreUIBaseProps> = ({visible = true, style, ...props}) => {
  if (!visible) return null;

  return (
    <View style={[styles.component, style]}>
      <FastImage style={styles.component} {...props} />
    </View>
  );
};

export default ImageBackground;

const styles = StyleSheet.create({
  component: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
  }
});
