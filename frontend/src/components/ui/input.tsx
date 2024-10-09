'use client';

import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const inputVariants = cva(
  'flex h-10 w-full rounded-lg border border-input bg-white dark:bg-dark-500 px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        icon: 'transition-all duration-300 ease-in-out focus:border-blue-100 dark:border-input',
        ghost:
          'border-0 bg-transparent dark:bg-transparent px-2.5 py-1 transition-all duration-300 ease-in-out focus:border-blue-100 dark:border-input',
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
    const [isFocused, setIsFocused] = useState(false);

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
            isFocused ? 'text-blue-100' : 'text-gray-900',
          )}
        >
          {icon}
        </div>
      );

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    return (
      <div className="relative flex items-center" onBlur={handleBlur}>
        {renderIcon(startIcon, 'left', isFocused)}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, className }),
            startIcon && 'pl-10',
            endIcon && 'pr-10',
          )}
          ref={ref}
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
