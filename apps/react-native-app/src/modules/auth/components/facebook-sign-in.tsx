import React, { FC } from 'react';
import { Platform, PressableProps, StyleProp, ViewStyle } from 'react-native';

import { SIGN_IN_AUTHENTICATOR, SIGN_IN_PROVIDER } from '../constants/auth.constant';

import Button from '@/components/core-ui/button';
import BrandFacebook from '@/components/svgs/brand-facebook';

import { useAuthState } from '@/modules/auth/states/auth.state';

interface IFacebookSignInProps {
  style?: StyleProp<PressableProps | ViewStyle>;
}

const FacebookSignIn: FC<IFacebookSignInProps> = ({ style }) => {
  const authState = useAuthState();

  return (
    <Button
      style={style}
      onPress={() => {
        authState.loginRequest({
          provider: SIGN_IN_PROVIDER.FACEBOOK,
          authenticator: SIGN_IN_AUTHENTICATOR.SELF_HOSTED,
          facebook: {
            limited: Platform.OS === 'ios',
            permissions: ['public_profile', 'email']
          }
        });
      }}
    >
      <BrandFacebook />
    </Button>
  );
};

export default FacebookSignIn;
