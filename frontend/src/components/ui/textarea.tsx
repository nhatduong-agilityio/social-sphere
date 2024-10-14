import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

const textAriaVariants = cva(
  'flex w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-neutral-800 dark:text-gray-100',
        ghost: 'border-none focus:outline-none ',
      },
      size: {
        default: 'min-h-[80px]',
        sm: 'min-h-[66px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAriaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <textarea
        className={cn(textAriaVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
