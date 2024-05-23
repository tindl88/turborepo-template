import React, { FC } from 'react';
import classNames from 'classnames';
import { ChevronUpIcon } from 'lucide-react';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type SidebarIndicatorProps = {
  isOpen: boolean;
  isActive: boolean;
  isExpand: boolean;
} & ComponentBaseProps;

const SidebarIndicator: FC<SidebarIndicatorProps> = ({ className, isOpen, isActive, isExpand }) => {
  return (
    <button className={classNames('absolute right-6 top-2.5 h-6 w-6', className)}>
      <ChevronUpIcon
        className={classNames(
          'mx-auto origin-center transition-transform duration-200',
          isActive && 'text-white',
          isOpen ? 'rotate-0' : 'rotate-180',
          isExpand ? 'opacity-100' : 'opacity-0'
        )}
        size={20}
      />
    </button>
  );
};

export default SidebarIndicator;
