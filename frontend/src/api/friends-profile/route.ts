// Constants
import { API_ENDPOINT, QUERY_GETS, TAG_KEYS } from '@/constants';
import { TFollowed } from '@/models';

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

export const getNonFriendListByUserId = async (userId: string) => {
  const url = `${API_ENDPOINT.RELATIONSHIP}/${QUERY_GETS.SUGGEST_FRIENDS(userId)}`;

  const response = await apiClient.get<TFollowed[]>(url, {
    next: { tags: [TAG_KEYS.SUGGEST_FRIENDS(userId)] },
  });

  return response.map((data) => ({
    ...data,
    countFriends: data.followedRelationships.length,
  }));
};
