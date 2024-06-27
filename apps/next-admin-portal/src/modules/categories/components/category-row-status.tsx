import React, { FC } from 'react';
import classNames from 'classnames';
import { Tooltip, TooltipProvider, TooltipTrigger } from '~react-web-ui-shadcn/components/ui/tooltip';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { StatusType } from '@/interfaces/status.interface';

import { CATEGORY_STATUSES } from '../constants/categories.constant';

type CategoryRowStatusProps = {
  status: StatusType;
  rejectReason?: string;
} & ComponentBaseProps;

const CategoryRowStatus: FC<CategoryRowStatusProps> = ({ className, status }) => {
  const statusValue = CATEGORY_STATUSES.find(item => item.value === status.value);

  return (
    <div className={classNames('categories-statuses', className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={classNames(
                'inline-flex items-center gap-x-1 rounded px-2 py-1 text-sm',
                statusValue?.textClassName,
                statusValue?.bgClassName,
                statusValue?.borderClassName
              )}
            >
              <span>{status.label}</span>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CategoryRowStatus;
