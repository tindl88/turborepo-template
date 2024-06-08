import { ResponseFormat } from '@/interfaces';

import { SIGN_IN_AUTHENTICATOR, SIGN_IN_PROVIDER } from '../constants/auth.constant';

export type AuthEntity = {
  user: {
    id: string;
    name: string;
    fullName: string;
    email: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
  };
};
export type RefreshTokenEntity = {
  accessToken: string;
};
export type SignInDto = {
  provider: SIGN_IN_PROVIDER;
  authenticator: SIGN_IN_AUTHENTICATOR;
  credentials?: SignInCredential;
  facebook?: {
    limited: boolean;
    permissions: string[];
  };
};

export type SignInCredential = {
  email: string;
  password: string;
};

export type ResetPasswordDto = { email: string };
export type SignInResponse = ResponseFormat<AuthEntity>;
export type SignOutResponse = ResponseFormat<{ status: string }>;
export type RefreshTokenResponse = ResponseFormat<RefreshTokenEntity>;
export type ResetPasswordResponse = ResponseFormat<{ code: string }>;
export type NativeFirebaseError = {
  code: string;
  message: string;
  namespace: string;
  nativeErrorCode: string | number;
  nativeErrorMessage: string;
  stack: undefined | string;
};
