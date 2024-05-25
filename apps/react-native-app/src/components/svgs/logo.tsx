import React, {FC, useEffect, useRef} from 'react';
import {Animated, Easing, StyleProp, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface ILogoProps {
  scaleSpeed?: number;
  fadeSpeed?: number;
  width?: number;
  height?: number;
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Logo: FC<ILogoProps> = ({fadeSpeed = 600, width = 144, height = 132, visible = true, ...props}) => {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation(fadeSpeed, fade);
  }, []);

  if (!visible) return null;

  return (
    <Animated.View
      accessibilityRole="image"
      style={[
        {
          opacity: fade.interpolate({inputRange: [0, 1], outputRange: [0, 1]})
        }
      ]}
    >
      <Svg height={height} width={width} viewBox="0 0 144 132" preserveAspectRatio="xMidYMid meet" {...props}>
        <Path
          d="M134.632 131.678H9.36765C2.16485 131.678 -2.33279 123.896 1.26861 117.669L15.7203 92.6821C19.3712 86.3697 26.373 82.7414 33.6417 83.4256C66.2652 86.4947 86.5292 80.0803 110.062 74.5277C114.088 73.577 118.263 75.3698 120.332 78.9454L142.731 117.672C146.333 123.899 141.835 131.682 134.632 131.682V131.678Z"
          fill="#3D91CE"
        />
        <Path
          d="M97.876 59.2318C84.6726 64.5506 61.3208 72.4547 35.5068 74.2758C29.7695 74.6825 25.9206 68.4779 28.7968 63.4937L62.3238 5.39767C66.4767 -1.79922 76.8494 -1.79922 81.0023 5.39767L87.3057 16.3356L103.169 43.8306C106.448 49.5105 103.955 56.7834 97.8722 59.2356L97.876 59.2318Z"
          fill="#3CC7F4"
        />
      </Svg>
    </Animated.View>
  );
};

export default Logo;

function startAnimation(fadeSpeed: number, fade: Animated.Value) {
  Animated.timing(fade, {toValue: 1, duration: fadeSpeed, easing: Easing.ease, useNativeDriver: true}).start();
}
