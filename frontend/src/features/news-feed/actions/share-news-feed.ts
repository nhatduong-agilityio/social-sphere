'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { SharePayload } from '@/models';
import { ActionState, ShareTypeOption } from '@/types';
import { determineShareType } from '../utils';

export const shareNewFeeds = async (
  newsDeed: {
    id: number;
    authorId: number;
  },
  prevState: ActionState<SharePayload>,
  formData: FormData,
): Promise<ActionState<SharePayload>> => {
  try {
    const { id, authorId } = newsDeed;

    if (!authorId) {
      return {
        message: null,
        error:
          'Authentication Required. You must be logged in to share a news feed.',
      };
    }

    const content = formData.get('content')?.toString();
    const tagFriends = formData.getAll('tagFriends') as string[];
    const location = formData.get('location')?.toString();
    const activityRole = formData.get('activityRole')?.toString();
    const friendsFeed = formData.get('friendsFeed')?.toString();
    const group = formData.get('group')?.toString();
    const page = formData.get('page')?.toString();
    const friendsMessage = formData.get('friendsMessage')?.toString();

    // Determine shareType based on provided values
    const shareType: ShareTypeOption = determineShareType(
      friendsFeed,
      group,
      page,
      friendsMessage,
    );

    const payload: SharePayload = {
      postId: id,
      userId: authorId,
      content,
      tagFriends,
      location,
      activityRole,
      group: group ? parseInt(group) : undefined,
      friendsFeed: friendsFeed ? parseInt(friendsFeed) : undefined,
      page: page ? parseInt(page) : undefined,
      friendsMessage: friendsMessage ? parseInt(friendsMessage) : undefined,
      shareType,
    };

    const { data: response } = await apiClient.post<{ data: SharePayload }>({
      path: `${API_ENDPOINT.SHARES}${QUERY.CREATE_SHARE}`,
      body: JSON.stringify({ data: payload }),
    });

    group && revalidateTag(TAG_KEYS.NEWS_FEED_IDS_BY_GROUP_IN_PAGE(group, 1));

    return {
      data: response,
      message: 'Shared successfully',
      error: null,
    };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to share a news feed. Please try again.';
    return { error: errorMessage };
  }
};
