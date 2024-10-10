'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { SearchIcon, XIcon } from 'lucide-react';

import { cn } from '@/utils/cn';

// Hooks
import { useFocusState } from '@/hooks/use-focus-state';

const searchInputVariants = cva(
  'flex h-9 lg:h-[38px] w-full rounded-lg border border-input bg-white dark:bg-dark-500 px-10 py-2 text-sm file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'transition-all duration-300 ease-in-out focus:border-ring dark:border-input',
        primary:
          'border-gray-200 bg-gray-200 dark:bg-dark-500 dark:border-dark-500 focus:border-gray-700 focus:bg-white focus:shadow-sphere-light rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof searchInputVariants> {
  onClose?: () => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, variant = 'default', onClose, ...props }, ref) => {
    const { isFocused, handleBlur, handleFocus } = useFocusState();

    const isDefaultVariant = variant === 'default';

    return (
      <div className="relative w-full flex items-center" onBlur={handleBlur}>
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out left-3',
            isFocused
              ? isDefaultVariant
                ? 'text-ring'
                : 'text-neutral-200 dark:text-primary'
              : 'text-gray-900 dark:text-primary',
          )}
        >
          <SearchIcon size={20} />
        </div>
        <input
          ref={ref}
          className={cn(searchInputVariants({ variant, className }))}
          placeholder="Search..."
          autoComplete="off"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {onClose && (
          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out text-neutral-700 right-3',
            )}
            onClick={onClose}
          >
            <XIcon size={20} />
          </div>
        )}
      </div>
    );
  },
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };
