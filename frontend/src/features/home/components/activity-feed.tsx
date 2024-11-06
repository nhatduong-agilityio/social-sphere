import { ActivityFeedContent } from './activity-feed-content';
import { getNewsFeeds } from '../actions/get-news-feeds';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
export const ActivityFeed = async () => {
  const session = await auth();
  const authorId = session?.user?.id;

  const { data: newsFeedsResponse } = await getNewsFeeds(
    session?.user?.id || '',
  );

  if (!newsFeedsResponse || !authorId) notFound();

  return (
    <ActivityFeedContent
      authorId={authorId}
      newsFeeds={newsFeedsResponse.data}
      pagination={newsFeedsResponse.meta.pagination}
    />
  );
};
