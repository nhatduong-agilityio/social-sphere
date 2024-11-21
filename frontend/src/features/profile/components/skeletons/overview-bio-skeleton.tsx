import { Skeleton } from '@/components/ui';

export const OverviewBioSkeleton = () => (
  <div className="w-full flex items-end gap-2 justify-between dark:bg-slate-800 bg-white border rounded-md p-8">
    <div className="flex w-full h-full gap-3">
      <Skeleton className="h-4 w-[250px]" />
      <div className="space-y-2">
        <Skeleton className="w-full h-56 p-0 border-none dark:bg-slate-800 text-slate-400" />
      </div>
    </div>

    <Skeleton className="h-10 w-10 rounded-full" />
  </div>
);
