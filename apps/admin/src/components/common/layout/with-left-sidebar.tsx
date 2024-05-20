'use client';

import React, { FC, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import useSidebar from '@/hooks/use-sidebar';

import Header from '@/modules/header/components/header';
import Sidebar from '@/modules/sidebar/components/sidebar';

type LayoutWithLeftSidebarProps = {
  children?: ReactNode;
} & ComponentBaseProps;

const LayoutWithLeftSidebar: FC<LayoutWithLeftSidebarProps> = ({ children }) => {
  const session = useSession();
  const sidebar = useSidebar();

  return (
    <div className="layout-with-left-sidebar flex grow flex-col">
      <Sidebar isExpand={sidebar.isExpanded} />
      <div
        className={classNames(
          'nap-content transition-spacing flex grow flex-col duration-300 ease-in-out',
          sidebar.isExpanded ? 'pl-64' : 'pl-20'
        )}
      >
        <Header user={session.data?.user} onSidebarCollapseClick={sidebar.toggle} />
        {children}
      </div>
    </div>
  );
};

export default LayoutWithLeftSidebar;
