import { NewsFeedDetailResponse, NewsFeedIdsResponse } from '@/models';
import { fetchNewsFeedComments } from './fetch-comment';
import { CURRENT_PAGE, PAGE_SIZE } from '@/constants';
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
}): Promise<NewsFeedDetailResponse> => {
  const response = await fetch(`/api/news-feed/${params.newsFeedId}`);

  if (!response.ok) throw new Error('Failed to fetch news feed details');

  return response.json();
};

export const fetchNewsFeedDetailAndComments = async (params: {
  newsFeedId: string;
  authorId: string;
}): Promise<NewsFeed> => {
  const [newsFeedDetailResponse, newsFeedCommentsResponse] = await Promise.all([
    fetchNewsFeedDetail({ newsFeedId: params.newsFeedId }),
    fetchNewsFeedComments({
      newsFeedId: params.newsFeedId,
      page: CURRENT_PAGE,
      pageSize: PAGE_SIZE,
    }),
  ]);

  const { data: newsFeedDetailData }: NewsFeedDetailResponse =
    newsFeedDetailResponse;

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
    comments: {
      ...newsFeedCommentsResponse,
      commentTotal: newsFeedCommentsResponse.data.reduce((acc, comment) => {
        // Count the comment itself
        let count = 1;
        // Add the number of replies
        count += comment.replies?.length || 0;
        return acc + count;
      }, 0),
      data: newsFeedCommentsResponse.data.map((comment) => ({
        ...comment,
        isOwner: Number(params.authorId) === comment.friend.id,
        reply: comment.replies?.map((reply) => ({
          ...reply,
          isOwner: Number(params.authorId) === reply.friend.id,
          tagFriends: [],
          likes: {
            likesTotal: reply.likes?.length || 0,
            likesRecent: reply.likes?.slice(0, 2).map((like) => ({
              friend: like.user,
              createdAt: like.createdAt,
            })),
          },
        })),
        tagFriends: [],
        likes: {
          likesTotal: comment.likes?.length || 0,
          likesRecent: comment.likes?.slice(0, 2).map((like) => ({
            friend: like.user,
            createdAt: like.createdAt,
          })),
        },
      })),
    },
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
