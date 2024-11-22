import { NextResponse } from 'next/server';

// Constants
import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Models
import { GroupMembersResponse } from '@/types';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const groupId = searchParams.get('groupId');
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  const query = QUERY.GROUP_MEMBERS_BY_GROUP_ID(
    groupId!,
    Number(page),
    Number(pageSize),
  );

  const response = await apiClient.get<GroupMembersResponse>(
    `${API_ENDPOINT.GROUP_MEMBERS}?${query}`,
    {
      next: {
        tags: [
          TAG_KEYS.GROUP_MEMBERS_BY_GROUP_ID_IN_PAGE(groupId!, Number(page)),
        ],
      },
    },
  );

  return NextResponse.json(response);
};
