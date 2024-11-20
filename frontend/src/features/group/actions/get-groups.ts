'use server';

import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';
import { GroupsResponse } from '@/models';
import { apiClient } from '@/services';

// Types
import { ApiDataResponse, GroupDetail, GroupsListResponse } from '@/types';

export const getGroups = async (
  userId: string,
  searchName?: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<ApiDataResponse<GroupsListResponse>> => {
  try {
    const query = QUERY.GROUPS(userId, searchName, page, pageSize);

    const response = await apiClient.get<GroupsResponse>(
      `${API_ENDPOINT.GROUPS}?${query}`,
      {
        next: {
          tags: [TAG_KEYS.LIST_GROUPS_BY_USER_IN_PAGE(userId, page)],
        },
      },
    );

    const transformApiResponse: GroupDetail[] = response.data.map((item) => ({
      ...item,
      members: item.groupMembers,
      author: item.createdUser,
      newsFeeds: item.posts,
    }));

    return { data: { ...response, data: transformApiResponse } };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to fetch groups. Please try again.';
    return { error: errorMessage };
  }
};

export const getGroupByName = async (
  groupName: string,
): Promise<ApiDataResponse<GroupDetail>> => {
  try {
    const query = QUERY.GROUP_DETAIL_BY_NAME(groupName);

    const response = await apiClient.get<GroupsResponse>(
      `${API_ENDPOINT.GROUPS}?${query}`,
      {
        next: {
          tags: [TAG_KEYS.GROUP_DETAIL_BY_GROUP_NAME(groupName)],
        },
      },
    );

    const transformApiResponse: GroupDetail = {
      ...response.data[0],
      members: response.data[0].groupMembers,
      author: response.data[0].createdUser,
      newsFeeds: response.data[0].posts,
    };

    return { data: transformApiResponse };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to fetch group detail. Please try again.';
    return { error: errorMessage };
  }
};
