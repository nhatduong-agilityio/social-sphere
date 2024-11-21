import { OverviewBioSkeleton } from './overview-bio-skeleton';
import { OverviewInputSkeleton } from './overview-input-skeleton';

export const OverviewSkeleton = () => (
  <div className="flex gap-3 md:flex-row flex-col">
    <div className="flex w-full gap-4 flex-col">
      <OverviewInputSkeleton />
      <OverviewInputSkeleton />
      <OverviewInputSkeleton />
      <OverviewInputSkeleton />
    </div>
    <OverviewBioSkeleton />
  </div>
);
