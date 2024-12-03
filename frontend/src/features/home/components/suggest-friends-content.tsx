import { auth } from '@/auth';

// Actions
import { getNonFriendListByUserId } from '@/features/profile/actions/friends-profile';

// Components
import { SuggestFriendsWidget } from './suggest-friends-widget';

export const SuggestFriendsContent = async () => {
  const session = await auth();
  const authorId = String(session?.user?.id);

  const suggestFriends = await getNonFriendListByUserId(authorId);

  return (
    <SuggestFriendsWidget authorId={authorId} suggestFriends={suggestFriends} />
  );
};
