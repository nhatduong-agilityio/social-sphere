'use server';

import { API_ENDPOINT, TAG_KEYS } from '@/constants';
import { apiClient } from '@/services';
import { revalidateTag } from 'next/cache';

export const leaveGroupById = async (params: {
  groupId: string;
  groupMemberId: string;
  userId?: string;
  page?: number;
}) => {
  try {
    const { groupMemberId, userId, page, groupId } = params;

    await apiClient.remove(`${API_ENDPOINT.GROUP_MEMBERS}/${groupMemberId}`);

    userId &&
      page &&
      revalidateTag(TAG_KEYS.LIST_GROUPS_BY_USER_IN_PAGE(userId, page));
    revalidateTag(
      TAG_KEYS.GROUP_MEMBERS_BY_GROUP_ID_IN_PAGE(groupId, page || 1),
    );
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to leave group. Please try again.';
    return { error: errorMessage };
  }
};
