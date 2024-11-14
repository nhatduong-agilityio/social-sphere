'use server';

import { revalidateTag } from 'next/cache';

// Services
import { apiClient } from '@/services';

// Constants
import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';
import { TFriends } from '@/types';

export const requestAddFriends = async (authorId: string, userId: string) => {
  try {
    const url = `${API_ENDPOINT.RELATIONSHIP}?${QUERY.REJECT_FRIENDS(authorId, userId)}`;
    const friendReject = await apiClient.get<TFriends>(url);
    const userRejectFriend = friendReject.data[0];

    const payload = {
      data: {
        follower: Number(authorId),
        followed: Number(userId),
        requestStatus: 'pending',
      },
    };

    const addFriendUrl = userRejectFriend
      ? `${API_ENDPOINT.RELATIONSHIP}/${userRejectFriend.documentId}`
      : API_ENDPOINT.RELATIONSHIP;

    userRejectFriend
      ? await apiClient.put(
          addFriendUrl,
          JSON.stringify({ data: { requestStatus: 'pending' } }),
        )
      : await apiClient.post({
          path: API_ENDPOINT.RELATIONSHIP,
          body: JSON.stringify(payload),
        });
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to request add friends. Please try again.';
    return { error: errorMessage };
  }
};

export const acceptedFriend = async (
  authorId: string,
  userId: string,
  relationshipId: string,
) => {
  try {
    const url = `${API_ENDPOINT.RELATIONSHIP}/${relationshipId}`;

    const payload = {
      data: {
        followed: Number(userId),
        follower: Number(authorId),
        requestStatus: 'friends',
      },
    };

    await Promise.all([
      apiClient.post({
        path: API_ENDPOINT.RELATIONSHIP,
        body: JSON.stringify(payload),
      }),
      apiClient.put(
        url,
        JSON.stringify({ data: { requestStatus: 'friends' } }),
      ),
    ]);

    revalidateTag(TAG_KEYS.ACCEPT_FRIENDS(authorId));
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to request add friends. Please try again.';
    return { error: errorMessage };
  }
};

export const rejectedFriend = async (id: string, authorId: string) => {
  try {
    const url = `${API_ENDPOINT.RELATIONSHIP}/${id}`;

    await apiClient.put(
      url,
      JSON.stringify({ data: { requestStatus: 'rejected' } }),
    );

    revalidateTag(TAG_KEYS.ACCEPT_FRIENDS(authorId));
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to rejected friend. Please try again.';
    return { error: errorMessage };
  }
};
