import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-base font-medium ring-offset-background transition-all duration-300 ease-in-out outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 focus:border-ring',
  {
    variants: {
      variant: {
        default:
          'border border-border-secondary bg-button text-button-foreground hover:border-border-primary',
        primary:
          'border border-button-primary bg-button-primary text-button-primary-foreground hover:opacity-80 hover:shadow-[0_14px_26px_-12px_rgba(61,112,178,.42),0_4px_23px_0px_rgba(0,0,0,.12),0_8px_10px_-5px_rgba(61,112,178,.2)] transition-all duration-300 ease-in-out',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-button-foreground hover:text-button-primary',
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
