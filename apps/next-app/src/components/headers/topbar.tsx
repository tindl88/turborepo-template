'user client';

import { FC } from 'react';
import { Session } from 'next-auth';
import { Button } from '~react-web-ui-shadcn/components/ui/button';

import Authenticated from '@/modules/auth/components/authenticated';
import Unauthenticated from '@/modules/auth/components/unauthenticated';

import Logo from '../icons/logo';
import Languages from '../languages/languages';
import Menu from '../menus/menu';

interface ITopBarProps {
  userSession: Session | null;
}

const TopBar: FC<ITopBarProps> = ({ userSession }) => {
  return (
    <div className="topbar" data-testid="topbar">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between">
          <Logo />
          <Menu />
          <Languages />
          <div className="authentication ml-6 flex items-center">
            <Authenticated userSession={userSession} />
            <Unauthenticated visible={!userSession} />
          </div>
          <Button>Get Go Fast</Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
