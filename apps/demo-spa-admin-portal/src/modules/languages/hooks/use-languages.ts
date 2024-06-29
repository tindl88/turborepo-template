import { useContext } from 'react';
import { LanguageContext } from '../contexts/languages.context';
import { LanguageContextType } from '../interfaces/languages.interface';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
