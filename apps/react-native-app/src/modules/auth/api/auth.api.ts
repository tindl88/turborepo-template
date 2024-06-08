import { RefreshTokenResponse, SignInDto, SignInResponse, SignOutResponse } from '../interfaces/auth.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';
import { SIGN_IN_AUTHENTICATOR } from '../constants/auth.constant';

import { CreateUserDto, UserEntity } from '@/modules/users/interfaces/users.interface';

import HttpRequest from '@/http/http-request';

export const signUp = (userDto: CreateUserDto) => {
  return HttpRequest.post<UserEntity>(API_ENDPOINTS.SIGN_UP, userDto);
};

export const signIn = (signInDto: SignInDto) => {
  return HttpRequest.post<SignInResponse>(API_ENDPOINTS.SIGN_IN, {
    email: signInDto.credentials?.email,
    password: signInDto.credentials?.password
  });
};

export const signOut = () => {
  return HttpRequest.post<SignOutResponse>(API_ENDPOINTS.SIGN_OUT);
};

export const googleSignIn = (authenticator: SIGN_IN_AUTHENTICATOR, token: string) => {
  return HttpRequest.post<SignInResponse>(API_ENDPOINTS.SIGN_IN_GOOGLE, { authenticator, token });
};

export const facebookSignIn = (authenticator: SIGN_IN_AUTHENTICATOR, token: string, limited: boolean) => {
  return HttpRequest.post<SignInResponse>(API_ENDPOINTS.SIGN_IN_FACEBOOK, {
    authenticator,
    token,
    isFacebookLimited: limited
  });
};

export const appleSignIn = (authenticator: SIGN_IN_AUTHENTICATOR, token: string) => {
  return HttpRequest.post<SignInResponse>(API_ENDPOINTS.SIGN_IN_APPLE, { authenticator, token });
};

export const refreshToken = (token: string) => {
  return HttpRequest.post<RefreshTokenResponse>(API_ENDPOINTS.REFRESH_TOKEN, { token });
};

const AuthApi = { signUp, signIn, signOut, googleSignIn, facebookSignIn, appleSignIn, refreshToken };

export default AuthApi;
