import i18next from 'i18next';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { LanguageEntity } from '../interfaces/language.interface';

import { languageItems } from '../constants/language.constant';

import { MMKVStorage } from '@/utils/mmkv-storage.util';

type States = {
  language: LanguageEntity;
};

type Actions = {
  setLanguage: (language: LanguageEntity) => void;
  reset: () => void;
};

const initialState: States = {
  language: languageItems[0]
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

              i18next.changeLanguage(language.key);
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
