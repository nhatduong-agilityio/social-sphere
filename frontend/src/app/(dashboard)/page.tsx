import { Suspense } from 'react';
import { notFound } from 'next/navigation';

// Components
import { ActivityFeed } from '@/features/home/components';
import { HomeSkeleton } from '@/features/home/components/skeletons';

// Constants
import { ROUTER } from '@/constants';

// Hooks
import { auth } from '@/auth';

const Homepage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) notFound();

  return (
    <Suspense key={ROUTER.HOME} fallback={<HomeSkeleton />}>
      <ActivityFeed authorId={userId} />
    </Suspense>
  );
};

export default Homepage;
