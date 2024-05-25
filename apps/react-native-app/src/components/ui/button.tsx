import React from 'react';
import {type VariantProps, cva} from 'class-variance-authority';
import {Pressable, Text} from 'react-native';

import {cn} from './utils';

const buttonVariants = cva('items-center justify-center rounded', {
  variants: {
    variant: {
      default: 'bg-primary dark:bg-primary',
      destructive: 'bg-red-500',
      secondary: 'bg-gray-500',
      ghost: 'bg-slate-700',
      link: 'text-primary underline-offset-4'
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

const buttonTextVariants = cva('text-center font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground dark:text-primary-foreground',
      destructive: 'text-white dark:text-black',
      secondary: 'text-white dark:text-black',
      ghost: 'text-white dark:text-black',
      link: 'text-primary underline'
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-xl'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
});

interface IButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable>, VariantProps<typeof buttonVariants> {
  label: string;
  labelClasses?: string;
}
function Button({label, labelClasses, className, variant, size, ...props}: IButtonProps) {
  return (
    <Pressable className={cn(buttonVariants({variant, size, className}))} {...props}>
      <Text className={cn(buttonTextVariants({variant, size, className: labelClasses}))}>{label}</Text>
    </Pressable>
  );
}

export {Button, buttonTextVariants, buttonVariants};
