import { forwardRef, HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const circleVariants = cva('rounded-full flex justify-center items-center', {
  variants: {
    variant: {
      default: 'bg-blue-600',
      primary:
        'bg-white dark:bg-dark-600 border-[1.4px] border-gray-600 dark:border-blue-800 shadow-sphere-light',
      secondary:
        'bg-white dark:bg-popover border border-gray-600 dark:border-dark-500 text-neutral-200',
    },
    size: {
      tiny: 'w-2.5 h-2.5',
      default: 'h-8 w-8',
      md: 'h-[34px] w-[34px]',
      lg: 'h-[38px] w-[38px]',
      xl: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface CircleProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circleVariants> {}

const Circle = forwardRef<HTMLDivElement, CircleProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(circleVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Circle.displayName = 'Circle';

export { Circle, circleVariants };
