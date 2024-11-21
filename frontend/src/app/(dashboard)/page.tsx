import { Suspense } from 'react';

// Components
import { ActivityFeed } from '@/features/home/components';
import { HomeSkeleton } from '@/features/home/components/skeletons';

// Constants
import { ROUTER } from '@/constants';

const Homepage = () => (
  <Suspense key={ROUTER.HOME} fallback={<HomeSkeleton />}>
    <ActivityFeed />
  </Suspense>
);

export default Homepage;
