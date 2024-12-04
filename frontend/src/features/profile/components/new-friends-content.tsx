// Components
import { NewFriendsWidget } from './new-friends-widget';

// Actions
import { getFriendListByUsername } from '../actions/friends-profile';

interface NewFriendsContentProps {
  username: string;
}

export const NewFriendsContent = async ({
  username,
}: NewFriendsContentProps) => {
  const newFriends = await getFriendListByUsername(username);

  return <NewFriendsWidget friends={newFriends} />;
};
