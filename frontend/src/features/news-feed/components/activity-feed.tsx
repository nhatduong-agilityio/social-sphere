import { notFound } from 'next/navigation';

// Auth
import { auth } from '@/auth';

// Components
import { ActivityFeedContent } from './activity-feed-content';
import { NewsFeedsContext } from '../constants';

// Actions
import { getNewsFeedIds } from '../actions';

// Types
import { Pagination } from '@/types';

interface ActivityFeedProps {
  newsFeedContext?: NewsFeedsContext;
}

export const ActivityFeed = async ({ newsFeedContext }: ActivityFeedProps) => {
  const session = await auth();
  const authorId = String(session?.user?.id);

  const newsFeedIdsResponse = await getNewsFeedIds(authorId, newsFeedContext);

  const newsFeedIds = newsFeedIdsResponse.data;

  if (!newsFeedIds || !authorId) notFound();

  return (
    <ActivityFeedContent
      authorId={authorId}
      newsFeedContext={newsFeedContext}
      newsFeedIds={newsFeedIds?.data || []}
      pagination={newsFeedIds?.meta.pagination as Pagination}
    />
  );
};
