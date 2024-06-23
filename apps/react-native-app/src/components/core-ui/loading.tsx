import React, { FC, useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';
import { Colors } from '~react-native-design-system';

import { useThemeState } from '@/modules/theme/states/theme.state';

import { createStyle } from '@/utils/stylesheet.util';

import { ICoreUIBaseProps } from './types';
import View from './view';

interface ILoadingProps extends ICoreUIBaseProps {
  animationSpeed?: number;
  fadeSpeed?: number;
  size?: number;
  thickness?: number;
  color?: string;
  trackColor?: string;
}

const Loading: FC<ILoadingProps> = ({
  animationSpeed = 1000,
  fadeSpeed = 0,
  size = 24,
  thickness = 3,
  color = Colors.stone[700],
  trackColor = Colors.stone[300],
  visible = true
}) => {
  const { configs } = useThemeState();
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
      <View style={styles.circle(size, thickness, configs.primary[500] || color, trackColor)} />
    </Animated.View>
  );
};

export default Loading;

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
