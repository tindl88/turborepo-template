import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ResponseError } from '@/interfaces/api-response.interface';

import { UserEntity } from '@/modules/users/interfaces/users.interface';

import { MMKVStorage } from '@/utils/mmkv-storage.util';

type State = {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
  auth?: UserEntity;
} & ResponseError;

type Actions = {
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setAuthData: (data: UserEntity) => void;
  reset: () => void;
};

const initialState: State = {
  isAuthenticated: false,
  accessToken: '',
  refreshToken: ''
};

export const useAuthState = create<State & Actions>()(
  devtools(
    immer(
      persist(
        set => ({
          ...initialState,
          setAccessToken: token => {
            set(state => {
              state.isAuthenticated = true;
              state.accessToken = token;
            });
          },
          setRefreshToken: token => {
            set(state => {
              state.refreshToken = token;
            });
          },
          setAuthData: data => {
            set(state => {
              state.auth = data;
            });
          },
          reset: () => {
            set(state => {
              state.isAuthenticated = false;
              state.accessToken = '';
              state.refreshToken = '';
              state.auth = initialState.auth;
            });
          }
        }),
        { name: '@auth', storage: createJSONStorage(() => MMKVStorage) }
      )
    ),
    { enabled: process.env.NODE_ENV === 'development' }
  )
);
