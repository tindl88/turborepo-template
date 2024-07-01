import { createContext } from 'react';

import { AppDataContextType } from '../interfaces/app-data.interface';

export const AppDataContext = createContext<AppDataContextType | undefined>(undefined);
