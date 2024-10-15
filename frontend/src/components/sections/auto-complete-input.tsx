'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { XIcon } from 'lucide-react';

import { cn } from '@/utils/cn';

// Hooks
import { useFocusState } from '@/hooks/use-focus-state';

const autoCompleteInputVariants = cva(
  'flex h-9 w-full rounded-lg border border-input bg-white dark:bg-dark-500 px-10 py-2 text-sm file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'transition-all duration-300 ease-in-out dark:border-dark-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface AutoCompleteInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof autoCompleteInputVariants> {
  startIcon: ReactNode;
  onClose?: () => void;
}

const AutoCompleteInput = forwardRef<HTMLInputElement, AutoCompleteInputProps>(
  ({ className, startIcon, variant = 'default', onClose, ...props }, ref) => {
    const { isFocused, handleBlur, handleFocus } = useFocusState();

    return (
      <div className="relative w-full flex items-center" onBlur={handleBlur}>
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out left-3',
            isFocused ? 'text-ring' : 'text-gray-900 dark:text-primary',
          )}
        >
          {startIcon}
        </div>
        <input
          ref={ref}
          className={cn(autoCompleteInputVariants({ variant, className }))}
          autoComplete="true"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {onClose && (
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out text-gray-900 dark:text-white hover:dark:text-neutral-700 hover:text-neutral-700 right-3',
            )}
            onClick={onClose}
          >
            <XIcon size={16} />
          </div>
        )}
      </div>
    );
  },
);
AutoCompleteInput.displayName = 'AutoCompleteInput';

export { AutoCompleteInput };
