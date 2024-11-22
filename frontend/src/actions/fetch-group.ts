import { GroupMembersResponse, GroupsListResponse } from '@/types';

export const fetchGroups = async (params: {
  authorId: string;
  page: number;
  pageSize: number;
}): Promise<GroupsListResponse> => {
  const queryParams = new URLSearchParams();
  if (params.authorId) queryParams.append('authorId', params.authorId);
  queryParams.append('page', params.page.toString());
  queryParams.append('pageSize', params.pageSize.toString());

  const response = await fetch(`/api/group?${queryParams}`);

  if (!response.ok) throw new Error('Failed to fetch groups');

  return response.json();
};

export const fetchGroupMembers = async (params: {
  groupId: number;
  page: number;
  pageSize: number;
}): Promise<GroupMembersResponse> => {
  const queryParams = new URLSearchParams();
  if (params.groupId) queryParams.append('groupId', params.groupId.toString());
  queryParams.append('page', params.page.toString());
  queryParams.append('pageSize', params.pageSize.toString());

  const response = await fetch(`/api/group-members?${queryParams}`);

  if (!response.ok) throw new Error('Failed to fetch group members');

  return response.json();
};
