import React, { FC } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

import { SIGN_IN_AUTHENTICATOR, SIGN_IN_PROVIDER } from '../constants/auth.constant';

import Button from '@/components/core-ui/button';
import BrandGoogle from '@/components/svgs/brand-google';

import { useAuthState } from '@/modules/auth/states/auth.state';

interface IGoogleSignInProps {
  style?: StyleProp<PressableProps | ViewStyle>;
}
const GoogleSignIn: FC<IGoogleSignInProps> = ({ style }) => {
  const authState = useAuthState();

  return (
    <Button
      style={style}
      onPress={() => {
        authState.loginRequest({
          provider: SIGN_IN_PROVIDER.GOOGLE,
          authenticator: SIGN_IN_AUTHENTICATOR.SELF_HOSTED
        });
      }}
    >
      <BrandGoogle />
    </Button>
  );
};

export default GoogleSignIn;
