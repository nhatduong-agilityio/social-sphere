'use server';

import { notFound } from 'next/navigation';
import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';
import { upload } from '@/services';

// Types
import { GroupDetail, ActionState } from '@/types';

export const updateGroup = async (
  groupId: string,
  data: GroupDetail,
): Promise<GroupDetail> => {
  const url = `${API_ENDPOINT.GROUPS}${QUERY.UPDATE_GROUP_BY_GROUP_ID(groupId)}`;

  const { data: groupDetail } = await apiClient.put<{ data: GroupDetail }>(
    url,
    JSON.stringify({ data }),
  );

  if (!groupDetail) return notFound();

  revalidateTag(TAG_KEYS.GROUP_DETAIL_BY_GROUP_NAME(groupDetail.name));

  return groupDetail;
};

export const updateGroupAction = async (
  {
    groupId,
    prevData,
  }: {
    groupId: string;
    prevData: GroupDetail;
  },
  prevState: ActionState<GroupDetail>,
  formData: FormData,
): Promise<ActionState<GroupDetail>> => {
  try {
    const name = formData.get('name') as string;
    const avatar = formData.get('avatar') as File;
    const description = formData.get('description') as string;

    let payload = {
      name,
      description,
    } as GroupDetail;

    if (avatar) {
      const imageUrl = await upload(avatar);
      payload = {
        ...payload,
        avatar: imageUrl,
      };
    }

    const url = `${API_ENDPOINT.GROUPS}${QUERY.UPDATE_GROUP_BY_GROUP_ID(groupId)}`;

    const { data: response } = await apiClient.put<{ data: GroupDetail }>(
      url,
      JSON.stringify({ data: payload }),
    );

    if (prevData.name === response.name) {
      revalidateTag(TAG_KEYS.GROUP_DETAIL_BY_GROUP_NAME(response.name));
    }

    return {
      data: response,
      message: 'Group updated successfully',
      error: null,
    };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to create a group. Please try again.';
    return { error: errorMessage };
  }
};
