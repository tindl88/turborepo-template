import React, { FC, ReactNode } from 'react';

export interface ITabPanelProps {
  children: ReactNode;
}

export const Panel: FC<ITabPanelProps> = ({ children }) => {
  return <>{children}</>;
};

export default Panel;
