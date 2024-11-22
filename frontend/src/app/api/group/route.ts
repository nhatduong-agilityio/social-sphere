import { NextResponse } from 'next/server';

// Constants
import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Models
import { GroupsResponse } from '@/models';
import { GroupDetail } from '@/types';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const authorId = searchParams.get('authorId');
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const searchName = searchParams.get('searchName') || undefined;

  const query = QUERY.GROUPS(
    authorId!,
    searchName,
    Number(page),
    Number(pageSize),
  );

  const response = await apiClient.get<GroupsResponse>(
    `${API_ENDPOINT.GROUPS}?${query}`,
    {
      next: {
        tags: [TAG_KEYS.LIST_GROUPS_BY_USER_IN_PAGE(authorId!, Number(page))],
      },
    },
  );

  const transformApiResponse: GroupDetail[] = response.data.map((item) => ({
    ...item,
    members: item.groupMembers,
    author: item.createdUser,
    newsFeeds: item.posts,
  }));

  return NextResponse.json({ ...response, data: transformApiResponse });
};
