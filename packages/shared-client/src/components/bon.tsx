'use client';

import { ReactNode } from 'react';

interface BonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

const Bon = ({ children, className, appName }: BonProps) => {
  return (
    <button className={className} onClick={() => alert(`Hello from your ${appName} app!`)}>
      {children}
    </button>
  );
};

export { Bon };
