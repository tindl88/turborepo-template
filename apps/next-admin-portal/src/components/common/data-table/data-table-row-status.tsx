import React, { FC } from 'react';
import classNames from 'classnames';
import { Tooltip, TooltipProvider, TooltipTrigger } from '~ui/components/ui/tooltip';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { StatusType } from '@/interfaces/status.interface';

type DataTableRowStatusProps = {
  status?: StatusType;
} & ComponentBaseProps;

const DataTableRowStatus: FC<DataTableRowStatusProps> = ({ className, status }) => {
  return (
    <div className={classNames('row-statuses', className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={classNames(
                'inline-flex items-center gap-x-1 rounded px-2 py-1 text-sm',
                status?.textClassName,
                status?.bgClassName,
                status?.borderClassName
              )}
            >
              <span>{status?.label}</span>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DataTableRowStatus;
