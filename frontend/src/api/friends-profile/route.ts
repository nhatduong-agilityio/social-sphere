// Constants
import { API_ENDPOINT, QUERY_GETS, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { TFriends } from '@/types';

export const getFriendListByUsername = async (username: string) => {
  const url = `${API_ENDPOINT.RELATIONSHIP}?${QUERY_GETS.FRIENDS(username)}`;

  const response = await apiClient.get<TFriends>(url, {
    next: { tags: [TAG_KEYS.RELATIONSHIP(username)] },
  });

  return response.data.map(({ id, followed }) => ({
    id,
    followed: {
      ...followed,
      countFriends: followed.followedRelationships.length,
    },
  }));
};
