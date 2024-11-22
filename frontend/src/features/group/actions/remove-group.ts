'use server';

import { API_ENDPOINT, TAG_KEYS } from '@/constants';
import { apiClient } from '@/services';
import { revalidateTag } from 'next/cache';

export const removeGroupById = async (params: {
  groupId: string;
  groupName?: string;
  userId?: string;
  page?: number;
}) => {
  try {
    const { groupId, userId, groupName, page } = params;

    await apiClient.remove(`${API_ENDPOINT.GROUPS}/${groupId}`);

    userId &&
      page &&
      revalidateTag(TAG_KEYS.LIST_GROUPS_BY_USER_IN_PAGE(userId, page));
    groupName && revalidateTag(TAG_KEYS.GROUP_DETAIL_BY_GROUP_NAME(groupName));
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to remove group. Please try again.';
    return { error: errorMessage };
  }
};
