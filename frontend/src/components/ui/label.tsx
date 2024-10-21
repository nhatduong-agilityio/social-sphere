'use client';

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/utils/cn';

const labelVariants = cva(
  'font-roboto peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'text-neutral-400 font-medium leading-none ',
        neutral: 'text-neutral-700 dark:text-neutral-100',
        darkNeutral: 'text-neutral-800 dark:text-neutral-100',
      },
      size: {
        default: 'text-xs',
        tiny: 'text-4xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, size, className }))}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
