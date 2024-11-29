// Actions
import { getProfile } from '@/features/profile/actions';

// Components
import { NewFeedList } from '@/features/profile/components';
import { NewFeedSkeleton } from '@/features/profile/components/skeletons';
import { Suspense } from 'react';

const MainProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const profile = await getProfile(params.username);

  return (
    <Suspense fallback={<NewFeedSkeleton />}>
      <NewFeedList authorId={String(profile.id)} username={params.username} />
    </Suspense>
  );
};

export default MainProfilePage;
