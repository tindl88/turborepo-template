import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Toaster } from '~react-web-ui-shadcn/components/ui/toaster';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import AllTheProviders from '../all-the-providers';

type BodyProps = {
  children: ReactNode;
} & ComponentBaseProps;

const Body: FC<BodyProps> = ({ className, children }) => {
  return (
    <body className={classNames('scrollbar flex h-full flex-col antialiased', className)}>
      <AllTheProviders>
        {children}
        <Toaster />
        <div className="transform-gpu"></div>
      </AllTheProviders>
    </body>
  );
};

export default Body;
