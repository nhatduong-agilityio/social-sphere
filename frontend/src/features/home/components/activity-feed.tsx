import { notFound } from 'next/navigation';

// Components
import { ActivityFeedContent } from './activity-feed-content';

// Actions
import { getNewsFeedIds, getGroups } from '../actions';

// Auth
import { auth } from '@/auth';

// Api
import {
  getAcceptFriendListByUserId,
  getNonFriendListByUserId,
} from '@/api/friends-profile/route';

// Types
import { Pagination } from '@/types';
import { TFollower } from '@/models';

export const ActivityFeed = async () => {
  const session = await auth();
  const authorId = session?.user?.id;
  const userId = session?.user?.id || '';

  const [
    newsFeedIdsResponse,
    suggestFriendsResponse,
    acceptFriendsResponse,
    groupsResponse,
  ] = await Promise.all([
    getNewsFeedIds(userId),
    getNonFriendListByUserId(userId),
    getAcceptFriendListByUserId(userId),
    getGroups(userId),
  ]);

  const newsFeedIds = newsFeedIdsResponse.data;

  if (!newsFeedIdsResponse || !authorId) notFound();

  return (
    <ActivityFeedContent
      authorId={authorId}
      suggestFriends={suggestFriendsResponse}
      acceptFriends={acceptFriendsResponse as TFollower[]}
      newsFeedIds={newsFeedIds?.data || []}
      pagination={newsFeedIds?.meta.pagination as Pagination}
      groups={groupsResponse.data}
    />
  );
};
