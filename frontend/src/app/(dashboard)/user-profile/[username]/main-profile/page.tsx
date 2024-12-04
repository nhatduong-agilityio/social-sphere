import { Suspense } from 'react';
// Actions
import { getProfile } from '@/features/profile/actions';

// Components
import { NewFeedList, NewFriendsContent } from '@/features/profile/components';
import { PostListSkeleton, WidgetSkeleton } from '@/components/sections';

const MainProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const profile = await getProfile(params.username);

  return (
    <div className="py-5 min-h-full">
      <div className="h-full flex w-full gap-6">
        <div className="lg:flex lg:w-400 col-span-3 flex-col gap-6">
          <Suspense fallback={<WidgetSkeleton />}>
            <NewFriendsContent username={params.username} />
          </Suspense>
        </div>

        <Suspense fallback={<PostListSkeleton />}>
          <NewFeedList
            authorId={String(profile.id)}
            username={params.username}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default MainProfilePage;
