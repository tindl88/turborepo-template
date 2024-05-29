import React, { FC, memo, useEffect, useRef } from 'react';
import { Animated, Easing, View, ViewStyle } from 'react-native';
import { Colors } from '@/design-system';

import { useTheme } from '@/modules/theme/components/provider';

import { createStyle } from '@/utils/stylesheet.util';

import { ICoreUIBaseProps } from './types';

interface ILoadingProps extends ICoreUIBaseProps {
  animationSpeed?: number;
  fadeSpeed?: number;
  size?: 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 68 | 72;
  thickness?: 0 | 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20;
  color?: string;
  trackColor?: string;
}

const Loading: FC<ILoadingProps> = ({
  animationSpeed = 1000,
  fadeSpeed = 0,
  size = 28,
  thickness = 6,
  color = Colors.blue[500],
  trackColor = Colors.gray[300],
  visible = true
}) => {
  const { themeConfigs } = useTheme();
  const rotation = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation(animationSpeed, fadeSpeed, fade, rotation);
  }, [animationSpeed, fade, fadeSpeed, rotation]);

  if (!visible) return null;

  return (
    <Animated.View
      accessibilityRole="progressbar"
      style={[
        styles.component(size),
        {
          opacity: fade.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
          transform: [{ rotateZ: rotation.interpolate({ inputRange: [0, 360], outputRange: ['0deg', '360deg'] }) }]
        }
      ]}
    >
      <View style={styles.circle(size, thickness, themeConfigs.primary || color, trackColor)} />
    </Animated.View>
  );
};

export default memo(Loading);

const styles = createStyle({
  component: (size: number): ViewStyle => {
    return {
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center'
    };
  },
  circle: (size: number, thickness: number, color: string, trackColor: string): ViewStyle => {
    return {
      borderWidth: thickness,
      borderRadius: size / 2,
      borderTopColor: color,
      borderLeftColor: trackColor,
      borderRightColor: trackColor,
      borderBottomColor: trackColor,
      width: '100%',
      height: '100%'
    };
  },
  test: {
    backgroundColor: 'red'
  }
});

function startAnimation(rotateSpeed: number, fadeSpeed: number, fade: Animated.Value, rotation: Animated.Value) {
  Animated.sequence([
    Animated.delay(50),
    Animated.timing(fade, { toValue: 1, duration: fadeSpeed, easing: Easing.linear, useNativeDriver: true })
  ]).start();
  Animated.loop(
    Animated.timing(rotation, { toValue: 360, duration: rotateSpeed, easing: Easing.linear, useNativeDriver: true })
  ).start();
}
