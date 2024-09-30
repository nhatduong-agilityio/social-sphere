// Components
import { Skeleton } from '@/components/ui/skeleton';

const CategoryRowSkeleton = () => (
  <div className="border-b mb-1 py-1.5 flex gap-2 items-center">
    <Skeleton className="w-12 h-9" />
    <div className="">
      <Skeleton className="h-3 w-56" />
    </div>
  </div>
);

type CategoryListSkeletonProps = {
  totalItems?: number;
};

export const CategoryListSkeleton = ({
  totalItems = 6,
}: CategoryListSkeletonProps) => (
  <>
    {[...Array(totalItems)].map((_, idx) => (
      <CategoryRowSkeleton key={idx} />
    ))}
  </>
);
