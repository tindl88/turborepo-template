import React, { FC } from 'react';
import classNames from 'classnames';
import { MenuIcon } from 'lucide-react';
import { Button } from '~react-web-ui-shadcn/components/ui/button';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { UserEntity } from '@/modules/users/interfaces/users.interface';

import HeaderProfile from './header-profile';
import HeaderTitle from './header-title';

type HeaderProps = {
  user?: UserEntity;
  onSidebarCollapseClick?: () => void;
} & ComponentBaseProps;

const Header: FC<HeaderProps> = ({ className, user, onSidebarCollapseClick }) => {
  return (
    <div
      className={classNames(
        'nap-header sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-card pl-2 pr-4',
        className
      )}
    >
      <div className="flex items-center gap-x-2">
        <Button variant={'ghost'} className="px-1.5" onClick={onSidebarCollapseClick}>
          <MenuIcon />
        </Button>
        <HeaderTitle />
      </div>
      <HeaderProfile user={user} />
    </div>
  );
};

export default Header;
