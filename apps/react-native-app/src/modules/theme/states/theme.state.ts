import { Appearance, ColorSchemeName } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Theme, ThemeEntity } from '../interfaces/theme.interface';

import { themeConfig, themeItems } from '../constants/theme.constant';

import { MMKVStorage } from '@/utils/mmkv-storage.util';

type States = {
  theme: ThemeEntity;
  configs: Theme;
};

type Actions = {
  setTheme: (theme: ThemeEntity) => void;
  reset: () => void;
};

const initialState: States = {
  theme: themeItems[0],
  configs: themeConfig[themeItems[0].key as keyof typeof themeConfig]
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
              state.configs = themeConfig[theme.key as keyof typeof themeConfig];
            });

            Appearance.setColorScheme(theme.key as ColorSchemeName);
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
