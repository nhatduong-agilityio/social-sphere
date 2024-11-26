import { Skeleton } from '../ui';

export const BannerSkeleton = () => (
  <Skeleton
    data-testid="banner-skeleton"
    className="relative w-full h-56 md:h-80 group"
  />
);
