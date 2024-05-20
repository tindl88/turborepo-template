import React, { FC } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import Logo from '@/components/icons/logo';

type SidebarHeaderProps = ComponentBaseProps & {
  isExpand: boolean;
};

const SidebarHeader: FC<SidebarHeaderProps> = ({ className, isExpand }) => {
  return (
    <div className={classNames('nap-sidebar-icon flex items-center gap-x-4 px-5', className)}>
      <div className="flex h-16 items-center gap-x-4">
        <Logo
          className={`cursor-pointer transition-transform duration-300 ease-in-out ${isExpand && 'rotate-[360deg]'}`}
        />
        <h1
          className={`origin-left text-2xl font-semibold transition-transform duration-200 ease-in-out ${
            !isExpand && 'scale-0'
          }`}
        >
          NEXT<span className="text-primary">AP</span>
        </h1>
      </div>
    </div>
  );
};

export default SidebarHeader;
