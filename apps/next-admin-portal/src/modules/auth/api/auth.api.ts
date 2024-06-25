import { RefreshTokenResponse, SignInDto, SignInResponse } from '../interfaces/auth.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';
import { AUTH_AUTHENTICATOR } from '../constants/auth.constant';

import { UserEntity, UserFormData } from '@/modules/users/interfaces/users.interface';

import axiosClient from '@/http/http-request';

export const signUp = (userDto: UserFormData) => {
  return axiosClient.post<UserEntity>(API_ENDPOINTS.SIGN_UP, userDto);
};

export const signIn = (signInDto: SignInDto) => {
  return axiosClient.post<SignInResponse>(API_ENDPOINTS.SIGN_IN, signInDto);
};

export const googleSignIn = (authenticator: AUTH_AUTHENTICATOR, token: string) => {
  return axiosClient.post<SignInResponse>(API_ENDPOINTS.SIGN_IN_GOOGLE, { authenticator, token });
};

export const facebookSignIn = (authenticator: AUTH_AUTHENTICATOR, token: string, limited: boolean) => {
  return axiosClient.post<SignInResponse>(API_ENDPOINTS.SIGN_IN_FACEBOOK, {
    authenticator,
    token,
    isFacebookLimited: limited
  });
};

export const refreshToken = (token: string) => {
  return axiosClient.post<RefreshTokenResponse>(API_ENDPOINTS.REFRESH_TOKEN, {
    token
  });
};

const AuthApi = { signUp, signIn, googleSignIn, facebookSignIn, refreshToken };

export default AuthApi;
