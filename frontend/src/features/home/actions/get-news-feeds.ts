import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';
import { NewsFeedIdsResponse, NewsFeedListResponse } from '@/models';
import { apiClient } from '@/services';

// Types
import { ApiDataResponse, NewsFeed, NewsFeedsResponse } from '@/types';

export const getNewsFeeds = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<ApiDataResponse<NewsFeedsResponse>> => {
  try {
    const query = QUERY.NEWS_FEEDS(userId, page, pageSize);
    const response = await apiClient.get<NewsFeedListResponse>(
      `${API_ENDPOINT.POSTS}?${query}`,
      {
        cache: 'no-store',
      },
    );

    const transformApiResponse: NewsFeed[] = response.data.map((item) => ({
      ...item,
      tagFriends: [],
      sendFriends: [],
      likes: {
        likesTotal: item.likes.length,
        remainingLikes: Math.max(0, item.likes.length - 2),
        likesRecent: item.likes.slice(0, 2).map((like) => ({
          friend: like.user,
          createdAt: like.createdAt,
        })),
      },
      createdAt: item.createdAt,
      isLiked: item.likes.some((like) => Number(userId) === like.user.id),
      sharedFrom: undefined,
    }));

    return { data: { ...response, data: transformApiResponse } };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to fetch news feeds. Please try again.';
    return { error: errorMessage };
  }
};

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
