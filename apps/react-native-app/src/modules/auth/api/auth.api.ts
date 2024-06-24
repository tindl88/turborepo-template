import { RefreshTokenResponse, SignInDto, SignInResponse, SignOutResponse } from '../interfaces/auth.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';
import { AUTH_AUTHENTICATOR } from '../constants/auth.constant';

import { CreateUserDto, UserEntity } from '@/modules/users/interfaces/users.interface';

import axiosClient from '@/http/http-request';

export const signUp = (userDto: CreateUserDto) => {
  return axiosClient.post<UserEntity>(API_ENDPOINTS.SIGN_UP, userDto);
};

export const passwordSignIn = (signInDto: SignInDto) => {
  return axiosClient.post<SignInResponse>(API_ENDPOINTS.SIGN_IN, {
    email: signInDto.email,
    password: signInDto.password
  });
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

export const appleSignIn = (authenticator: AUTH_AUTHENTICATOR, token: string) => {
  return axiosClient.post<SignInResponse>(API_ENDPOINTS.SIGN_IN_APPLE, { authenticator, token });
};

export const signOut = () => {
  return axiosClient.post<SignOutResponse>(API_ENDPOINTS.SIGN_OUT);
};

export const refreshToken = (token: string) => {
  return axiosClient.post<RefreshTokenResponse>(API_ENDPOINTS.REFRESH_TOKEN, { token });
};

const AuthApi = { signUp, signOut, passwordSignIn, googleSignIn, facebookSignIn, appleSignIn, refreshToken };

export default AuthApi;
