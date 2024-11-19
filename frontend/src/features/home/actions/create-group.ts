'use server';

// Constants
import { API_ENDPOINT } from '@/constants';

// Services
import { apiClient } from '@/services';
import { upload } from '@/services';

// Types
import { GroupModel, GroupPayload } from '@/models';
import { ActionState } from '@/types';

export const createGroup = async (
  authorId: number,
  prevState: ActionState<GroupModel>,
  formData: FormData,
): Promise<ActionState<GroupModel>> => {
  try {
    if (!authorId) {
      return {
        message: null,
        error:
          'Authentication Required. You must be logged in to create a post',
      };
    }

    const name = formData.get('name') as string;
    const avatar = formData.get('avatar') as File;
    const description = formData.get('description') as string;

    let payload: GroupPayload = {
      name,
      description,
      isPrivate: true,
      createdUser: authorId,
    };

    if (avatar) {
      const imageUrl = await upload(avatar);
      payload = {
        ...payload,
        avatar: imageUrl,
      };
    }

    const { data: response } = await apiClient.post<{ data: GroupModel }>({
      path: API_ENDPOINT.GROUPS,
      body: JSON.stringify({ data: payload }),
    });

    return {
      data: response,
      message: 'Group created successfully',
      error: null,
    };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to create a group. Please try again.';
    return { error: errorMessage };
  }
};
