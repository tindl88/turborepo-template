import { ComponentType } from 'react';

export type StatusType = {
  label: string;
  value: string;
  textClassName: string;
  bgClassName: string;
  borderClassName: string;
  activeClassName: string;
  iconClassName: string;
  icon: ComponentType<{ className?: string }>;
};
