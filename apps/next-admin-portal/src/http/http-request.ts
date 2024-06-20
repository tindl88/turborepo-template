import { getCsrfToken, getSession, signOut } from 'next-auth/react';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { merge } from 'lodash-es';

import AuthApi from '@/modules/auth/api/auth.api';

import { createAxiosInstance } from './http-client';

const axiosClient = createAxiosInstance();

const updateSession = async (newSession: Record<string, string>) => {
  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/session`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      csrfToken: await getCsrfToken(),
      data: newSession
    })
  });
};

const interceptors = {
  onRequest: async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const headers = config.headers;
    const session = await getSession();

    if (session) headers.Authorization = `Bearer ${session.accessToken}`;

    return config;
  },
  onRequestError: (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
  onResponse: (response: AxiosResponse): AxiosResponse => response,
  onResponseError: async (error: AxiosError): Promise<AxiosError> => {
    const originalConfig = error.config as InternalAxiosRequestConfig & {
      _retry: boolean;
    };
    const shouldCallRefreshToken = error.response && error.response.status === 401 && !originalConfig._retry;

    if (shouldCallRefreshToken) {
      originalConfig._retry = true;

      try {
        const session = await getSession();
        const refreshTokenResponse = await AuthApi.refreshToken(session?.refreshToken as string);
        const newSession = merge({}, session, {
          user: merge({}, session?.user, refreshTokenResponse.data.data)
        });

        await updateSession(newSession as never);
        originalConfig.headers.Authorization = `Bearer ${refreshTokenResponse.data.data.accessToken}`;

        return axiosClient(originalConfig);
      } catch (err) {
        signOut({ redirect: true, callbackUrl: '/' });
      }
    }

    return Promise.reject(error);
  }
};

axiosClient.interceptors.request.use(interceptors.onRequest, interceptors.onRequestError);
axiosClient.interceptors.response.use(interceptors.onResponse, interceptors.onResponseError);

export default axiosClient;
