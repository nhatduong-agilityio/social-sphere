import { ListCommentsResponse } from '@/models';

export const fetchNewsFeedComments = async (params: {
  newsFeedId: string;
  page: number;
  pageSize: number;
}): Promise<ListCommentsResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append('page', params.page.toString());
  queryParams.append('pageSize', params.pageSize.toString());

  const response = await fetch(
    `/api/comment/${params.newsFeedId}?${queryParams}`,
  );

  if (!response.ok) throw new Error('Failed to fetch comments');

  return response.json();
};
