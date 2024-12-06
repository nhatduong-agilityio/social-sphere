import { Suspense } from 'react';

// Components
import { PostListSkeleton, WidgetSkeleton } from '@/components/sections';
import { NewFriendsContent } from '@/features/friend/components';
import { ActivityFeed } from '@/features/news-feed/components';

const MainProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => (
  <div className="py-5 min-h-full">
    <div className="h-full flex w-full gap-6">
      <div className="lg:flex lg:w-400 col-span-3 flex-col gap-6">
        <Suspense fallback={<WidgetSkeleton />}>
          <NewFriendsContent username={params.username} />
        </Suspense>
      </div>

      <Suspense fallback={<PostListSkeleton />}>
        <ActivityFeed />
      </Suspense>
    </div>
  </div>
);

export default MainProfilePage;
