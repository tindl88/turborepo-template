import React, { FC } from 'react';
import { Platform, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { SIGN_IN_AUTHENTICATOR, SIGN_IN_PROVIDER } from '../constants/auth.constant';

import Button from '@/components/core-ui/button';
import BrandApple from '@/components/svgs/brand-apple';

import { useAuthState } from '../states/auth.state';

interface IAppleSignInProps {
  style?: StyleProp<PressableProps | ViewStyle>;
}

const AppleSignIn: FC<IAppleSignInProps> = ({ style }) => {
  const authState = useAuthState();

  if (Platform.OS !== 'ios') return null;

  return (
    <Button
      style={style}
      onPress={() => {
        authState.loginRequest({
          provider: SIGN_IN_PROVIDER.APPLE,
          authenticator: SIGN_IN_AUTHENTICATOR.SELF_HOSTED
        });
      }}
    >
      <BrandApple />
    </Button>
  );
};

export default AppleSignIn;
