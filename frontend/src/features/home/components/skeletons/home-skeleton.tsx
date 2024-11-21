import { PostSkeleton, WidgetSkeleton } from '@/components/sections';

export const HomeSkeleton = () => (
  <div className="py-5 min-h-full flex w-full gap-6">
    <div className="flex flex-col gap-6">
      <WidgetSkeleton />
      <WidgetSkeleton />
    </div>

    <div className="w-full flex flex-col gap-6">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>

    <div className="flex flex-col gap-6">
      <WidgetSkeleton />
      <WidgetSkeleton />
    </div>
  </div>
);
