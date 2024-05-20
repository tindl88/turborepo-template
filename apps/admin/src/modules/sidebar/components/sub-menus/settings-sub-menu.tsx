import React, { FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

import { Link } from '@/navigation';

type SettingsSubMenuProps = {
  type: 'dropdown' | 'list';
};

const SettingsSubMenu: FC<SettingsSubMenuProps> = ({ type }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const className = type === 'list' ? 'px-10' : '';

  return (
    <div>
      <Link
        href={{
          pathname: '/settings/[type]',
          params: { type: 'appearance' },
          query: { sidebar: searchParams.get('sidebar') }
        }}
        className={classNames(
          'flex items-center rounded p-2 transition-colors',
          type === 'dropdown' && 'hover:bg-accent',
          type === 'dropdown' && pathname.includes('/settings/appearance') && '!bg-primary !text-white',
          type === 'list' && pathname.includes('/settings/appearance') && '!text-primary'
        )}
      >
        <p className={classNames('whitespace-nowrap', className)}>{t('sidebar_menu_settings_appearance')}</p>
      </Link>
      {/* {type === 'dropdown' && <Separator className="-mx-1 my-1 h-px bg-muted w-auto" />} */}
    </div>
  );
};

export default SettingsSubMenu;
