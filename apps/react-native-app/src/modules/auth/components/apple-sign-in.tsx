import React, { FC } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

import Button from '@/components/core-ui/button';
import BrandApple from '@/components/svgs/brand-apple';

import { useAuthState } from '../states/auth.state';

interface IAppleSignInProps {
  style?: StyleProp<PressableProps | ViewStyle>;
}

const AppleSignIn: FC<IAppleSignInProps> = ({ style }) => {
  const authState = useAuthState();

  const onPress = async () => {
    try {
      authState.loginRequest({ provider: 'apple' });
    } catch (error) {
      throw error;
    }
  };

  return (
    <Button style={style} onPress={onPress}>
      <BrandApple />
    </Button>
  );
};

export default AppleSignIn;
