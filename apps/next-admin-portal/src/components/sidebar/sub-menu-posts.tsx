import React, { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

import { Link, usePathname } from '@/navigation';

type PostsSubMenuProps = {
  type: 'dropdown' | 'list';
};

const PostsSubMenu: FC<PostsSubMenuProps> = ({ type }) => {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const pathname = usePathname();

  const className = type === 'list' ? 'px-10' : '';

  return (
    <div>
      <Link
        href={{
          pathname: '/posts/new',
          query: { sidebar: searchParams.get('sidebar') }
        }}
        className={classNames(
          'flex items-center rounded p-2 transition-colors',
          type === 'dropdown' && 'hover:bg-accent',
          type === 'dropdown' && pathname === '/posts/new' && '!bg-primary !text-white',
          type === 'list' && pathname === '/posts/new' && '!text-primary'
        )}
      >
        <p className={classNames('whitespace-nowrap', className)}>{t('sidebar_menu_posts_create_new')}</p>
      </Link>
      {/* {type === 'dropdown' && <Separator className="-mx-1 my-1 h-px bg-muted w-auto" />} */}
    </div>
  );
};

export default PostsSubMenu;
