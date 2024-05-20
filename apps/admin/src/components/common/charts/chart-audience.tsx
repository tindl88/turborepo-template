import React, { FC, useEffect, useRef, useState } from 'react';
import Chart, { ChartDataset } from 'chart.js/auto';
import classNames from 'classnames';
import { Button } from '@ui/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/components/ui/card';
import { Separator } from '@ui/components/ui/separator';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { getCssVar } from '@/utils/css.util';

type ChartAudienceProps = {
  data: ChartDataset[];
  labels: string[];
} & ComponentBaseProps;

const ChartAudience: FC<ChartAudienceProps> = ({ className, data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (chartInstance.current) {
      const datasets = chartInstance.current.data.datasets;

      const activeDatasetIndex = datasets.findIndex(dataset => !dataset.hidden);
      const activeDataset = datasets[activeDatasetIndex] as ChartDataset;
      let backupDataset = datasets.find(dataset => dataset.order === 1000);

      if (!backupDataset) {
        backupDataset = {
          ...activeDataset,
          order: 1000,
          hidden: true
        } as ChartDataset;
        datasets.push(backupDataset);
      }

      const sourceDataset = datasets[activeIndex] === activeDataset ? backupDataset : datasets[activeIndex];

      datasets[0] = Object.assign(activeDataset, {
        ...sourceDataset,
        hidden: undefined,
        order: undefined
      }) as ChartDataset;

      chartInstance.current.update();
    }
  }, [activeIndex]);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy();

      const primaryColor = getCssVar('--primary').replaceAll(' ', ',');
      const borderColor = getCssVar('--border').replaceAll(' ', ',');

      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels,
          datasets: [
            { ...data[0], borderColor: `hsl(${primaryColor})` },
            { ...data[1], borderColor: `hsl(${primaryColor})` },
            { ...data[2], borderColor: `hsl(${primaryColor})` }
          ] as ChartDataset[]
        },
        options: {
          scales: {
            yAxisOne: {
              display: 'auto',
              ticks: {
                callback: function (value) {
                  return value + 'k';
                }
              },
              grid: {
                color: `hsl(${borderColor})`
              }
            },
            yAxisTwo: {
              display: 'auto',
              ticks: {
                callback: function (value) {
                  return value + '%';
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
    <Card className={classNames('chart-audience relative', className)}>
      <CardHeader className="py-4">
        <div className="flex items-center justify-between">
          <CardTitle>Audience</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={'ghost'}
              size={'sm'}
              className={classNames('h-8 py-0', activeIndex === 0 && 'bg-accent')}
              onClick={() => setActiveIndex(0)}
            >
              Customers
            </Button>
            <Button
              variant={'ghost'}
              size={'sm'}
              className={classNames('h-8 py-0', activeIndex === 1 && 'bg-accent')}
              onClick={() => setActiveIndex(1)}
            >
              Sessions
            </Button>
            <Button
              variant={'ghost'}
              size={'sm'}
              className={classNames('h-8 py-0', activeIndex === 2 && 'bg-accent')}
              onClick={() => setActiveIndex(2)}
            >
              Conversion
            </Button>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="relative h-80">
        <canvas ref={chartRef} />
      </CardContent>
    </Card>
  );
};

export default ChartAudience;
