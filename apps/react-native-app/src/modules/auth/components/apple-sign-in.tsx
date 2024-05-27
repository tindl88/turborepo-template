import React, { FC } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

import Button from '@/components/core-ui/button';
// import {useAuthState} from '@/modules/auth/states/auth.state';
import BrandApple from '@/components/svgs/brand-apple';

interface IAppleSignInProps {
  style?: StyleProp<PressableProps | ViewStyle>;
}

const AppleSignIn: FC<IAppleSignInProps> = ({ style }) => {
  // const auth = useAuthState();

  const onPress = async () => {
    try {
      // auth.loginRequest({provider: 'apple'});
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
