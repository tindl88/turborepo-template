import React, { FC } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

import BrandGoogle from '@/components/svgs/brand-google';
import { IconButton } from '@/components/ui/icon-button';

import { useAuthState } from '@/modules/auth/states/auth.state';

interface IGoogleSignInProps {
  style?: StyleProp<PressableProps | ViewStyle>;
}

const GoogleSignIn: FC<IGoogleSignInProps> = ({ style }) => {
  const auth = useAuthState();

  const onPress = async () => {
    try {
      auth.loginRequest({ provider: 'google' });
    } catch (error) {
      console.log('AUTH-GOOGLE:', error);
    }
  };

  return (
    <IconButton style={style} onPress={onPress}>
      <BrandGoogle />
    </IconButton>
  );
};

export default GoogleSignIn;
