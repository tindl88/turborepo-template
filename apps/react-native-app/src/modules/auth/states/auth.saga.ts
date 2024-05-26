import { AxiosResponse } from 'axios';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import Auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  NativeFirebaseError,
  ResetPasswordDto,
  SignInDto,
  SignInResponse,
  SignOutDto,
  SignOutResponse
} from '../interfaces/auth.interface';

import { getErrorMessage } from '@/utils/error-handle.util';
import { sleep } from '@/utils/miscs.util';

import AuthApi from '../api/auth.api';

import slices from './auth.slice';

const LOGIN_DELAY = 1000;

export function* login(action: PayloadAction<SignInDto>) {
  try {
    const { provider } = action.payload;

    const regularSignInActions = async () => {
      await sleep(LOGIN_DELAY);

      return AuthApi.signIn(action.payload);
    };

    const facebookSignInActions = async (permissions: string[]) => {
      await sleep(LOGIN_DELAY);

      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(permissions);

      if (result.isCancelled) throw 'User cancelled the login process';

      // Once signed in, get the users AccessToken
      const fbAccessToken = await AccessToken.getCurrentAccessToken();

      if (!fbAccessToken) throw 'Something went wrong obtaining access token';

      // Create a Firebase credential with the AccessToken
      const fbAuthCredential = Auth.FacebookAuthProvider.credential(fbAccessToken.accessToken);

      // Sign-in the user with the credential
      const fbCredential = await Auth().signInWithCredential(fbAuthCredential);

      if (!fbCredential) throw 'Something went wrong obtaining facebook account';

      return AuthApi.facebookSignIn(fbAccessToken.accessToken);
    };

    const googleSignInActions = async () => {
      await sleep(LOGIN_DELAY);
      GoogleSignin.configure({
        webClientId: '839571110220-hmcb4ikmoripqlr1hctrh6qkndmd374j.apps.googleusercontent.com'
      });

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      if (!idToken) throw 'Something went wrong idToken';

      // Create a Google credential with the token
      const ggAuthCredential = Auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const ggCredential = await Auth().signInWithCredential(ggAuthCredential);

      if (!ggCredential) throw 'Something went wrong obtaining google account';

      return AuthApi.googleSignIn(idToken);
    };

    switch (provider) {
      case 'password':
        const credentialResponse: AxiosResponse<SignInResponse> = yield call(regularSignInActions);

        yield put(slices.actions.loginSuccess(credentialResponse.data));
        break;
      case 'facebook':
        const facebookResponse: AxiosResponse<SignInResponse> = yield call(() =>
          facebookSignInActions(action.payload.facebook?.permissions || [])
        );

        yield put(slices.actions.loginSuccess(facebookResponse.data));
        break;
      case 'google':
        const googleResponse: AxiosResponse<SignInResponse> = yield call(googleSignInActions);

        yield put(slices.actions.loginSuccess(googleResponse.data));
        break;
    }
  } catch (error: unknown) {
    const err = error as NativeFirebaseError;
    const message = getErrorMessage(err);

    console.log(err);
    // Ref: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth

    yield put(slices.actions.loginFailure({ statusCode: 400, error: err.code || 'Bad Request', message: message }));
  }
}

export function* logout(action: PayloadAction<SignOutDto>) {
  try {
    const signOutActions = async () => {
      return AuthApi.signOut({ token: action.payload.token });
    };

    const response: SignOutResponse = yield call(signOutActions);

    yield put(slices.actions.logoutSuccess(response));
  } catch (error) {
    const err = error as Error;

    yield put(slices.actions.logoutFailure(err));
  }
}

export function* resetPassword(action: PayloadAction<ResetPasswordDto>) {
  try {
    const response = action.payload;

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
