import { auth } from '@/auth';

// Actions
import { getAcceptFriendListByUserId } from '@/features/friend/actions';

// Components
import { AcceptFriendsWidget } from './accept-friends-widget';

export const AcceptFriendsContent = async () => {
  const session = await auth();
  const authorId = String(session?.user?.id);
  const acceptFriends = await getAcceptFriendListByUserId(authorId);

  return (
    acceptFriends.length > 0 && (
      <AcceptFriendsWidget friends={acceptFriends} authorId={authorId} />
    )
  );
};
