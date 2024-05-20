import React, { FC, useEffect, useRef, useState } from 'react';
import Chart, { ChartDataset } from 'chart.js/auto';
import classNames from 'classnames';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/components/ui/card';
import { Separator } from '@ui/components/ui/separator';
import { Switch } from '@ui/components/ui/switch';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { getCssVar } from '@/utils/css.util';

type ChartConversionsProps = {
  data: ChartDataset[];
  labels: string[];
} & ComponentBaseProps;

const ChartConversions: FC<ChartConversionsProps> = ({ className, data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [isShowPreviousData, setIsShowPreviousData] = useState(false);

  useEffect(() => {
    if (isShowPreviousData) {
      chartInstance.current?.legend?.chart.show(1);
    } else {
      chartInstance.current?.legend?.chart.hide(1);
    }
  }, [isShowPreviousData]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy();

      const primaryColor = getCssVar('--primary').replaceAll(' ', ',');
      const borderColor = getCssVar('--border').replaceAll(' ', ',');

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            { ...data[0], backgroundColor: `hsl(${primaryColor})` },
            { ...data[1], backgroundColor: '#cccccc' }
          ] as ChartDataset[]
        },
        options: {
          scales: {
            y: {
              ticks: {
                callback(tickValue) {
                  return tickValue + '%';
                }
              },
              grid: {
                color: `hsl(${borderColor})`
              }
            }
          }
        }
      });
    }
  }, [data, labels]);

  return (
    <Card className={classNames('chart-conversions', className)}>
      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <CardTitle>Conversions</CardTitle>
          <div className="flex items-center space-x-2">
            <span>Last year comparision:</span>
            <Switch checked={isShowPreviousData} onCheckedChange={setIsShowPreviousData} />
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="relative h-72">
        <canvas ref={chartRef} />
      </CardContent>
    </Card>
  );
};

export default ChartConversions;
