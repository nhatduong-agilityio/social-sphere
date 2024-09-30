// Components
import { Skeleton } from '@/components/ui/skeleton';

export const CategoryDetailSkeleton = () => (
  <div className="grid grid-cols-[120px_1fr]">
    <div className="flex flex-col items-center">
      <Skeleton className="w-16 h-5 mb-1" />

      <Skeleton className="w-24 h-24" />
    </div>
    <div className="flex justify-center">
      <Skeleton className="w-96 h-5" />
    </div>
  </div>
);
