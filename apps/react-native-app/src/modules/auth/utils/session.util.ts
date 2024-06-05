import { AxiosResponse } from 'axios';

import { MMKVStorage } from '@/utils/mmkv-storage.util';

export const getSession = async () => {
  const sessionJson = MMKVStorage.getItem('@auth');
  const session = JSON.parse(sessionJson as string);
  const user = session?.user;

  return user;
};

export const getRefreshTokenFromStore = () => {
  const token = MMKVStorage.getItem('@rftoken');

  return token;
};

export function getRefreshTokenFromHeader<T>(response: AxiosResponse<T>): string {
  const setCookieHeader = response.headers['set-cookie'];

  if (!setCookieHeader) {
    return '';
  }

  const refreshTokenCookie = setCookieHeader.find(cookie => cookie.includes('refreshToken='));

  if (!refreshTokenCookie) {
    return '';
  }

  const refreshToken = refreshTokenCookie.split('refreshToken=')[1]?.split(';')[0];

  return refreshToken;
}
