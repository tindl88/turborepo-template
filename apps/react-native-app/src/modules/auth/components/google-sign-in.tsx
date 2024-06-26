import React, { FC } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useMutation } from '@tanstack/react-query';
import { ds } from '~react-native-design-system';

import { OAuthGoogleSignInDto, SignInResponse } from '../interfaces/auth.interface';

import { AUTH_AUTHENTICATOR } from '../constants/auth.constant';

import BrandGoogle from '@/components/svgs/brand-google';

import log from '@/utils/logger.util';
import { getRefreshTokenFromHeader } from '../utils/session.util';

import AuthApi from '../api/auth.api';
import { useAuthState } from '../states/auth.state';

interface IGoogleSignInProps {
  style?: StyleProp<PressableProps | ViewStyle>;
}

GoogleSignin.configure({
  webClientId: '839571110220-hmcb4ikmoripqlr1hctrh6qkndmd374j.apps.googleusercontent.com'
});

const GoogleSignIn: FC<IGoogleSignInProps> = ({ style }) => {
  const authState = useAuthState();
  const mutation = useMutation({
    mutationFn: async (oAuthGoogleSignInDto: OAuthGoogleSignInDto) => {
      const { authenticator } = oAuthGoogleSignInDto;

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const { idToken } = await GoogleSignin.signIn();

      if (!idToken) {
        throw new Error('Google Sign-In failed - no identify token returned');
      }

      if (authenticator === AUTH_AUTHENTICATOR.FIREBASE) {
        const ggAuthCredential = Auth.GoogleAuthProvider.credential(idToken);
        const googleSignInRes = await Auth().signInWithCredential(ggAuthCredential);
        const userIdToken = await googleSignInRes.user.getIdToken();

        return AuthApi.googleSignIn(authenticator, userIdToken);
      } else {
        return AuthApi.googleSignIn(authenticator, idToken);
      }
    },
    onSuccess: resp => {
      const refreshToken = getRefreshTokenFromHeader<SignInResponse>(resp);

      authState.setAccessToken(resp.data.data.accessToken);
      authState.setRefreshToken(refreshToken);
      authState.setAuthData(resp.data.data.user);
      log.extend('AUTH').info('Login Google Success');
    },
    onError: error => log.extend('AUTH').error('Login Google Failed', error)
  });

  return (
    <Pressable
      style={[ds.row, ds.itemsCenter, ds.justifyCenter, style]}
      onPress={() => {
        mutation.mutate({
          authenticator: AUTH_AUTHENTICATOR.SELF_HOSTED
        });
      }}
    >
      <BrandGoogle size={36} />
    </Pressable>
  );
};

export default GoogleSignIn;
