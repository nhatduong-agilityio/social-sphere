import { createElement, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const headingVariants = cva('font-montserrat text-xl', {
  variants: {
    variant: {
      default: 'text-heading',
      title: 'font-roboto font-medium text-neutral-700 dark:text-gray-100',
      caption: 'text-gray-50 [text-shadow:_4px_4px_#3180e1,_8px_8px_#3180e1]',
    },
    size: {
      default: '',
      base: 'text-base',
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
