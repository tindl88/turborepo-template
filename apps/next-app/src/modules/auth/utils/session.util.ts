import { AxiosResponse } from 'axios';

import { SignInResponse } from '../interfaces/auth.interface';

export function getRefreshTokenFromHeader(response: AxiosResponse<SignInResponse>) {
  const refreshTokenNode = response.headers['set-cookie']?.filter(x => x.includes('refreshToken='));
  const refreshToken = refreshTokenNode?.[0]?.split('=')[1]?.split(';')[0];

  return refreshToken;
}
