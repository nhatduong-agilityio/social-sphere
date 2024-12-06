'use server';

// Constants
import { API_ENDPOINT, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';
import { upload } from '@/services';

// Models
import { ComposeFeedFormValues } from '../hooks';

// Types
import { NewsFeedPayload } from '@/models';
import { ActionState, NewsFeed } from '@/types';
import { revalidateTag } from 'next/cache';

const createPayload = (
  values: ComposeFeedFormValues,
  userId: string,
  imageUrl?: string,
): NewsFeedPayload => ({
  author: userId,
  ...values,
  media: imageUrl || '',
});

export const publishNewsFeed = async (
  authorId: string | undefined,
  prevState: ActionState<NewsFeed>,
  formData: FormData,
): Promise<ActionState<NewsFeed>> => {
  try {
    if (!authorId) {
      return {
        message: null,
        error:
          'Authentication Required. You must be logged in to create a post',
      };
    }

    const content = formData.get('content') as string;
    const media = formData.get('media') as File;
    const accessItems = formData.getAll('accessItems') as string[];
    const activityRole = formData.get('activityRole') as string;
    const storyRole = formData.get('storyRole') as string;
    const gifUrl = formData.get('gifUrl') as string;
    const tagFriends = formData.getAll('tagFriends') as string[];
    const mood = {
      title: formData.get('mood.title') as string,
      content: formData.get('mood.content') as string,
    };
    const sharedLink = formData.get('sharedLink') as string;
    const location = formData.get('location') as string;
    const sendFriends = formData.getAll('sendFriends') as string[];

    let payload: NewsFeedPayload;
    const formValues: ComposeFeedFormValues = {
      content,
      media,
      accessItems,
      activityRole,
      storyRole,
      gifUrl,
      tagFriends,
      mood,
      sharedLink,
      location,
      sendFriends,
    };

    if (media) {
      const imageUrl = await upload(media);
      payload = createPayload(formValues, authorId, imageUrl);
    } else {
      payload = createPayload(formValues, authorId);
    }

    const { data: response } = await apiClient.post<{ data: NewsFeed }>({
      path: API_ENDPOINT.POSTS,
      body: JSON.stringify({ data: payload }),
    });

    revalidateTag(TAG_KEYS.NEWS_FEED_IDS_BY_USER_IN_PAGE(authorId, 1));

    return {
      data: response,
      message: 'News feed published successfully',
      error: null,
    };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to publish a news feed. Please try again.';
    return { error: errorMessage };
  }
};
