import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CreateUserDto, CreateUserResponse} from '@/modules/users/interfaces/users.interface';

import {MMKVStorage} from '@/common/utils/mmkv-storage';

import {ResponseError} from '@/common/interfaces';

import {
  AuthEntity,
  RefreshTokenEntity,
  ResetPasswordDto,
  ResetPasswordResponse,
  SignInDto,
  SignInResponse,
  SignOutResponse
} from '../interfaces/auth.interface';

type AuthInitialState = {
  isFetching: boolean;
  isWelcomeSeen: boolean;
  isAuthenticated: boolean;
  resetPasswordAt?: string;
  verifyEmailOtpAt?: string;
  auth?: AuthEntity;
} & ResponseError;

const initialState: AuthInitialState = {
  isFetching: false,
  isWelcomeSeen: false,
  isAuthenticated: false
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, _action: PayloadAction<SignInDto>) {
      state.isFetching = true;
    },
    loginSuccess(state, action: PayloadAction<SignInResponse>) {
      state.isFetching = false;
      state.isAuthenticated = true;
      state.auth = action.payload.data;

      MMKVStorage.setItem('@auth', JSON.stringify(state.auth));
    },
    loginFailure(state, action: PayloadAction<ResponseError>) {
      const {message, error, statusCode} = action.payload;

      const errMsgs = ['User cancelled the login process'];

      state.isFetching = false;
      state.isAuthenticated = false;
      state.message = message;
      state.error = errMsgs.includes(message as string) ? '' : error;
      state.statusCode = statusCode;
    },
    logoutRequest(state) {
      state.isFetching = true;
    },
    logoutSuccess(state, _action: PayloadAction<SignOutResponse>) {
      state.isFetching = false;
      state.isAuthenticated = false;

      MMKVStorage.removeItem('@auth');
    },
    logoutFailure(state, action: PayloadAction<ResponseError>) {
      const {message} = action.payload;

      state.isFetching = false;
      state.isAuthenticated = false;
      state.message = message;

      MMKVStorage.removeItem('@auth');
    },
    createAccountRequest(state, action: PayloadAction<CreateUserDto>) {
      state.isFetching = true;
      console.log(action.payload);
    },
    createAccountSuccess(state, _action: PayloadAction<CreateUserResponse>) {
      state.isFetching = false;
      state.isAuthenticated = false;
    },
    createAccountFailure(state, action: PayloadAction<ResponseError>) {
      const {message} = action.payload;

      state.isFetching = false;
      state.isAuthenticated = false;
      state.message = message;
    },
    resetPasswordRequest(state, action: PayloadAction<ResetPasswordDto>) {
      state.isFetching = true;
      console.log(action.payload);
    },
    resetPasswordSuccess(state, _action: PayloadAction<ResetPasswordResponse>) {
      state.isFetching = false;
      state.isAuthenticated = false;
      state.resetPasswordAt = new Date().toISOString();
    },
    resetPasswordFailure(state, action: PayloadAction<ResponseError>) {
      const {message} = action.payload;

      state.isFetching = false;
      state.isAuthenticated = false;
      state.message = message;
    },
    verifyEmailOtpRequest(state) {
      state.isFetching = true;
    },
    verifyEmailOtpSuccess(state, _action: PayloadAction<string>) {
      state.isFetching = false;
      state.isAuthenticated = false;
      state.verifyEmailOtpAt = new Date().toISOString();
    },
    verifyEmailOtpFailure(state, action: PayloadAction<ResponseError>) {
      const {message} = action.payload;

      state.isFetching = false;
      state.isAuthenticated = false;
      state.message = message;
    },
    updateUserData(state, action: PayloadAction<RefreshTokenEntity>) {
      if (action.payload && state.auth) {
        state.auth.user.accessToken = action.payload.accessToken;
        state.auth.user.refreshToken = action.payload.refreshToken;

        MMKVStorage.setItem('@auth', JSON.stringify(state.auth));
      }
    },
    setUserData(state, action: PayloadAction<AuthEntity | null>) {
      if (action.payload) {
        state.isAuthenticated = true;
        state.auth = action.payload;
      } else {
        state.isAuthenticated = false;
        state.auth = undefined;
      }
    }
  }
});

export default slice;
