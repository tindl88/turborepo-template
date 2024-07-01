import { useContext } from 'react';

import { AppDataContextType } from '../interfaces/app-data.interface';

import { AppDataContext } from '../contexts/app-data.context';

export const useAppData = (): AppDataContextType => {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error('useAppData must be used within a AppDataProvider');
  }

  return context;
};
