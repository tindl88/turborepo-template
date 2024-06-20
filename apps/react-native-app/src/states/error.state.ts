import { ReactNode } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IErrorState {
  visible: boolean;
  icon: ReactNode;
  title: string;
  message?: string;
  show: (params: { icon?: ReactNode; title: string; message?: string }) => void;
  hide: () => void;
}

export const useErrorState = create<IErrorState>()(
  devtools(
    immer(set => ({
      visible: false,
      icon: '',
      title: '',
      message: '',
      show: params => {
        set(
          state => {
            state.visible = true;
            state.icon = params.icon || null;
            state.title = params.title || '';
            state.message = params.message || '';
          },
          false,
          'error/show'
        );
      },
      hide: () => {
        set(
          state => {
            state.visible = false;
            state.title = '';
            state.message = '';
          },
          false,
          'error/hide'
        );
      }
    }))
  )
);
