import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';
import { LoaderCircleIcon } from 'lucide-react';

const buttonVariants = cva(
  'font-roboto inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus:border-ring border',
  {
    variants: {
      variant: {
        default:
          'bg-white text-button hover:bg-blue-100 hover:border-blue-100 hover:shadow-sphere-primary dark:hover:bg-blue-100 border-gray-800 dark:border-dark-500 dark:bg-dark-100',
        fixed:
          'bg-white hover:border-gray-900 text-neutral-800 dark:text-white border-gray-800 dark:border-dark-500 dark:bg-dark-100',
        primary:
          'bg-primary text-primary-foreground hover:opacity-80 hover:shadow-sphere-primary border-primary',
        outline:
          'bg-white text-neutral-800 dark:text-white hover:text-white hover:bg-blue-100 hover:border-blue-100 hover:shadow-sphere-primary dark:hover:bg-blue-100 border-gray-800 dark:border-dark-500 dark:bg-dark-100',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-neutral-100 hover:text-blue-600 border-none',
        rounded: 'rounded-full',
        unstyle:
          'bg-transparent border-none rounded-none hover:bg-gray-100 dark:hover:bg-transparent text-neutral-200 dark:text-neutral-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        md: 'h-[38px] px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
        link: 'w-fit h-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <LoaderCircleIcon
            size={14}
            strokeWidth={3}
            strokeLinecap="square"
            className="animate-spin-fast"
          />
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
