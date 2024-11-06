// Constants
import { API_ENDPOINT, QUERY_GET_FRIENDS, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { TFriends } from '@/types';

export const getFriendListByUserId = async (userId: string) => {
  const url = `${API_ENDPOINT.RELATIONSHIP}?${QUERY_GET_FRIENDS(userId)}`;

  const response = await apiClient.get<TFriends>(url, {
    next: { tags: [TAG_KEYS.RELATIONSHIP(userId)] },
  });

  return response.data.map(({ id, followed }) => ({
    id,
    followed: {
      ...followed,
      countFriends: followed.followedRelationships.length,
    },
  }));
};
