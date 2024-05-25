import React, {ReactNode} from 'react';
import {type VariantProps, cva} from 'class-variance-authority';
import {View as RNView} from 'react-native';

import {cn} from './utils';

const viewVariants = cva('items-center justify-center rounded-md', {
  variants: {
    variant: {
      default: 'bg-primary dark:bg-primary'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface IViewProps extends React.ComponentPropsWithoutRef<typeof RNView>, VariantProps<typeof viewVariants> {
  children: ReactNode;
}
function View({children, className, variant, ...props}: IViewProps) {
  return (
    <RNView className={cn(viewVariants({variant, className}))} {...props}>
      {children}
    </RNView>
  );
}

export {viewVariants};
export default View;
