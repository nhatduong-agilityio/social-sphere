import { notFound } from 'next/navigation';

// Auth
import { auth } from '@/auth';

// Components
import { ActivityFeedContent } from './activity-feed-content';

// Actions
import { getNewsFeedIds } from '../actions';

export const ActivityFeed = async () => {
  const session = await auth();
  const authorId = String(session?.user?.id);

  const newsFeedIdsResponse = await getNewsFeedIds(authorId);

  if (!authorId || !newsFeedIdsResponse.data) notFound();

  return (
    <ActivityFeedContent
      authorId={authorId}
      newsFeedIdsPagination={newsFeedIdsResponse.data}
    />
  );
};
