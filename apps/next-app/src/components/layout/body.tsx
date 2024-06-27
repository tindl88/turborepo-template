import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { Toaster } from '~react-web-ui-shadcn/components/ui/toaster';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import BodyInjector from './body-injector';
import Providers from './providers';

type BodyProps = {
  children: ReactNode;
} & ComponentBaseProps;

const Body: FC<BodyProps> = ({ className, children }) => {
  return (
    <body className={classNames('scrollbar flex h-full flex-col antialiased', className)}>
      <Providers>
        {children}
        <BodyInjector />
        <Toaster />
      </Providers>
    </body>
  );
};

export default Body;
