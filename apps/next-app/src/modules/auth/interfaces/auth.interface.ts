import { SignInOptions } from 'next-auth/react';

import { ResponseFormat } from '@/interfaces/api-response.interface';

export type PreferenceEntity = {
  language: string;
  theme: string;
  themeColor: string;
};

export type AuthEntity = {
  user: {
    id: string;
    name: string;
    fullName: string;
    email: string;
    avatar: string;
    preference: PreferenceEntity;
  };
  accessToken: string;
};

export type RefreshTokenEntity = {
  accessToken: string;
};

export type SignDto = { email: string; password: string } & SignInOptions;

export type SignInResponse = ResponseFormat<AuthEntity>;
export type SignUpResponse = ResponseFormat<{ email: string }>;
export type RefreshTokenResponse = ResponseFormat<RefreshTokenEntity>;
