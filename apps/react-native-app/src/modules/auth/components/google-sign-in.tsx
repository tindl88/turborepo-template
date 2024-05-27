import React, { FC } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

import Button from '@/components/core-ui/button';
import BrandGoogle from '@/components/svgs/brand-google';

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
      throw error;
    }
  };

  return (
    <Button style={style} onPress={onPress}>
      <BrandGoogle />
    </Button>
  );
};

export default GoogleSignIn;
