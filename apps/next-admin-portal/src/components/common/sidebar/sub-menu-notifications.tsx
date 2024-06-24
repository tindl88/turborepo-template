import React, { FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

import { Link } from '@/navigation';

type NotificationsSubMenuProps = {
  type: 'dropdown' | 'list';
};

const NotificationsSubMenu: FC<NotificationsSubMenuProps> = ({ type }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const className = type === 'list' ? 'px-10' : '';

  return (
    <div>
      <Link
        href={{
          pathname: '/notifications/[type]',
          params: { type: 'push' },
          query: { sidebar: searchParams.get('sidebar') }
        }}
        className={classNames(
          'flex items-center rounded p-2 transition-colors',
          type === 'dropdown' && 'hover:bg-accent',
          type === 'dropdown' && pathname.includes('/notifications/push') && '!bg-primary !text-white',
          type === 'list' && pathname.includes('/notifications/push') && '!text-primary'
        )}
      >
        <p className={classNames('whitespace-nowrap', className)}>{t('sidebar_menu_notifications_push')}</p>
      </Link>
      {/* {type === 'dropdown' && <Separator className="-mx-1 my-1 h-px w-auto bg-muted" />}
      <Link
        href={{
          pathname: '/notifications/[type]',
          params: { type: 'new' },
          query: { sidebar: searchParams.get('sidebar') }
        }}
        className={classNames(
          'flex items-center rounded p-2 transition-colors',
          type === 'dropdown' && 'hover:bg-accent',
          type === 'dropdown' && pathname.includes('/notifications/new') && '!bg-primary !text-white',
          type === 'list' && pathname.includes('/notifications/new') && '!text-primary'
        )}
      >
        <p className={classNames('whitespace-nowrap', className)}>{t('sidebar_menu_notifications_create_new')}</p>
      </Link> */}
    </div>
  );
};

export default NotificationsSubMenu;
