'user client';

import { FC } from 'react';
import { Session } from 'next-auth';

import Authenticated from '@/modules/auth/components/authenticated';
import Unauthenticated from '@/modules/auth/components/unauthenticated';

import Languages from './languages';
import Menu from './menu';

interface ITopBarProps {
  userSession: Session | null;
}

const TopBar: FC<ITopBarProps> = ({ userSession }) => {
  return (
    <div className="topbar bg-primary-700 text-white" data-testid="topbar">
      <div className="flex flex-wrap items-center justify-between">
        <Menu />
        <Languages />
        <div className="authentication ml-6 flex items-center">
          <Authenticated userSession={userSession} />
          <Unauthenticated visible={!userSession} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
