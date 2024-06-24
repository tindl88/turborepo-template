import { ResponseFormat } from '@/interfaces/api-response.interface';

import { AUTH_AUTHENTICATOR } from '../constants/auth.constant';

import { UserEntity } from '@/modules/users/interfaces/users.interface';

export type AuthEntity = {
  user: UserEntity;
  accessToken: string;
};
export type RefreshTokenEntity = {
  accessToken: string;
};
export type SignInDto = {
  email: string;
  password: string;
};

export type OAuthGoogleSignInDto = {
  authenticator: AUTH_AUTHENTICATOR;
};

export type OAuthFacebookSignInDto = {
  authenticator: AUTH_AUTHENTICATOR;
  limited: boolean;
  permissions: string[];
};

export type OAuthAppleSignInDto = {
  authenticator: AUTH_AUTHENTICATOR;
};

export type ForgotPasswordDto = {
  email: string;
};

export type ResetPasswordDto = {
  otpCode: string;
  password: string;
  confirmPassword: string;
};

export type SignInResponse = ResponseFormat<AuthEntity>;
export type SignOutResponse = ResponseFormat<{ status: string }>;
export type RefreshTokenResponse = ResponseFormat<RefreshTokenEntity>;
export type ForgotPasswordResponse = ResponseFormat<{ code: string }>;
