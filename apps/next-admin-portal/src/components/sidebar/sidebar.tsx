'use client';

import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import SidebarHeader from './sidebar-header';
import SidebarNavigation from './sidebar-navigation';

type SidebarProps = {
  isExpand: boolean;
} & ComponentBaseProps;

const Sidebar: FC<SidebarProps> = ({ className, isExpand = true, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isAfterExpanded, setIsAfterExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAfterExpanded(isExpand);
    }, 100);
  }, [isExpand]);

  return (
    <div
      ref={ref}
      className={classNames(
        'nap-sidebar fixed z-20 flex h-full flex-col border-r bg-card transition-width duration-300 ease-in-out',
        className,
        isExpand ? 'w-64' : 'w-20'
      )}
      data-testid="sidebar"
      {...rest}
    >
      <SidebarHeader isExpand={isAfterExpanded} />
      <SidebarNavigation isExpand={isAfterExpanded} />
    </div>
  );
};

export default Sidebar;
