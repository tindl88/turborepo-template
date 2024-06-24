import React, { FC } from 'react';
import { AxiosResponse } from 'axios';
import { Platform, Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { AccessToken, AuthenticationToken, LoginManager } from 'react-native-fbsdk-next';
import { sha256 } from 'react-native-sha256';
import Auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useMutation } from '@tanstack/react-query';
import { ds } from '~react-native-design-system';

import { OAuthFacebookSignInDto, SignInResponse } from '../interfaces/auth.interface';

import { AUTH_AUTHENTICATOR } from '../constants/auth.constant';

import BrandFacebook from '@/components/svgs/brand-facebook';

import log from '@/utils/logger.util';
import { getRefreshTokenFromHeader } from '../utils/session.util';

import AuthApi from '../api/auth.api';
import { useAuthState } from '../states/auth.state';

interface IFacebookSignInProps {
  style?: StyleProp<PressableProps | ViewStyle>;
}

const FacebookSignIn: FC<IFacebookSignInProps> = ({ style }) => {
  const authState = useAuthState();

  const mutation = useMutation({
    mutationFn: async (oAuthFacebookSignInDto: OAuthFacebookSignInDto) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { authenticator, limited, permissions } = oAuthFacebookSignInDto;

      const nonce = (Math.random() + 1).toString(36).substring(7);
      const nonceSha256 = await sha256(nonce);
      const result = await LoginManager.logInWithPermissions(permissions, 'limited', nonceSha256);

      let authenticationToken: AuthenticationToken | null = null;
      let accessToken: AccessToken | null = null;
      let facebookCredential: FirebaseAuthTypes.AuthCredential;

      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      if (limited) {
        authenticationToken = await AuthenticationToken.getAuthenticationTokenIOS();

        if (!authenticationToken) {
          throw new Error('Something went wrong obtaining authentication token');
        }
      } else {
        accessToken = await AccessToken.getCurrentAccessToken();

        if (!accessToken) {
          throw new Error('Something went wrong obtaining access token');
        }
      }

      if (authenticator === AUTH_AUTHENTICATOR.FIREBASE) {
        if (limited) {
          if (!authenticationToken) {
            throw new Error('Authentication token is null');
          }

          facebookCredential = Auth.FacebookAuthProvider.credential(authenticationToken.authenticationToken, nonce);
        } else {
          if (!accessToken) {
            throw new Error('Access token is null');
          }

          facebookCredential = Auth.FacebookAuthProvider.credential(accessToken.accessToken);
        }
        const facebookSignInRes = await Auth().signInWithCredential(facebookCredential);
        const userIdToken = await facebookSignInRes.user.getIdToken();

        return AuthApi.facebookSignIn(authenticator, userIdToken, limited);
      } else {
        let facebookResp: Promise<AxiosResponse<SignInResponse>>;

        if (limited) {
          if (!authenticationToken) {
            throw new Error('Authentication token is null');
          }
          facebookResp = AuthApi.facebookSignIn(authenticator, authenticationToken.authenticationToken, limited);
        } else {
          if (!accessToken) {
            throw new Error('Access token is null');
          }
          facebookResp = AuthApi.facebookSignIn(authenticator, accessToken.accessToken, limited);
        }

        return facebookResp;
      }
    },
    onSuccess: resp => {
      const refreshToken = getRefreshTokenFromHeader<SignInResponse>(resp);

      authState.setAccessToken(resp.data.data.accessToken);
      authState.setRefreshToken(refreshToken);
      authState.setAuthData(resp.data.data.user);
      log.extend('AUTH').info('Login Facebook Success');
    },
    onError: error => log.extend('AUTH').error('Login Facebook Failed', error)
  });

  return (
    <Pressable
      style={[ds.row, ds.itemsCenter, ds.justifyCenter, style]}
      onPress={() => {
        mutation.mutate({
          authenticator: AUTH_AUTHENTICATOR.SELF_HOSTED,
          limited: Platform.OS === 'ios',
          permissions: ['public_profile', 'email']
        });
      }}
    >
      <BrandFacebook size={36} />
    </Pressable>
  );
};

export default FacebookSignIn;
