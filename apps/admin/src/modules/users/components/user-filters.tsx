import React, { FC, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { ListFilterIcon } from 'lucide-react';
import { Button } from '@ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@ui/components/ui/dropdown-menu';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { USER_STATUSES } from '../constants/users.constant';

import { useUsersState } from '../states/users.state';

import UserFilterStatus from './user-filter-status';

const UserFilters: FC<ComponentBaseProps> = ({ className }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const usersState = useUsersState();
  const [isOpenSubMenu, setIsOpenSubMenu] = useState<string | null>(null);

  const currentStatuses = searchParams.getAll('status');

  return (
    <div className={classNames('users-all-filters', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="px-2.5">
            <ListFilterIcon size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right" align="start">
          <DropdownMenuLabel>{t('filters')}</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuSub
              open={isOpenSubMenu === 'status'}
              onOpenChange={open => (open ? setIsOpenSubMenu('status') : setIsOpenSubMenu(null))}
            >
              <DropdownMenuSubTrigger>{t('filter_status')}</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="p-0">
                  <UserFilterStatus
                    options={USER_STATUSES}
                    value={currentStatuses}
                    onChange={statuses => usersState.setFilter({ page: 1, status: statuses })}
                    onClose={() => setIsOpenSubMenu(null)}
                  />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserFilters;
