import React, {ReactNode} from 'react';
import {type VariantProps, cva} from 'class-variance-authority';
import {Pressable} from 'react-native';

import {cn} from './utils';

const iconButtonVariants = cva('items-center justify-center rounded-md', {
  variants: {
    variant: {
      default: 'bg-gray-800 dark:bg-gray-900'
    },
    size: {
      default: 'h-12 px-4',
      sm: 'h-10 px-2',
      lg: 'h-14 px-8'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

interface IButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof iconButtonVariants> {
  children: ReactNode;
}
function IconButton({children, className, variant, size, ...props}: IButtonProps) {
  return (
    <Pressable className={cn(iconButtonVariants({variant, size, className}))} {...props}>
      {children}
    </Pressable>
  );
}

export {IconButton, iconButtonVariants};
