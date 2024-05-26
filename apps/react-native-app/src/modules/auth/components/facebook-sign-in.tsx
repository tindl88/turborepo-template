import React, { FC } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

import { Button } from '@/components/core-ui';
import BrandFacebook from '@/components/svgs/brand-facebook';

import { useAuthState } from '@/modules/auth/states/auth.state';

interface IFacebookSignInProps {
  style?: StyleProp<PressableProps | ViewStyle>;
}

const FacebookSignIn: FC<IFacebookSignInProps> = ({ style }) => {
  const auth = useAuthState();

  const onPress = async () => {
    try {
      auth.loginRequest({ provider: 'facebook', facebook: { permissions: ['public_profile', 'email'] } });
    } catch (error) {
      throw error;
    }
  };

  return (
    <Button style={style} onPress={onPress}>
      <BrandFacebook />
    </Button>
  );
};

export default FacebookSignIn;
