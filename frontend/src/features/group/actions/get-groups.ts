'use server';

import { API_ENDPOINT, QUERY, TAG_KEYS } from '@/constants';
import { GroupsResponse, NewsFeedIdsResponse } from '@/models';
import { apiClient } from '@/services';

// Types
import {
  ApiDataResponse,
  GroupDetail,
  GroupMembersResponse,
  GroupsListResponse,
} from '@/types';

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

export const getGroupMembers = async (
  groupId: number,
  page: number = 1,
  pageSize: number = 10,
): Promise<ApiDataResponse<GroupMembersResponse>> => {
  try {
    const query = QUERY.GROUP_MEMBERS_BY_GROUP_ID(
      groupId.toString(),
      page,
      pageSize,
    );

    const response = await apiClient.get<GroupMembersResponse>(
      `${API_ENDPOINT.GROUP_MEMBERS}?${query}`,
      {
        next: {
          tags: [
            TAG_KEYS.GROUP_MEMBERS_BY_GROUP_ID_IN_PAGE(
              groupId.toString(),
              page,
            ),
          ],
        },
      },
    );

    return { data: response };
  } catch (error) {
    const errorMessage =
      (error as Error).message || 'Failed to fetch groups. Please try again.';
    return { error: errorMessage };
  }
};

export const getNewsFeedIdsInGroup = async (
  groupId: number,
  page: number = 1,
  pageSize: number = 10,
): Promise<ApiDataResponse<NewsFeedIdsResponse>> => {
  try {
    const query = QUERY.LATEST_NEWS_FEED_IDS_BY_GROUP_ID(
      groupId.toString(),
      page,
      pageSize,
    );
    const response = await apiClient.get<NewsFeedIdsResponse>(
      `${API_ENDPOINT.POSTS}?${query}`,
      {
        next: {
          tags: [
            TAG_KEYS.NEWS_FEED_IDS_BY_GROUP_IN_PAGE(groupId.toString(), page),
          ],
        },
      },
    );

    return { data: response };
  } catch (error) {
    const errorMessage =
      (error as Error).message ||
      'Failed to fetch news feed ids. Please try again.';
    return { error: errorMessage };
  }
};
