import React, { FC } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { Colors, ds } from '@/design-system';

import { createStyle } from '@/utils/stylesheet.util';

import Text from './text';
import { ICoreUIBaseProps } from './types';

interface IAvatarProps extends ICoreUIBaseProps {
  size?: number;
  src?: string;
  text?: string;
  background?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Avatar: FC<IAvatarProps> = ({
  size = 48,
  src,
  text,
  background = Colors.slate[300],
  visible = true,
  color,
  style,
  onPress
}) => {
  if (!visible) return null;

  return (
    <Pressable
      style={[ds.roundedFull, ds.itemsCenter, ds.justifyCenter, styles.component(size, background), style]}
      onPress={onPress}
    >
      {src ? (
        <FastImage source={{ uri: src }} style={[ds.wFull, ds.hFull, ds.roundedFull] as ImageStyle} />
      ) : (
        <Text style={[ds.fontBlack, ds.text20]} color={color}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default Avatar;

const styles = createStyle({
  component: (size: number, background: string): ViewStyle => {
    return {
      backgroundColor: background,
      width: size,
      height: size
    };
  }
});
