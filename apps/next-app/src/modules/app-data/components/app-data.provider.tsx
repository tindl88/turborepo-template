import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import ProfileApi from '@/modules/profile/api/profile.api';

import { AppDataContext } from '../contexts/app-data.context';

interface IAppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider: React.FC<IAppDataProviderProps> = ({ children }) => {
  const session = useSession();
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await ProfileApi.me();

      return res.data.data;
    },
    enabled: session.status === 'authenticated',
    gcTime: 0
  });

  return <AppDataContext.Provider value={{ user }}>{children}</AppDataContext.Provider>;
};
