import React, { FC } from 'react';
import { ChartDataset } from 'chart.js';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import ChartAudience from '@/components/common/charts/chart-audience';
import ChartConversions from '@/components/common/charts/chart-conversions';
import ChartTraffic from '@/components/common/charts/chart-traffic';
import Statistics from '@/components/common/statistics';

// Conversion
const conversionLabels = ['Feb 1', 'Feb 2', 'Feb 3', 'Feb 4', 'Feb 5', 'Feb 6', 'Feb 7', 'Feb 8', 'Feb 9', 'Feb 10'];
const conversionData: ChartDataset[] = [
  {
    label: '2024',
    data: [12, 15, 8, 11, 12, 16, 13, 11, 14, 19],
    categoryPercentage: 0.5,
    barPercentage: 0.35
  },
  {
    label: '2023',
    data: [8, 7, 8, 3, 4, 7, 3, 7, 5, 7],
    categoryPercentage: 0.5,
    barPercentage: 0.35,
    hidden: true
  }
];
// Audience
const audienceLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const audienceData: ChartDataset[] = [
  {
    label: 'Customers',
    data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40],
    yAxisID: 'yAxisOne'
  },
  {
    label: 'Sessions',
    data: [50, 75, 35, 25, 55, 87, 67, 53, 25, 80, 87, 45],
    yAxisID: 'yAxisOne',
    hidden: true
  },
  {
    label: 'Conversion',
    data: [40, 57, 25, 50, 57, 32, 46, 28, 59, 34, 52, 48],
    yAxisID: 'yAxisTwo',
    hidden: true
  }
];
// Traffic
const trafficLabels = ['Direct', 'Referral'];
const trafficData = [60, 10];

const DashboardRoot: FC<ComponentBaseProps> = ({ className }) => {
  return (
    <div className={classNames('dashboard overflow-hidden', className)}>
      <Statistics sales={540} orders={1235} conversionRate={75} />
      <ChartAudience className="mt-4" labels={audienceLabels} data={audienceData} />
      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-9">
          <ChartConversions className="" labels={conversionLabels} data={conversionData} />
        </div>
        <div className="col-span-3">
          <ChartTraffic className="" labels={trafficLabels} data={trafficData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardRoot;
