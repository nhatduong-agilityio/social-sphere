import { forwardRef, HTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const circleVariants = cva('rounded-full flex justify-center items-center', {
  variants: {
    variant: {
      default: 'bg-sphere-50',
      active: 'bg-sphere-green-10',
    },
    size: {
      default: 'h-8 w-8',
      md: 'h-34 w-34',
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
