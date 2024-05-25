import {Appearance, ColorSchemeName} from 'react-native';
import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

import {Colors} from '@/components/core-ui/themes';

import {MMKVStorage} from '@/common/utils/mmkv-storage';

interface IThemeState {
  colorScheme?: ColorSchemeName;
  configs?: {
    border?: string;
    input?: string;
    ring?: string;
    background?: string;
    foreground?: string;
    destructive?: string;
    muted?: string;
    accent?: string;
    popover?: string;
    card?: string;
  };
  setColorScheme: (colorScheme?: ColorSchemeName) => void;
}

const colorScheme = Appearance.getColorScheme();

export const useThemeState = create<IThemeState>()(
  devtools(
    immer(
      persist(
        set => ({
          colorScheme: colorScheme,
          setColorScheme: color => {
            set(state => {
              Appearance.setColorScheme(color);

              const isDark = color === 'dark';
              const themeConfigs = {
                background: isDark ? Colors.gray[800] : Colors.gray[50],
                foreground: isDark ? Colors.white : Colors.black,
                card: isDark ? Colors.slate[800] : Colors.slate[100],
                border: isDark ? Colors.slate[700] : Colors.slate[300]
              };

              state.colorScheme = color;
              state.configs = themeConfigs;
            });
          }
        }),
        {
          name: 'theme-storage',
          storage: createJSONStorage(() => MMKVStorage)
        }
      )
    )
  )
);
