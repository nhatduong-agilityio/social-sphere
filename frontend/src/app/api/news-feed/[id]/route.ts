import { NextResponse } from 'next/server';
import { API_ENDPOINT, QUERY } from '@/constants';
import { apiClient } from '@/services';
import { NewsFeedDetailResponse } from '@/models';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const query = QUERY.NEWS_FEED_DETAIL_BY_ID(params.id);
  const response = await apiClient.get<NewsFeedDetailResponse>(
    `${API_ENDPOINT.POSTS}?${query}`,
    {
      next: { tags: [`news-feed-${params.id}`] },
    },
  );

  return NextResponse.json(response);
};
