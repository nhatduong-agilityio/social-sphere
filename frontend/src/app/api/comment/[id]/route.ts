import { NextResponse } from 'next/server';
import {
  API_ENDPOINT,
  GET_LIST_COMMENTS_IN_NEWSFEED_BY_ID,
  TAG_KEYS,
} from '@/constants';
import { apiClient } from '@/services';
import { ListCommentsResponse } from '@/models';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const query = GET_LIST_COMMENTS_IN_NEWSFEED_BY_ID(
    params.id,
    Number(page!),
    Number(pageSize!),
  );
  const response = await apiClient.get<ListCommentsResponse>(
    `${API_ENDPOINT.COMMENTS}?${query}`,
    {
      next: {
        tags: [TAG_KEYS.LIST_COMMENTS_IN_NEWSFEED_BY_ID_IN_PAGE(params.id, 1)],
      },
    },
  );

  return NextResponse.json(response);
};
