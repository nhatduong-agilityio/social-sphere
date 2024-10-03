'use client';

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const switchVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-border-secondary dark:border-sphere-30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'data-[state=checked]:bg-primary data-[state=unchecked]:bg-background',
      },
      size: {
        default: 'h-[31px] w-[54px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface SwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  checkedIcon?: ReactNode;
  uncheckedIcon?: ReactNode;
}

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, size, checkedIcon, uncheckedIcon, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ variant, size, className }))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none flex items-center justify-center rounded-full bg-background dark:bg-sphere-30 ring-0 transition-transform',
        'h-[26px] w-[26px] data-[state=checked]:translate-x-6',
      )}
    >
      {props.checked ? uncheckedIcon : checkedIcon}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch, switchVariants };
