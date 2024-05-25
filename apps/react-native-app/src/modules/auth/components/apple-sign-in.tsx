import React, {FC} from 'react';
import {PressableProps, StyleProp, ViewStyle} from 'react-native';

// import {useAuthState} from '@/modules/auth/states/auth.state';
import BrandApple from '@/components/svgs/brand-apple';
import {IconButton} from '@/components/ui/icon-button';

interface IAppleSignInProps {
  style?: StyleProp<PressableProps | ViewStyle>;
}

const AppleSignIn: FC<IAppleSignInProps> = ({style}) => {
  // const auth = useAuthState();

  const onPress = async () => {
    try {
      console.log('Apple Sign');
      // auth.loginRequest({provider: 'apple'});
    } catch (error) {
      console.log('AUTH-FACEBOOK:', error);
    }
  };

  return (
    <IconButton style={style} onPress={onPress}>
      <BrandApple />
    </IconButton>
  );
};

export default AppleSignIn;
