import { API_ENDPOINT, QUERY_GET_NEWS_FEEDS } from '@/constants';
import { apiClient } from '@/services';

// Types
import { ApiDataResponse, NewsFeedsResponse } from '@/types';

export const getNewsFeeds = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<ApiDataResponse<NewsFeedsResponse>> => {
  try {
    const query = QUERY_GET_NEWS_FEEDS(userId, page, pageSize);
    const response = await apiClient.get<NewsFeedsResponse>(
      `${API_ENDPOINT.POSTS}?${query}`,
      {
        cache: 'no-store',
      },
    );

    return { data: response };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to fetch news feeds. Please try again.';
    return { error: errorMessage };
  }
};
