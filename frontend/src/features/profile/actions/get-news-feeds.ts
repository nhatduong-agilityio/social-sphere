// Services
import { apiClient } from '@/services';

// Models
import { NewsFeedIdsResponse } from '@/models';

// Constants
import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';

// Types
import { ApiDataResponse } from '@/types';

export const getNewsFeedIds = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<ApiDataResponse<NewsFeedIdsResponse>> => {
  try {
    const query = QUERY.LATEST_NEWS_FEED_IDS_BY_AUTHOR_ID(
      userId,
      page,
      pageSize,
    );
    const response = await apiClient.get<NewsFeedIdsResponse>(
      `${API_ENDPOINT.POSTS}?${query}`,
      {
        next: {
          tags: [TAG_KEYS.NEWS_FEED_IDS_BY_USER_IN_PAGE(userId, page)],
        },
      },
    );

    return { data: response };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to fetch news feed ids. Please try again.';
    return { error: errorMessage };
  }
};
