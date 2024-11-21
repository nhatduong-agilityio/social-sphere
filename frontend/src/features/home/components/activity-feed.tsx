// Components
import { ActivityFeedContent } from './activity-feed-content';

// Actions
import { getNewsFeedIds } from '../actions';
import { getGroups } from '@/features/group/actions';

// Api
import {
  getAcceptFriendListByUserId,
  getNonFriendListByUserId,
} from '@/api/friends-profile/route';

// Types
import { TFollower } from '@/models';

interface ActivityFeedProps {
  authorId: string;
}

export const ActivityFeed = async ({ authorId }: ActivityFeedProps) => {
  const [
    newsFeedIdsResponse,
    suggestFriendsResponse,
    acceptFriendsResponse,
    groupsResponse,
  ] = await Promise.all([
    getNewsFeedIds(authorId),
    getNonFriendListByUserId(authorId),
    getAcceptFriendListByUserId(authorId),
    getGroups(authorId),
  ]);

  return (
    <ActivityFeedContent
      authorId={authorId}
      suggestFriends={suggestFriendsResponse}
      acceptFriends={acceptFriendsResponse as TFollower[]}
      newsFeedIdsPagination={newsFeedIdsResponse.data}
      groups={groupsResponse.data}
    />
  );
};
