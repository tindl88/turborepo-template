import React, { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

import { Link, usePathname } from '@/navigation';

type UsersSubMenuProps = {
  type: 'dropdown' | 'list';
};

const UsersSubMenu: FC<UsersSubMenuProps> = ({ type }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const className = type === 'list' ? 'px-10' : '';

  return (
    <div>
      <Link
        href={{
          pathname: '/users/new',
          query: { sidebar: searchParams.get('sidebar') }
        }}
        className={classNames(
          'flex items-center rounded p-2 transition-colors',
          type === 'dropdown' && 'hover:bg-accent',
          type === 'dropdown' && pathname === '/users/new' && '!bg-primary !text-white',
          type === 'list' && pathname === '/users/new' && '!text-primary'
        )}
      >
        <p className={classNames('whitespace-nowrap', className)}>{t('sidebar_menu_users_create_new')}</p>
      </Link>
      {/* {type === 'dropdown' && <Separator className="-mx-1 my-1 h-px bg-muted w-auto" />} */}
    </div>
  );
};

export default UsersSubMenu;
