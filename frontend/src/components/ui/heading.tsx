import { createElement, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const headingVariants = cva('font-montserrat text-xl', {
  variants: {
    variant: {
      default: 'text-text-primary',
      caption:
        'text-caption [text-shadow:_4px_4px_hsl(var(--sphere-60)),8px_8px_hsl(var(--sphere-60))]',
    },
    size: {
      default: '',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = ({
  variant,
  size,
  headingLevel = 'h2',
  className,
  children,
  ...props
}: HeadingProps) => {
  const Heading = ({ ...props }: HTMLAttributes<HTMLHeadingElement>) =>
    createElement(headingLevel, props, children);

  return (
    <Heading
      className={cn(headingVariants({ variant, size, className }))}
      {...props}
    />
  );
};
Heading.displayName = 'Heading';

export { Heading, headingVariants };
