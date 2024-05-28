import React, { createContext, ReactNode, useContext } from 'react';

import { LanguageType } from '../interfaces/language.interface';

import { useLanguageState } from '@/modules/language/states/language.state';

interface ILanguageContextProps {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

const LanguageContext = createContext<ILanguageContextProps | undefined>(undefined);

export const useLanguage = (): ILanguageContextProps => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const languageState = useLanguageState();

  const setLanguage = (language: LanguageType) => languageState.setLanguage(language);

  return (
    <LanguageContext.Provider value={{ language: languageState.language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
