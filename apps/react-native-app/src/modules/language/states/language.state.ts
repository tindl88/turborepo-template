import i18next from 'i18next';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { LanguageType } from '../interfaces/language.interface';

import { MMKVStorage } from '@/utils/mmkv-storage.util';

type States = {
  language: LanguageType;
};

type Actions = {
  setLanguage: (language: LanguageType) => void;
  reset: () => void;
};

const initialState: States = {
  language: 'en'
};

export const useLanguageState = create<States & Actions>()(
  devtools(
    immer(
      persist(
        set => ({
          ...initialState,
          setLanguage: language => {
            set(state => {
              state.language = language;

              i18next.changeLanguage(language);
            });
          },
          reset: () => set(initialState)
        }),
        {
          name: 'language-storage',
          storage: createJSONStorage(() => MMKVStorage)
        }
      )
    )
  )
);
