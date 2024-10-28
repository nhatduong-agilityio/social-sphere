import { MOCK_NEWS_FEED_LIST } from '@/__mocks__/news-feed';

// Types
import { ApiDataResponse, NewsFeed } from '@/types';

export const getNewsFeeds = async (): Promise<ApiDataResponse<NewsFeed[]>> => {
  try {
    return { data: MOCK_NEWS_FEED_LIST };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to fetch news feeds. Please try again.';
    return { error: errorMessage };
  }
};
