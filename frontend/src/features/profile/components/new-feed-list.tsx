import { notFound } from 'next/navigation';

// Components
import { NewFeedContent } from './new-feed-content';

// Api

// Types
import { Pagination, TNewFriends } from '@/types';

// Actions
import { getNewsFeedIds } from '../actions';
import { getFriendListByUsername } from '../actions/friends-profile';

interface NewFeedListProps {
  username: string;
  authorId: string;
}

export const NewFeedList = async ({ authorId, username }: NewFeedListProps) => {
  const [newsFeedIdsResponse, newFriendsResponse] = await Promise.all([
    getNewsFeedIds(authorId),
    getFriendListByUsername(username),
  ]);

  const newsFeedIds = newsFeedIdsResponse.data;

  if (!newsFeedIds || !authorId) notFound();

  return (
    <NewFeedContent
      authorId={authorId}
      newFriends={newFriendsResponse as unknown as TNewFriends[]}
      newsFeedIds={newsFeedIds?.data || []}
      pagination={newsFeedIds?.meta.pagination as Pagination}
    />
  );
};
