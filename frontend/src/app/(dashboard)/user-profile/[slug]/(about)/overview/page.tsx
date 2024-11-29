import { Suspense } from 'react';

// Components
import { OverviewContent } from '@/features/profile/components';
import { OverviewSkeleton } from '@/features/profile/components/skeletons';

const OverviewPage = ({ params }: { params: { username: string } }) => (
  <Suspense fallback={<OverviewSkeleton />}>
    <OverviewContent username={params.username} />
  </Suspense>
);

export default OverviewPage;
