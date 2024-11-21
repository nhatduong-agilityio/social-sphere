import { Skeleton } from '@/components/ui';

export const NewFeedSkeleton = () => (
  <div className="py-5 min-h-full flex w-full gap-6">
    <div className="hidden lg:flex lg:w-400 col-span-3 flex-col gap-6 dark:bg-slate-800 bg-white border rounded-md p-8">
      <div className="border-b border-slate-300 dark:border-slate-600 pb-4">
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
    <div className="flex w-full flex-col gap-6 dark:bg-slate-800 bg-white border rounded-md p-8">
      <div className="flex items-center  gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);
