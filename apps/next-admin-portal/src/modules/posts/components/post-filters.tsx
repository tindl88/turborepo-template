import React, { FC, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { ListFilterIcon } from 'lucide-react';
import { Button } from '~ui/components/ui/button';
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
} from '~ui/components/ui/dropdown-menu';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { POST_STATUSES } from '../constants/posts.constant';

import { usePostsState } from '../states/posts.state';

import PostFilterStatus from './post-filter-status';

const PostFilters: FC<ComponentBaseProps> = ({ className }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const postsState = usePostsState();
  const [isOpenSubMenu, setIsOpenSubMenu] = useState<string | null>(null);

  const currentStatuses = searchParams.getAll('status');

  return (
    <div className={classNames('posts-all-filters', className)}>
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
                  <PostFilterStatus
                    options={POST_STATUSES}
                    value={currentStatuses}
                    onChange={statuses => postsState.setFilter({ page: 1, status: statuses })}
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

export default PostFilters;
