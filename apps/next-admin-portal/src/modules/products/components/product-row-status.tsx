import React, { FC } from 'react';
import classNames from 'classnames';
import { Tooltip, TooltipProvider, TooltipTrigger } from '~ui/components/ui/tooltip';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { StatusType } from '@/interfaces/status.interface';

import { PRODUCT_STATUSES } from '../constants/products.constant';

type ProductRowStatusProps = {
  status: StatusType;
  rejectReason?: string;
} & ComponentBaseProps;

const ProductRowStatus: FC<ProductRowStatusProps> = ({ className, status }) => {
  const statusValue = PRODUCT_STATUSES.find(item => item.value === status.value);

  return (
    <div className={classNames('products-statuses', className)}>
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

export default ProductRowStatus;
