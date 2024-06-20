import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  ready: boolean;
};

type Actions = {
  setReady: (value: boolean) => void;
};

const initialState: State = {
  ready: false
};

export const useAppState = create<State & Actions>()(
  devtools(
    immer(set => ({
      ...initialState,
      setReady: value => {
        set(state => {
          state.ready = value;
        });
      }
    })),
    { enabled: process.env.NODE_ENV === 'development' }
  )
);
