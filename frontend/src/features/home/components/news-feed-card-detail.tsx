'use client';

import { useCallback, useEffect, useState } from 'react';

// Components
import { NewsFeedCard } from './news-feed-card';

// Models
import {
  CommentPayload,
  ListCommentsResponse,
  NewsFeedDetailResponse,
  SharePayload,
} from '@/models';
import { ActionState, NewsFeed } from '@/types';

// Actions
import { publishComment, shareNewFeeds, toggleLikeNewsFeed } from '../actions';
import { useFormState } from 'react-dom';
import { useCommentReplyStore } from '../stores';
import { toast } from '@/hooks';

interface NewsFeedCardDetailProps {
  newsFeedId: string;
  authorId: string;
}

const initialCommentState: ActionState<CommentPayload> = {
  message: null,
  error: null,
};

const initialShareState: ActionState<SharePayload> = {
  message: null,
  error: null,
};

export const NewsFeedCardDetail = ({
  newsFeedId,
  authorId,
}: NewsFeedCardDetailProps) => {
  const [newsFeed, setNewsFeed] = useState<NewsFeed | null>(null);
  const [commentReplyValue, clearCommentReply] = useCommentReplyStore(
    (state) => [state.commentReplyValue, state.clearCommentReply],
  );

  // Management server action to publish comment
  const [_, formAction] = useFormState(
    publishComment.bind(null, {
      id: Number(newsFeedId),
      authorId: Number(authorId),
      commentId: commentReplyValue.commentId,
    }),
    initialCommentState,
  );
  const [shareState, shareAction] = useFormState(
    shareNewFeeds.bind(null, {
      id: Number(newsFeedId),
      authorId: Number(authorId),
    }),
    initialShareState,
  );

  const fetchNewsFeed = useCallback(async () => {
    const response = await fetch(`/api/news-feed/${newsFeedId}`);
    const commentResponse = await fetch(
      `/api/comment/${newsFeedId}?page=1&pageSize=10`,
    );

    const { data }: NewsFeedDetailResponse = await response.json();
    const listCommentsData: ListCommentsResponse = await commentResponse.json();

    if (data) {
      const transformData: NewsFeed = {
        ...data[0],
        tagFriends: [],
        sendFriends: [],
        likes: {
          likesTotal: data[0].likes?.length || 0,
          remainingLikes: Math.max(0, data[0].likes?.length - 2),
          likesRecent: data[0].likes?.slice(0, 2).map((like) => ({
            friend: like.user,
            createdAt: like.createdAt,
          })),
        },
        createdAt: data[0].createdAt,
        isLiked: data[0].likes?.some(
          (like) => Number(authorId) === like.user.id,
        ),
        comments: {
          ...listCommentsData,
          commentTotal: listCommentsData.data.reduce((acc, comment) => {
            // Count the comment itself
            let count = 1;
            // Add the number of replies
            count += comment.replies?.length || 0;
            return acc + count;
          }, 0),
          data: listCommentsData.data.map((comment) => ({
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
        },
        sharedFrom: data[0].sharedFrom
          ? ({
              ...data[0].sharedFrom,
              tagFriends: [],
              sendFriends: [],
              likes: {
                likesTotal: data[0].sharedFrom.likes?.length || 0,
                remainingLikes: Math.max(
                  0,
                  data[0].sharedFrom.likes?.length - 2,
                ),
                likesRecent: data[0].sharedFrom.likes
                  ?.slice(0, 2)
                  .map((like) => ({
                    friend: like.user,
                    createdAt: like.createdAt,
                  })),
              },
              isLiked: data[0].sharedFrom.likes?.some(
                (like) => Number(authorId) === like.user.id,
              ),
            } as NewsFeed)
          : undefined,
      };

      setNewsFeed(transformData);
    }
  }, [authorId, newsFeedId]);

  useEffect(() => {
    fetchNewsFeed();
  }, [newsFeedId, authorId, fetchNewsFeed]);

  useEffect(() => {
    if (shareState.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: shareState.error,
      });
    }

    if (shareState.message) {
      toast({
        variant: 'success',
        title: 'Success',
        description: shareState.message,
      });
    }
  }, [shareState]);

  if (!newsFeed) return null;

  const handleLike = async () => {
    await toggleLikeNewsFeed(Number(newsFeed.id), Number(authorId));
    fetchNewsFeed();
  };

  const handleComment = (data: FormData) => {
    formAction(data);
    fetchNewsFeed();
    clearCommentReply();
  };

  const handleShare = (formData: FormData) => {
    shareAction(formData);
  };

  return (
    <NewsFeedCard
      newsFeed={newsFeed}
      authorId={authorId}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
    />
  );
};
