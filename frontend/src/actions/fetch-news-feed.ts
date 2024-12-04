import { NewsFeedDetailResponse, NewsFeedIdsResponse } from '@/models';
import { NewsFeed } from '@/types';

export const fetchNewsFeedIds = async (params: {
  authorId?: string;
  groupId?: number;
  page: number;
  pageSize: number;
}): Promise<NewsFeedIdsResponse> => {
  const queryParams = new URLSearchParams();
  if (params.authorId) queryParams.append('authorId', params.authorId);
  if (params.groupId) queryParams.append('groupId', params.groupId.toString());
  queryParams.append('page', params.page.toString());
  queryParams.append('pageSize', params.pageSize.toString());

  const response = await fetch(`/api/news-feed?${queryParams}`);

  if (!response.ok) throw new Error('Failed to fetch news feed ids');

  return response.json();
};

export const fetchNewsFeedDetail = async (params: {
  newsFeedId: string;
  authorId: string;
}): Promise<NewsFeed> => {
  const response = await fetch(`/api/news-feed/${params.newsFeedId}`);

  if (!response.ok) throw new Error('Failed to fetch news feed details');

  const { data: newsFeedDetailData }: NewsFeedDetailResponse =
    await response.json();

  const transformData: NewsFeed = {
    ...newsFeedDetailData[0],
    tagFriends: [],
    sendFriends: [],
    likes: {
      likesTotal: newsFeedDetailData[0].likes?.length || 0,
      remainingLikes: Math.max(0, newsFeedDetailData[0].likes?.length - 2),
      likesRecent: newsFeedDetailData[0].likes?.slice(0, 2).map((like) => ({
        friend: like.user,
        createdAt: like.createdAt,
      })),
    },
    createdAt: newsFeedDetailData[0].createdAt,
    isLiked: newsFeedDetailData[0].likes?.some(
      (like) => Number(params.authorId) === like.user.id,
    ),
    sharedFrom: newsFeedDetailData[0].sharedFrom
      ? ({
          ...newsFeedDetailData[0].sharedFrom,
          tagFriends: [],
          sendFriends: [],
          likes: {
            likesTotal: newsFeedDetailData[0].sharedFrom.likes?.length || 0,
            remainingLikes: Math.max(
              0,
              newsFeedDetailData[0].sharedFrom.likes?.length - 2,
            ),
            likesRecent: newsFeedDetailData[0].sharedFrom.likes
              ?.slice(0, 2)
              .map((like) => ({
                friend: like.user,
                createdAt: like.createdAt,
              })),
          },
          isLiked: newsFeedDetailData[0].sharedFrom.likes?.some(
            (like) => Number(params.authorId) === like.user.id,
          ),
        } as NewsFeed)
      : undefined,
  };

  return transformData;
};
