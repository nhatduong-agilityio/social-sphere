'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT, CURRENT_PAGE, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { GroupRole } from '@/types';

export const inviteToGroup = async (
  groupId: number,
  userId: string,
): Promise<{ id: number }> => {
  const payload = {
    group: groupId,
    user: userId,
    role: GroupRole.MEMBER,
  };

  const { data } = await apiClient.post<{
    data: {
      id: number;
    };
  }>({
    path: API_ENDPOINT.GROUP_MEMBERS,
    body: JSON.stringify({ data: payload }),
  });

  revalidateTag(
    TAG_KEYS.GROUP_MEMBERS_BY_GROUP_ID_IN_PAGE(
      groupId.toString(),
      CURRENT_PAGE,
    ),
  );

  return data;
};
