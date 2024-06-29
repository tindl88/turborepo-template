import { createContext } from 'react';
import { ThemeContextType } from '../interfaces/themes.interface';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
