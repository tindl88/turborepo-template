'use client';

import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import useSidebar from '@/hooks/use-sidebar';

import Header from '@/components/headers/header';
import Sidebar from '@/components/sidebar/sidebar';

import { useAppData } from '@/modules/app-data/hooks/use-app-data';

type LeftSidebarProps = {
  children?: ReactNode;
} & ComponentBaseProps;

const LeftSidebar: FC<LeftSidebarProps> = ({ children }) => {
  const { user } = useAppData();
  const sidebar = useSidebar();

  return (
    <div className="layout-with-left-sidebar flex grow flex-col">
      <Sidebar isExpand={sidebar.isExpanded} />
      <div
        className={classNames(
          'nap-content flex grow flex-col transition-spacing duration-300 ease-in-out',
          sidebar.isExpanded ? 'pl-64' : 'pl-20'
        )}
      >
        <Header user={user} onSidebarCollapseClick={sidebar.toggle} />
        {children}
      </div>
    </div>
  );
};

export default LeftSidebar;
