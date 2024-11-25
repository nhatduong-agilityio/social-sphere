import { HTMLAttributes } from 'react';

import { cn } from '@/utils';

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('animate-pulse rounded-md bg-muted', className)}
    {...props}
  />
);

export { Skeleton };
