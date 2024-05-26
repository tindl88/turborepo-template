import React, { FC } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

import BrandFacebook from '@/components/svgs/brand-facebook';
import { IconButton } from '@/components/ui/icon-button';

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
      console.log('AUTH-FACEBOOK:', error);
    }
  };

  return (
    <IconButton style={style} onPress={onPress}>
      <BrandFacebook />
    </IconButton>
  );
};

export default FacebookSignIn;
