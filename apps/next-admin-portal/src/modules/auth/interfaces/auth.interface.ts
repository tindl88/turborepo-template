import { type SignInOptions } from 'next-auth/react';

import { ResponseFormat } from '@/interfaces/api-response.interface';

import { PreferenceEntity } from '@/modules/settings/interfaces/settings.interface';

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
  refreshToken: string;
};

export type RefreshTokenEntity = {
  accessToken: string;
};

export type SignDto = { email: string; password: string } & SignInOptions;

export type SignInResponse = ResponseFormat<AuthEntity>;
export type RefreshTokenResponse = ResponseFormat<RefreshTokenEntity>;
