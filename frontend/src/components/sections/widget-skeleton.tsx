import { Skeleton } from '@/components/ui';

export const WidgetSkeleton = () => (
  <div className="hidden lg:flex max-h-32 col-span-3 flex-col gap-6 dark:bg-slate-800 bg-white border rounded-md p-3">
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
);
