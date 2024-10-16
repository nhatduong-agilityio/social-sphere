import { getFriends } from './get-friends';

export const getTaggedFriends = async (friendIds: string[]) => {
  const { data: allFriends } = await getFriends();

  if (!allFriends) return [];
  return allFriends.filter((friend) => friendIds.includes(friend.id));
};
