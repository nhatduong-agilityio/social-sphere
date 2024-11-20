'use server';

import { notFound } from 'next/navigation';
import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { GroupDetail } from '@/types';

export const updateGroupBanner = async (
  groupId: string,
  banner: string,
): Promise<GroupDetail> => {
  const url = `${API_ENDPOINT.GROUPS}/${groupId}`;

  const { data: groupDetail } = await apiClient.put<{ data: GroupDetail }>(
    url,
    JSON.stringify({ data: { banner } }),
  );

  if (!groupDetail) return notFound();

  revalidateTag(TAG_KEYS.GROUP_DETAIL_BY_GROUP_NAME(groupDetail.name));

  return groupDetail;
};
