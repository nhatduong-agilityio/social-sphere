import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const textVariants = cva('text-sm', {
  variants: {
    variant: {
      default: 'text-foreground',
      primary: 'text-neutral-100',
      error: 'text-destructive',
    },
    size: {
      default: 'text-sm',
      xs: 'text-xs',
      md: 'text-md',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(textVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Text.displayName = 'Text';

export { Text, textVariants };
