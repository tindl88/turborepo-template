import { AxiosResponse } from 'axios';

export function getRefreshTokenFromHeader<T>(response: AxiosResponse<T>): string {
  const setCookieHeader = response.headers['set-cookie'];

  if (!setCookieHeader) return '';

  const refreshTokenCookie = setCookieHeader.find(cookie => cookie.includes('refreshToken='));

  if (!refreshTokenCookie) return '';

  const refreshToken = refreshTokenCookie.split('refreshToken=')[1]?.split(';')[0];

  return refreshToken;
}
