'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT, QUERY } from '@/constants';
import { ExitingLikeModel, ExitingLikeResponse } from '@/models';

// Services
import { apiClient } from '@/services';
import { ApiDataResponse } from '@/types';

type ToggleLikeNewsFeedPayload = {
  newsFeedId: number;
  userId: number;
};

const getExitingLike = async (
  newsFeedId: number,
  userId: number,
): Promise<ApiDataResponse<ExitingLikeModel[]>> => {
  try {
    const existingLikeQuery = QUERY.EXISTING_LIKE(newsFeedId, userId);
    const response = await apiClient.get<ExitingLikeResponse>(
      `${API_ENDPOINT.LIKES}?${existingLikeQuery}`,
    );

    return { data: response.data };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to get existing like a news feed. Please try again.';
    return { error: errorMessage };
  }
};

const removeExitingLike = async (likedId: string) => {
  try {
    await apiClient.remove(`${API_ENDPOINT.LIKES}/${likedId}`);
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to remove liked a news feed. Please try again.';
    return { error: errorMessage };
  }
};

export const toggleLikeNewsFeed = async (
  newsFeedId: number,
  userId: number,
) => {
  try {
    const existingLike = await getExitingLike(newsFeedId, userId);
    const existingLikeData = existingLike.data;

    if (existingLikeData && existingLikeData.length > 0) {
      await removeExitingLike(existingLikeData[0].documentId);
    } else {
      await apiClient.post<ToggleLikeNewsFeedPayload>({
        path: API_ENDPOINT.LIKES,
        body: JSON.stringify({
          data: {
            post: newsFeedId,
            user: userId,
          },
        }),
      });
    }

    revalidateTag(`news-feed-${newsFeedId}`);
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to toggle news feed like. Please try again.';
    return { error: errorMessage };
  }
};
