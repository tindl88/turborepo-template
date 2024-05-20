import { signIn, SignInOptions, signOut, SignOutParams } from 'next-auth/react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { LoginDto } from '../interfaces/auth.interface';

import { AUTH_PROVIDER } from '../constants/auth.constant';

import AuthApi from '@/modules/auth/api/auth.api';
import { CreateUserDto } from '@/modules/users/interfaces/users.interface';

import { getErrorMessage } from '@/utils';

type State = {
  isLoggedIn?: boolean;
  isCreating?: boolean;
  message?: string | string[];
  error?: string;
};

type Actions = {
  signIn: (credentials: LoginDto) => void;
  googleSignIn: (options: SignInOptions) => void;
  facebookSignIn: (options: SignInOptions) => void;
  signUp: (userDto: CreateUserDto) => void;
  signOut: (options: SignOutParams) => void;
};

export const useAuthState = create<State & Actions>()(
  devtools(
    immer(set => ({
      isLoggedIn: false,
      isCreating: false,
      message: [''],
      signIn: async credentials => {
        await signIn(AUTH_PROVIDER.CREDENTIALS, credentials);
      },
      googleSignIn: async options => {
        await signIn(AUTH_PROVIDER.GOOGLE, options);
      },
      facebookSignIn: async options => {
        await signIn(AUTH_PROVIDER.FACEBOOK, options);
      },
      signUp: async userDto => {
        set({ isCreating: true }, false, 'auth/signUpRequest');
        try {
          await AuthApi.signUp({ ...userDto });
          set({ isCreating: false, error: undefined }, false, 'auth/signUpSuccess');
        } catch (error: unknown) {
          set(
            {
              isCreating: false,
              message: getErrorMessage(error),
              error: 'SIGN_UP'
            },
            false,
            'auth/signUpFailure'
          );
        }
      },
      signOut: options => {
        signOut(options);
      }
    })),
    { enabled: process.env.NODE_ENV === 'development' }
  )
);
