'use server';

import { notFound } from 'next/navigation';
import { revalidateTag } from 'next/cache';

// Constants
import { API_ENDPOINT, TAG_KEYS } from '@/constants';

// Services
import { apiClient } from '@/services';

// Types
import { UserDetail } from '@/types';

// Actions
import { getProfile } from './get-profile';

export const updateProfile = async (data: UserDetail): Promise<UserDetail> => {
  const { id } = await getProfile();

  const url = `${API_ENDPOINT.USERS}/${id}`;

  const profile = await apiClient.put<UserDetail>(url, JSON.stringify(data));

  if (!profile) return notFound();

  revalidateTag(TAG_KEYS.USER_ID(id));

  return profile;
};
