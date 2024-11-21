import { Skeleton } from '@/components/ui';

export const OverviewInputSkeleton = () => (
  <div className="flex items-center justify-between dark:bg-slate-800 bg-white border rounded-md p-2">
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>

    <Skeleton className="h-12 w-12 rounded-full" />
  </div>
);
