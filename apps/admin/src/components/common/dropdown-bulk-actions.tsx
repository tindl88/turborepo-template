import React, { FC } from 'react';
import classNames from 'classnames';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@ui/components/ui/dropdown-menu';

import { ComponentBaseProps } from '@/interfaces/component.interface';

export type DropdownBulkActionsType = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

type DropdownBulkActionsProps = {
  actions: DropdownBulkActionsType[];
  dropdownLabel: string;
} & ComponentBaseProps;

const DropdownBulkActions: FC<DropdownBulkActionsProps> = ({ actions, dropdownLabel, className }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={classNames('space-x-1 pr-2', className)}>
          <span>{dropdownLabel}</span>
          <ChevronDownIcon size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-56">
        {actions.map(({ label, onClick, disabled }, index) => (
          <DropdownMenuItem key={index} disabled={disabled} onClick={onClick}>
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownBulkActions;
