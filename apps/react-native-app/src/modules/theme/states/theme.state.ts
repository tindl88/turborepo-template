import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { ColorScheme, Theme } from '../interfaces/theme.interface';

import { themeConfig } from '../constants/theme.constant';

import { MMKVStorage } from '@/utils/mmkv-storage.util';

type States = {
  theme: ColorScheme;
  configs: Theme;
};

type Actions = {
  setTheme: (theme: ColorScheme) => void;
  reset: () => void;
};

const initialState: States = {
  theme: 'dark',
  configs: themeConfig.dark
};

export const useThemeState = create<States & Actions>()(
  devtools(
    immer(
      persist(
        set => ({
          ...initialState,
          setTheme: theme => {
            set(state => {
              state.theme = theme;
              state.configs = themeConfig[theme];
            });
          },
          reset: () => set(initialState)
        }),
        {
          name: 'theme-storage',
          storage: createJSONStorage(() => MMKVStorage)
        }
      )
    )
  )
);
