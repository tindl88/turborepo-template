import React, { FC } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type BoxProps = {
  children?: React.ReactNode;
  spacing?: boolean;
  flat?: boolean;
} & ComponentBaseProps;

const Box: FC<BoxProps> = ({ className, children, spacing = true, flat = false }) => {
  return (
    <div
      className={classNames(
        'flex grow flex-col text-card-foreground',
        spacing && 'p-4',
        !flat && 'rounded-lg border bg-card shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
