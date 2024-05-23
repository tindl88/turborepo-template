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
    accessToken: string;
    refreshToken: string;
  };
};

export type RefreshTokenEntity = {
  accessToken: string;
};

export type LoginDto = { email: string; password: string } & SignInOptions;

export type LoginResponse = ResponseFormat<AuthEntity>;
export type RefreshTokenResponse = ResponseFormat<RefreshTokenEntity>;
