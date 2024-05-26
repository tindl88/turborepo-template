import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { MMKVStorage } from '@/utils/mmkv-storage.util';

type State = {
  visible: boolean;
};

type Actions = {
  setVisible: (value: boolean) => void;
};

export const useWelcomeState = create<State & Actions>()(
  devtools(
    immer(
      persist(
        set => ({
          visible: true,
          setVisible: value => {
            set(
              state => {
                state.visible = value;
              },
              false,
              'welcome/setVisible'
            );
          }
        }),
        {
          name: 'welcome',
          storage: createJSONStorage(() => MMKVStorage)
        }
      )
    )
  )
);
