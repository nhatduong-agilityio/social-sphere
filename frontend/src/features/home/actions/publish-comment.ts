'use server';

// Constants
import { API_ENDPOINT } from '@/constants';

// Services
import { apiClient } from '@/services';
import { upload } from '@/services';

// Models
import { CommentFormValues } from '../hooks';

// Types
import { CommentPayload } from '@/models';
import { ActionState } from '@/types';

export const createComment = async (data: CommentPayload) => {
  try {
    await apiClient.post<CommentPayload>({
      path: API_ENDPOINT.COMMENTS,
      body: JSON.stringify({ data }),
    });
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to create a comment. Please try again.';
    return { error: errorMessage };
  }
};

const createPayload = (
  currentPayload: CommentPayload,
  imageUrl?: string,
): CommentPayload => ({
  ...currentPayload,
  media: imageUrl || '',
});

export const publishComment = async (
  newsDeed: {
    id: number;
    authorId: number;
    commentId?: number;
  },
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const { id, authorId, commentId } = newsDeed;

    if (!authorId) {
      return {
        message: null,
        error:
          'Authentication Required. You must be logged in to publish a comment.',
      };
    }

    const content = formData.get('content') as string;
    const media = formData.get('media') as File;
    const tagFriends = formData.getAll('tagFriends') as string[];

    const formValues: CommentFormValues = {
      content,
      media,
      tagFriends,
    };

    let payload: CommentPayload = {
      friend: authorId,
      post: id,
      parent: commentId,
      ...formValues,
      media: '',
    };

    if (media) {
      const imageUrl = await upload(media);
      payload = createPayload(payload, imageUrl);
    } else {
      payload = createPayload(payload);
    }

    await createComment(payload);

    return {
      message: 'Comment published successfully',
      error: null,
    };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to publish a comment. Please try again.';
    return { error: errorMessage };
  }
};
