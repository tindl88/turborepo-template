import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { SignInDto } from '../interfaces/auth.interface';

type State = {
  isAuthenticated: boolean;
};

type Actions = {
  signIn: (signInDto: SignInDto) => void;
  signOut: () => void;
};

const initialState: State = {
  isAuthenticated: false
};

export const useAuthState = create<State & Actions>()(
  devtools(
    immer(
      persist(
        set => ({
          ...initialState,
          signIn: async signInDto => {
            console.log('signIn', signInDto);
            set(state => {
              state.isAuthenticated = true;
            });
          },
          signOut: () => {
            console.log('signOut');
            set(state => {
              state.isAuthenticated = false;
            });
          }
        }),
        { name: '@auth' }
      )
    ),
    { enabled: process.env.NODE_ENV === 'development' }
  )
);
