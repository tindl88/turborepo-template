import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { MMKVStorage } from '@/utils/mmkv-storage.util';

interface ILanguageState {
  language?: string;
  setLanguage: (language?: string) => void;
}

export const useLanguageState = create<ILanguageState>()(
  devtools(
    immer(
      persist(
        set => ({
          language: 'en',
          setLanguage: language => {
            set(state => {
              state.language = language;
            });
          }
        }),
        {
          name: 'language-storage',
          storage: createJSONStorage(() => MMKVStorage)
        }
      )
    )
  )
);
