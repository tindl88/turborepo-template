import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  Easing,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming
} from 'react-native-reanimated';
import { ds } from '~react-native-design-system';

import { CHILD_ANIM_DURATION, LAYOUT_ANIM_DURATION, MODAL_ANIM_DURATION } from './global-modal.constants';

type ChildWrapperProps = {
  children: React.ReactNode;
  isEnabled: boolean;
  ignoreDelay: boolean;
  hideClose?: boolean;
  onClosePress: () => void;
  onEnterAnimationFinished: () => void;
};

function ChildWrapper({
  isEnabled,
  ignoreDelay,
  hideClose,
  onClosePress,
  onEnterAnimationFinished,
  children
}: ChildWrapperProps) {
  const { t } = useTranslation();
  const opacityValue = useSharedValue(0);
  const viewStyle = useAnimatedStyle(() => {
    return { opacity: opacityValue.value };
  }, [isEnabled]);

  useEffect(() => {
    if (isEnabled) {
      opacityValue.value = withDelay(
        ignoreDelay ? 0 : CHILD_ANIM_DURATION + LAYOUT_ANIM_DURATION,
        withTiming(1, { duration: CHILD_ANIM_DURATION, easing: Easing.ease }, finished => {
          if (finished) {
            runOnJS(onEnterAnimationFinished)();
          }
        })
      );
    } else {
      opacityValue.value = withTiming(0, { duration: CHILD_ANIM_DURATION, easing: Easing.ease });
    }
  }, [isEnabled, ignoreDelay]);

  return (
    <Animated.View
      needsOffscreenAlphaCompositing
      style={[viewStyle, isEnabled ? ds.relative : ds.absolute]}
      exiting={ignoreDelay ? undefined : FadeOut.duration(MODAL_ANIM_DURATION)}
    >
      {children}
      {!hideClose && (
        <Pressable style={[styles.button, styles.buttonClose]} onPress={onClosePress}>
          <Text style={styles.textStyle}>{t('close')}</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    marginTop: 16
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default ChildWrapper;
