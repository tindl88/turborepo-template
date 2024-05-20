import React, { FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import { Separator } from '@ui/components/ui/separator';

import { Link } from '@/navigation';

type DocumentationSubMenuProps = {
  type: 'dropdown' | 'list';
};

const DocumentationSubMenu: FC<DocumentationSubMenuProps> = ({ type }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const className = type === 'list' ? 'px-10' : '';

  return (
    <div>
      <Link
        href={{
          pathname: '/documentation/getting-started',
          query: { sidebar: searchParams.get('sidebar') }
        }}
        className={classNames(
          'flex items-center rounded p-2 transition-colors',
          type === 'dropdown' && 'hover:bg-accent',
          type === 'dropdown' && pathname.includes('/documentation/getting-started') && '!bg-primary !text-white',
          type === 'list' && pathname.includes('/documentation/getting-started') && '!text-primary'
        )}
      >
        <p className={classNames('whitespace-nowrap', className)}>Getting Started</p>
      </Link>
      {type === 'dropdown' && <Separator className="bg-muted -mx-1 my-1 h-px w-auto" />}
      <Link
        href={{
          pathname: '/documentation/components',
          query: { sidebar: searchParams.get('sidebar') }
        }}
        className={classNames(
          'flex items-center rounded p-2 transition-colors',
          type === 'dropdown' && 'hover:bg-accent',
          type === 'dropdown' && pathname.includes('/documentation/components') && '!bg-primary !text-white',
          type === 'list' && pathname.includes('/documentation/components') && '!text-primary'
        )}
      >
        <p className={classNames('whitespace-nowrap', classNames)}>Components</p>
      </Link>
      {type === 'dropdown' && <Separator className="bg-muted -mx-1 my-1 h-px w-auto" />}
      <Link
        href={{
          pathname: '/documentation/changelog',
          query: { sidebar: searchParams.get('sidebar') }
        }}
        className={classNames(
          'flex items-center rounded p-2 transition-colors',
          type === 'dropdown' && 'hover:bg-accent',
          type === 'dropdown' && pathname.includes('/documentation/changelog') && '!bg-primary !text-white',
          type === 'list' && pathname.includes('/documentation/changelog') && '!text-primary'
        )}
      >
        <p className={classNames('whitespace-nowrap', classNames)}>Changelog</p>
      </Link>
    </div>
  );
};

export default DocumentationSubMenu;
