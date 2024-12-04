'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT, QUERY } from '@/constants';

// Services
import { apiClient } from '@/services';

type ToggleLikeNewsFeedPayload = {
  newsFeedId: number;
  userId: number;
};

export const toggleLikeNewsFeed = async (
  newsFeedId: number,
  userId: number,
) => {
  try {
    await apiClient.post<ToggleLikeNewsFeedPayload>({
      path: `${API_ENDPOINT.LIKES}${QUERY.TOGGLE_LIKE}`,
      body: JSON.stringify({
        data: {
          post: newsFeedId,
          user: userId,
        },
      }),
    });

    revalidateTag(`news-feed-${newsFeedId}`);
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to toggle news feed like. Please try again.';
    return { error: errorMessage };
  }
};
