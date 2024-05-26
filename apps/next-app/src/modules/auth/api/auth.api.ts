import { LoginDto, LoginResponse, RefreshTokenResponse, SignUpResponse } from '../interfaces/auth.interface';

import { API_ENDPOINTS } from '@/constants/api-endpoint.constant';

import HttpRequest from '@/http/http-request';

export const signUp = (userDto: { email: string; password: string }) => {
  //CreateUserDto
  return HttpRequest.post<SignUpResponse>(API_ENDPOINTS.SIGN_UP, userDto); //UserEntity
};

export const signIn = (credential: LoginDto) => {
  return HttpRequest.post<LoginResponse>(API_ENDPOINTS.SIGN_IN, credential);
};

export const googleSignIn = (token: string) => {
  return HttpRequest.post<LoginResponse>(API_ENDPOINTS.SIGN_IN_GOOGLE, {
    token
  });
};

export const facebookSignIn = (token: string) => {
  return HttpRequest.post<LoginResponse>(API_ENDPOINTS.SIGN_IN_FACEBOOK, {
    token
  });
};

export const refreshToken = (token: string) => {
  return HttpRequest.post<RefreshTokenResponse>(API_ENDPOINTS.REFRESH_TOKEN, {
    token
  });
};

const AuthApi = { signUp, signIn, googleSignIn, facebookSignIn, refreshToken };

export default AuthApi;