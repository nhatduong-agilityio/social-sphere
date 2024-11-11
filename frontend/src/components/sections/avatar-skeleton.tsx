import { cn } from '@/utils';
import { Skeleton } from '../ui';

interface AvatarSkeletonProps {
  customClass?: string;
}

export const AvatarSkeleton = ({ customClass }: AvatarSkeletonProps) => (
  <Skeleton className={cn('w-24 h-24 rounded-full', customClass)} />
);
