'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
} from 'react';
import { CURRENT_PAGE, PAGE_SIZE } from '@/constants';
import { fetchNewsFeedComments } from '@/actions';
import { ListCommentsResponse } from '@/models';
import { NewsFeedComment } from '@/types';

export const useNewsFeedComments = (
  newsFeedId: string,
  authorId: string,
  initialData?: ListCommentsResponse,
) => {
  const [listComments, setListComments] = useState<NewsFeedComment[]>([]);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
  const [hasMore, setHasMore] = useState(
    currentPage < (initialData ? initialData.meta.pagination.pageCount : 1),
  );

  const transformData = useCallback(
    (initialData: ListCommentsResponse): NewsFeedComment[] =>
      initialData.data.map((comment) => ({
        ...comment,
        isOwner: Number(authorId) === comment.friend.id,
        reply: comment.replies?.map((reply) => ({
          ...reply,
          isOwner: Number(authorId) === reply.friend.id,
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
    [authorId],
  );

  const commentTotal = useMemo(() => {
    if (!initialData) return 0;

    // Get total items from pagination metadata
    const totalItems = initialData.meta.pagination.total;

    // Calculate total comments including replies for all pages
    return (
      initialData.data.reduce((acc, comment) => {
        // Count the comment itself
        let count = 1;
        // Add the number of replies
        count += comment.replies?.length || 0;
        return acc + count;
      }, 0) +
      (totalItems - initialData.data.length)
    );
  }, [initialData]);

  useEffect(() => {
    const dataTransformed = initialData ? transformData(initialData) : [];

    setListComments(dataTransformed);
  }, [initialData, transformData]);

  const loadListComments = async () => {
    const nextPage = currentPage + 1;
    const response = await fetchNewsFeedComments({
      newsFeedId,
      page: nextPage,
      pageSize: PAGE_SIZE,
    });

    const dataTransformed = transformData(response);

    setListComments((prev) => [...prev, ...dataTransformed]);
    setCurrentPage(nextPage);
    setHasMore(nextPage < response.meta.pagination.pageCount);
  };

  const [optimisticState, addOptimisticState] = useOptimistic(
    {
      comments: listComments,
      commentTotal,
    },
    (
      state,
      {
        newComment,
        commentReplyId,
      }: { newComment: NewsFeedComment; commentReplyId?: number },
    ) => {
      // Check if this is a reply to an existing comment
      if (commentReplyId) {
        const updatedComments = state.comments.map((comment) => {
          if (comment.id === commentReplyId) {
            return {
              ...comment,
              reply: [...(comment.reply || []), newComment],
            };
          }
          return comment;
        });

        return {
          comments: updatedComments,
          commentTotal: state.commentTotal + 1,
        };
      }

      // If not a reply, add as new comment
      return {
        comments: [newComment, ...state.comments],
        commentTotal: state.commentTotal + 1,
      };
    },
  );

  return {
    listComments: optimisticState.comments,
    commentTotal: optimisticState.commentTotal,
    hasMore,
    loadListComments,
    onAddOptimisticComment: addOptimisticState,
  };
};
