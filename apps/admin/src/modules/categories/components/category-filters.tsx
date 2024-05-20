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

import { CATEGORY_STATUSES } from '../constants/categories.constant';

import { useCategoriesState } from '../states/categories.state';

import CategoryFilterStatus from './category-filter-status';

const CategoryFilters: FC<ComponentBaseProps> = ({ className }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const categoriesState = useCategoriesState();
  const [isOpenSubMenu, setIsOpenSubMenu] = useState<string | null>(null);

  const currentStatuses = searchParams.getAll('status');

  return (
    <div className={classNames('categories-all-filters', className)}>
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
                  <CategoryFilterStatus
                    options={CATEGORY_STATUSES}
                    value={currentStatuses}
                    onChange={statuses => categoriesState.setFilter({ page: 1, status: statuses })}
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

export default CategoryFilters;
