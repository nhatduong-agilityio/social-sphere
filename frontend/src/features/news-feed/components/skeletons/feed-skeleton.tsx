import { PostSkeleton } from '@/components/sections';
import { Skeleton } from '@/components/ui';

export const FeedSkeleton = () => (
  <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
    <div className="flex w-full h-fit flex-col gap-6 dark:bg-slate-800 bg-white border rounded-md p-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-16 w-full" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>
      </div>
    </div>

    <PostSkeleton />
    <PostSkeleton />
    <PostSkeleton />
  </div>
);
