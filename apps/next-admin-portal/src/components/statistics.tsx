import React, { FC } from 'react';
import classNames from 'classnames';
import { CheckCircleIcon, DollarSignIcon, ShoppingBagIcon } from 'lucide-react';
import { Progress } from '~react-web-ui-shadcn/components/ui/progress';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type StatisticsProps = {
  sales: number;
  orders: number;
  conversionRate: number;
} & ComponentBaseProps;

const Statistics: FC<StatisticsProps> = ({ className, sales, orders, conversionRate }) => {
  return (
    <div className={classNames('statistics grid grid-cols-3 gap-4', className)}>
      <div className="flex items-center justify-between gap-x-4 space-y-1.5 rounded-lg border bg-card p-6">
        <div>
          <p className="text-xs uppercase">Weekly Sales</p>
          <p className="text-3xl font-bold">{sales}</p>
        </div>
        <div className="grow pr-10"></div>
        <div>
          <DollarSignIcon className="text-gray-600" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-4 space-y-1.5 rounded-lg border bg-card p-6">
        <div>
          <p className="text-xs uppercase">Orders</p>
          <p className="text-3xl font-bold">{orders}</p>
        </div>
        <div className="grow pr-10"></div>
        <div>
          <ShoppingBagIcon className="text-gray-600" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-4 space-y-1.5 rounded-lg border bg-card p-6">
        <div>
          <p className="flex flex-col text-xs uppercase">Conversion Rate</p>
          <p className="text-3xl font-bold">{conversionRate}</p>
        </div>
        <div className="grow pr-10">
          <Progress className="mt-6 h-1" value={75} />
        </div>
        <div>
          <CheckCircleIcon className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
