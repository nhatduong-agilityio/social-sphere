'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

// Hooks
import { useFocusState } from '@/hooks/use-focus-state';

const inputVariants = cva(
  'flex h-10 w-full rounded-lg border border-input bg-white dark:bg-dark-500 px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        icon: 'transition-all duration-300 ease-in-out focus:border-ring dark:border-input',
        ghost:
          'border-0 bg-transparent dark:bg-transparent px-0 py-1 transition-all duration-300 ease-in-out focus:border-ring dark:border-input',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ startIcon, endIcon, className, variant, type, ...props }, ref) => {
    const { isFocused, handleBlur, handleFocus } = useFocusState();

    const renderIcon = (
      icon: ReactNode,
      position: 'left' | 'right',
      isFocused: boolean,
    ) =>
      icon && (
        <div
          className={cn(
            `absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out`,
            position === 'left' ? 'left-3' : 'right-3',
            isFocused ? 'text-ring' : 'text-gray-900',
          )}
        >
          {icon}
        </div>
      );

    return (
      <div className="relative w-full flex items-center" onBlur={handleBlur}>
        {renderIcon(startIcon, 'left', isFocused)}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, className }),
            startIcon && 'pl-10',
            endIcon && 'pr-10',
          )}
          ref={ref}
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {renderIcon(endIcon, 'right', isFocused)}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
