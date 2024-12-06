import { NextResponse } from 'next/server';

// Constants
import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';
import { NewsFeedsContext } from '@/features/news-feed/constants';

// Services
import { apiClient } from '@/services';

// Models
import { NewsFeedIdsResponse } from '@/models';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get('authorId');
  const groupId = searchParams.get('groupId');
  const context = searchParams.get('context') as NewsFeedsContext;
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const queryMap = {
    authorId: () =>
      QUERY.LATEST_NEWS_FEED_IDS_BY_AUTHOR_ID(
        authorId!,
        context,
        Number(page),
        Number(pageSize),
      ),
    groupId: () =>
      QUERY.LATEST_NEWS_FEED_IDS_BY_GROUP_ID(
        groupId!,
        Number(page),
        Number(pageSize),
      ),
  };
  const tagKeyMap = {
    authorId: () =>
      TAG_KEYS.NEWS_FEED_IDS_BY_USER_IN_PAGE(authorId!, Number(page)),
    groupId: () =>
      TAG_KEYS.NEWS_FEED_IDS_BY_GROUP_IN_PAGE(groupId!, Number(page)),
  };

  const queryType = authorId ? 'authorId' : 'groupId';
  const query = queryMap[queryType]();
  const tagKey = tagKeyMap[queryType]();

  const response = await apiClient.get<NewsFeedIdsResponse>(
    `${API_ENDPOINT.POSTS}?${query}`,
    {
      next: {
        tags: [tagKey],
      },
    },
  );

  return NextResponse.json(response);
};
