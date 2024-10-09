'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const progressVariants = cva(
  'relative w-full bg-gray-600 dark:bg-dark-300 overflow-hidden rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-gray-600 dark:bg-dark-300',
        secondary: 'border-6 border-white dark:border-blue-800',
      },
      size: {
        default: 'h-4',
        md: 'h-[18px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ProgressProps
  extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {}

const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, size, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ variant, size, className }))}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-sphere-30 transition-all duration-300"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressVariants };
