import { createContext } from 'react';
import { LanguageContextType } from '../interfaces/languages.interface';

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
