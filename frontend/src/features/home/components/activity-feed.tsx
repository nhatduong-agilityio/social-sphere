import { notFound } from 'next/navigation';

// Components
import { ActivityFeedContent } from './activity-feed-content';

// Actions
import { getNewsFeedIds } from '../actions/get-news-feeds';

// Auth
import { auth } from '@/auth';

// Api
import { getNonFriendListByUserId } from '@/api/friends-profile/route';

// Types
import { Pagination } from '@/types';

export const ActivityFeed = async () => {
  const session = await auth();
  const authorId = session?.user?.id;
  const userId = session?.user?.id || '';

  const [newsFeedIdsResponse, suggestFriendsResponse] = await Promise.all([
    getNewsFeedIds(userId),
    getNonFriendListByUserId(userId),
  ]);

  const newsFeedIds = newsFeedIdsResponse.data;

  if (!newsFeedIdsResponse || !authorId) notFound();

  return (
    <ActivityFeedContent
      authorId={authorId}
      suggestFriends={suggestFriendsResponse}
      newsFeedIds={newsFeedIds?.data || []}
      pagination={newsFeedIds?.meta.pagination as Pagination}
    />
  );
};
