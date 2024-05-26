import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';

import { cn } from './utils';

const lineVariants = cva('items-center justify-center rounded-md', {
  variants: {
    variant: {
      default: 'shrink-0 bg-gray-600 dark:bg-gray-600'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

interface IButtonProps extends React.ComponentPropsWithoutRef<typeof View>, VariantProps<typeof lineVariants> {
  orientation?: 'vertical' | 'horizontal';
}
function Line({ className, orientation = 'horizontal', variant, ...props }: IButtonProps) {
  return (
    <View
      className={cn(
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        lineVariants({ variant, className })
      )}
      {...props}
    />
  );
}

export { Line, lineVariants };
