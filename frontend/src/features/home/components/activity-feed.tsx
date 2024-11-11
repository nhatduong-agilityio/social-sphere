import { ActivityFeedContent } from './activity-feed-content';
import { getNewsFeedIds } from '../actions/get-news-feeds';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
export const ActivityFeed = async () => {
  const session = await auth();
  const authorId = session?.user?.id;

  const { data: newsFeedIdsResponse } = await getNewsFeedIds(
    session?.user?.id || '',
  );

  if (!newsFeedIdsResponse || !authorId) notFound();

  return (
    <ActivityFeedContent
      authorId={authorId}
      newsFeedIds={newsFeedIdsResponse.data}
      pagination={newsFeedIdsResponse.meta.pagination}
    />
  );
};
