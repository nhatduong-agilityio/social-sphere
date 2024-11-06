// Constants
import { API_ENDPOINT, QUERY_GETS, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { TNewsFeedPhotos } from '@/types';

export const getPhotoListByUserId = async (userId: string) => {
  const url = `${API_ENDPOINT.POSTS}?${QUERY_GETS.PHOTOS(userId)}`;

  const response = await apiClient.get<TNewsFeedPhotos>(url, {
    next: { tags: [TAG_KEYS.POST_BY_USER(userId)] },
  });

  return response.data.filter(({ media }) => media);
};
