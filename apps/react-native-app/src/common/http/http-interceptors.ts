import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

import AuthApi from '@/modules/auth/api/auth.api';
import slice from '@/modules/auth/states/auth.slice';

import {store} from '@/common/redux/store';

import {MMKVStorage} from '../utils/mmkv-storage';

import {createAxiosInstance} from './http-client';

export const axiosClient = createAxiosInstance('http://localhost:3500');

const getSession = async () => {
  const sessionJson = MMKVStorage.getItem('@auth');
  const session = JSON.parse(sessionJson as string);
  const user = session?.user;

  return user;
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
    const originalConfig = error.config as InternalAxiosRequestConfig & {_retry: boolean};
    const shouldCallRefreshToken = error.response && error.response.status === 401 && !originalConfig._retry;

    if (shouldCallRefreshToken) {
      originalConfig._retry = true;

      try {
        const session = await getSession();
        const newTokens = await AuthApi.refreshToken(session.refreshToken);

        store.dispatch(slice.actions.updateUserData(newTokens.data.data));
        originalConfig.headers.Authorization = `Bearer ${newTokens.data.data.accessToken}`;

        console.log('Call refresh token API');

        return axiosClient(originalConfig);
      } catch (err) {
        console.log('Call refresh token API failed');

        store.dispatch(slice.actions.logoutRequest());
      }
    }

    return Promise.reject(error);
  }
};

axiosClient.interceptors.request.use(interceptors.onRequest, interceptors.onRequestError);
axiosClient.interceptors.response.use(interceptors.onResponse, interceptors.onResponseError);
