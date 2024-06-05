import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import AuthApi from '@/modules/auth/api/auth.api';
import slice from '@/modules/auth/states/auth.slice';
import { getRefreshTokenFromStore, getSession } from '@/modules/auth/utils/session.util';

import { store } from '@/stores/redux/store';

import { createAxiosInstance } from './http-client';

const axiosClient = createAxiosInstance();

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
    const originalConfig = error.config as InternalAxiosRequestConfig & { _retry: boolean };
    const shouldCallRefreshToken = error.response && error.response.status === 401 && !originalConfig._retry;

    if (shouldCallRefreshToken) {
      originalConfig._retry = true;

      try {
        const refreshToken = getRefreshTokenFromStore();

        if (refreshToken) {
          const newTokens = await AuthApi.refreshToken(refreshToken);

          store.dispatch(slice.actions.updateAccessToken(newTokens.data.data));

          originalConfig.headers.Authorization = `Bearer ${newTokens.data.data.accessToken}`;
        } else {
          store.dispatch(slice.actions.logoutRequest());
        }

        return axiosClient(originalConfig);
      } catch (err) {
        store.dispatch(slice.actions.logoutRequest());
      }
    }

    return Promise.reject(error);
  }
};

axiosClient.interceptors.request.use(interceptors.onRequest, interceptors.onRequestError);
axiosClient.interceptors.response.use(interceptors.onResponse, interceptors.onResponseError);

export default axiosClient;
