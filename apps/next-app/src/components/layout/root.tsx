'use client';

import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';

type RootProps = {
  children?: ReactNode;
} & ComponentBaseProps;

const Root: FC<RootProps> = ({ className, children }) => {
  return <div className={classNames('nap-root flex grow flex-col', className)}>{children}</div>;
};

export default Root;
