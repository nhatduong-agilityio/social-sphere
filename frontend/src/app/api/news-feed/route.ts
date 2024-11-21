import { NextResponse } from 'next/server';
import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';
import { apiClient } from '@/services';
import { NewsFeedIdsResponse } from '@/models';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get('authorId');
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const query = QUERY.LATEST_NEWS_FEED_IDS_BY_AUTHOR_ID(
    authorId!,
    Number(page!),
    Number(pageSize!),
  );
  const response = await apiClient.get<NewsFeedIdsResponse>(
    `${API_ENDPOINT.POSTS}?${query}`,
    {
      next: {
        tags: [
          TAG_KEYS.NEWS_FEED_IDS_BY_USER_IN_PAGE(authorId!, Number(page!)),
        ],
      },
    },
  );

  return NextResponse.json(response);
};
