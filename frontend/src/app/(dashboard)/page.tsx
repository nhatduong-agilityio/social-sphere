import { ROUTER } from '@/constants';
import { ActivityFeed } from '@/features/home/components';
import { Suspense } from 'react';

const Homepage = () => (
  <Suspense key={ROUTER.HOME} fallback={null}>
    <ActivityFeed />
  </Suspense>
);

export default Homepage;
