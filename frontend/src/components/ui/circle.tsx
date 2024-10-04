import { forwardRef, HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const circleVariants = cva('rounded-full flex justify-center items-center', {
  variants: {
    variant: {
      default: 'bg-sphere-50',
      primary:
        'bg-circle border-[1.4px] border-circle-foreground shadow-[-1px_3px_10px_0_rgba(0,0,0,.06)]',
    },
    size: {
      default: 'h-8 w-8',
      md: 'h-[34px] w-[34px]',
      lg: 'h-[38px] w-[38px]',
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
