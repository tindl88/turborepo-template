import {ResponseFormat} from '@/common/interfaces';

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
  refreshToken: string;
};

export type SignInDto = {
  provider?: string;
  credentials?: {
    email: string;
    password: string;
  };
  facebook?: {
    permissions: string[];
  };
};

export type SignOutDto = {
  token: string;
};

export type ResetPasswordDto = {
  email: string;
};

export type SignInResponse = ResponseFormat<AuthEntity>;
export type SignOutResponse = ResponseFormat<{
  status: string;
}>;
export type RefreshTokenResponse = ResponseFormat<RefreshTokenEntity>;
export type ResetPasswordResponse = ResponseFormat<{
  code: string;
}>;
export type NativeFirebaseError = {
  code: string;
  message: string;
  namespace: string;
  nativeErrorCode: string | number;
  nativeErrorMessage: string;
  stack: undefined | string;
};
