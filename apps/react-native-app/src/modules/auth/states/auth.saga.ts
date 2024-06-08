import { AxiosResponse } from 'axios';
import { AccessToken, AuthenticationToken, LoginManager } from 'react-native-fbsdk-next';
import { sha256 } from 'react-native-sha256';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import Auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  NativeFirebaseError,
  ResetPasswordDto,
  SignInDto,
  SignInResponse,
  SignOutResponse
} from '../interfaces/auth.interface';

import { SIGN_IN_AUTHENTICATOR } from '../constants/auth.constant';

import log from '@/utils/logger.util';
import { sleep } from '@/utils/miscs.util';
import { getRefreshTokenFromHeader } from '../utils/session.util';

import AuthApi from '../api/auth.api';

import slices from './auth.slice';

const LOGIN_DELAY = 1000;

// FIXME: Move webClientId to ENV
GoogleSignin.configure({
  webClientId: '839571110220-hmcb4ikmoripqlr1hctrh6qkndmd374j.apps.googleusercontent.com'
});

export function* login(action: PayloadAction<SignInDto>) {
  try {
    const { authenticator, provider } = action.payload;
    let refreshToken: string | undefined;

    const passwordSignInActions = async () => {
      await sleep(LOGIN_DELAY);

      try {
        const formResp = await AuthApi.signIn(action.payload);

        return formResp;
      } catch (error) {
        log.extend('AUTH').error('Login with Password::', error);
      }
    };

    const facebookSignInActions = async (limited: boolean, permissions?: string[]) => {
      await sleep(LOGIN_DELAY);

      try {
        if (!permissions) throw new Error('Facebook permissions should not be empty');

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

        if (authenticator === SIGN_IN_AUTHENTICATOR.FIREBASE) {
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
          const facebookResp = await AuthApi.facebookSignIn(authenticator, userIdToken, limited);

          return facebookResp;
        } else {
          let facebookResp;

          if (limited) {
            if (!authenticationToken) {
              throw new Error('Authentication token is null');
            }
            facebookResp = await AuthApi.facebookSignIn(
              authenticator,
              authenticationToken.authenticationToken,
              limited
            );
          } else {
            if (!accessToken) {
              throw new Error('Access token is null');
            }
            facebookResp = await AuthApi.facebookSignIn(authenticator, accessToken.accessToken, limited);
          }

          return facebookResp;
        }
      } catch (error) {
        log.extend('AUTH').error('Login with Facebook::', error);
      }
    };

    const googleSignInActions = async () => {
      await sleep(LOGIN_DELAY);

      try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        const { idToken } = await GoogleSignin.signIn();

        if (!idToken) {
          throw new Error('Google Sign-In failed - no identify token returned');
        }

        if (authenticator === SIGN_IN_AUTHENTICATOR.FIREBASE) {
          const ggAuthCredential = Auth.GoogleAuthProvider.credential(idToken);
          const googleSignInRes = await Auth().signInWithCredential(ggAuthCredential);
          const userIdToken = await googleSignInRes.user.getIdToken();
          const googleResp = await AuthApi.googleSignIn(authenticator, userIdToken);

          return googleResp;
        } else {
          const googleResp = await AuthApi.googleSignIn(authenticator, idToken);

          return googleResp;
        }
      } catch (error) {
        log.extend('AUTH').error('Login with Google::', error);
      }
    };

    const appleSignInActions = async () => {
      await sleep(LOGIN_DELAY);
      try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL]
        });

        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('Apple Sign-In failed - no identify token returned');
        }

        const { identityToken, nonce } = appleAuthRequestResponse;

        if (authenticator === SIGN_IN_AUTHENTICATOR.FIREBASE) {
          const appleCredential = Auth.AppleAuthProvider.credential(identityToken, nonce);
          const appleSignInRes = await Auth().signInWithCredential(appleCredential);
          const userIdToken = await appleSignInRes.user.getIdToken();
          const appleResp = await AuthApi.appleSignIn(authenticator, userIdToken);

          return appleResp;
        } else {
          const appleResp = await AuthApi.appleSignIn(authenticator, identityToken);

          return appleResp;
        }
      } catch (error) {
        log.extend('AUTH').error('Login with Apple::', error);
      }
    };

    switch (provider) {
      case 'password':
        const credentialResponse: AxiosResponse<SignInResponse> = yield call(passwordSignInActions);

        refreshToken = getRefreshTokenFromHeader<SignInResponse>(credentialResponse);

        yield put(slices.actions.setRefreshToken(refreshToken));
        yield put(slices.actions.loginSuccess(credentialResponse.data));
        break;
      case 'facebook':
        const { facebook } = action.payload;

        if (!facebook) {
          throw new Error('Facebook limited and permissions properties are missing.');
        }

        const facebookResponse: AxiosResponse<SignInResponse> = yield call(() =>
          facebookSignInActions(facebook.limited, facebook.permissions)
        );

        refreshToken = getRefreshTokenFromHeader<SignInResponse>(facebookResponse);

        yield put(slices.actions.setRefreshToken(refreshToken));
        yield put(slices.actions.loginSuccess(facebookResponse.data));
        break;
      case 'google':
        const googleResponse: AxiosResponse<SignInResponse> = yield call(googleSignInActions);

        refreshToken = getRefreshTokenFromHeader<SignInResponse>(googleResponse);

        yield put(slices.actions.setRefreshToken(refreshToken));
        yield put(slices.actions.loginSuccess(googleResponse.data));
        break;
      case 'apple':
        const appleResponse: AxiosResponse<SignInResponse> = yield call(appleSignInActions);

        refreshToken = getRefreshTokenFromHeader<SignInResponse>(appleResponse);

        yield put(slices.actions.setRefreshToken(refreshToken));
        yield put(slices.actions.loginSuccess(appleResponse.data));
        break;
    }
  } catch (error) {
    const err = error as NativeFirebaseError;
    // Ref: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth

    yield put(slices.actions.loginFailure({ statusCode: 400, error: err.code, message: err.message }));
    log.extend('AUTH').error('Login Error::', error);
  }
}

export function* logout() {
  try {
    GoogleSignin.signOut();
    LoginManager.logOut();
    const response: AxiosResponse<SignOutResponse> = yield call(AuthApi.signOut);

    yield put(slices.actions.logoutSuccess(response.data));
  } catch (error) {
    const err = error as Error;

    yield put(slices.actions.logoutFailure(err));
  }
}

export function* resetPassword(action: PayloadAction<ResetPasswordDto>) {
  try {
    const response = action.payload;

    // FIXME: Fix response type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yield put(slices.actions.resetPasswordSuccess(response as any));
  } catch (error) {
    const err = error as Error;

    yield put(slices.actions.resetPasswordFailure(err));
  }
}

export function* verifyEmailOtp(action: PayloadAction<string>) {
  try {
    const response = action.payload;

    yield put(slices.actions.verifyEmailOtpSuccess(response));
  } catch (error: unknown) {
    const err = error as Error;

    yield put(slices.actions.verifyEmailOtpFailure(err));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(slices.actions.loginRequest.type, login),
    takeLatest(slices.actions.logoutRequest.type, logout),
    takeLatest(slices.actions.resetPasswordRequest.type, resetPassword),
    takeLatest(slices.actions.verifyEmailOtpRequest.type, verifyEmailOtp)
  ]);
}
