import React, { ReactNode } from 'react';
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation';
import classNames from 'classnames';
import { LucideIcon } from 'lucide-react';

import { Link } from '@/navigation';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type SidebarMenuItemProps = {
  url: string;
  isExpand: boolean;
  options: {
    icon: LucideIcon;
  };
  children?: ReactNode;
} & ComponentBaseProps;

export function SidebarMenuItem({ className, isExpand, children, url, options }: SidebarMenuItemProps) {
  const searchParams = useSearchParams();
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';

  return (
    <Link
      className={classNames(
        'flex w-full cursor-pointer items-center gap-x-2 rounded-md px-3.5 py-2.5 transition-background hover:bg-accent',
        url.includes(pathname) && '!bg-primary text-white',
        className
      )}
      href={{
        pathname: url,
        query: { sidebar: searchParams.get('sidebar') }
      }}
    >
      <div className="ml-0.5 h-6 w-6">
        <options.icon strokeWidth={1.5} />
      </div>
      <p
        className={classNames(
          'whitespace-nowrap transition-opacity duration-200',
          isExpand ? 'opacity-1' : 'hidden opacity-0'
        )}
      >
        {children}
      </p>
    </Link>
  );
}

export default SidebarMenuItem;
