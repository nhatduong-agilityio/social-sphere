import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus:border-ring',
  {
    variants: {
      variant: {
        default:
          'border border-gray-800 bg-white dark:border-dark-500 dark:bg-dark-100 text-button hover:bg-blue-100 hover:border-blue-100 hover:shadow-sphere-primary dark:hover:bg-blue-100 transition-all duration-300 ease-in-out',
        primary:
          'border border-blue-600 bg-blue-600 text-white hover:opacity-80 hover:shadow-sphere-primary transition-all duration-300 ease-in-out',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-neutral-100 hover:text-blue-600',
        rounded: 'rounded-full',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
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
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
