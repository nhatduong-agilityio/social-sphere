'use client';

import { useCallback, useEffect, useState } from 'react';

// Components
import { NewsFeedCard } from './news-feed-card';

// Models
import { ListCommentsResponse, NewsFeedDetailResponse } from '@/models';
import { ActionState, NewsFeed } from '@/types';

// Actions
import { publishComment, toggleLikeNewsFeed } from '../actions';
import { useFormState } from 'react-dom';

interface NewsFeedCardDetailProps {
  newsFeedId: string;
  authorId: string;
}

const initialState: ActionState = {
  message: null,
  error: null,
};

export const NewsFeedCardDetail = ({
  newsFeedId,
  authorId,
}: NewsFeedCardDetailProps) => {
  const [newsFeed, setNewsFeed] = useState<NewsFeed | null>(null);

  // Management server action to publish post
  const [_, formAction] = useFormState(
    publishComment.bind(null, {
      id: Number(newsFeedId),
      authorId: Number(authorId),
    }),
    initialState,
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
          data: listCommentsData.data.map((comment) => ({
            ...comment,
            isOwner: Number(authorId) === comment.friend.id,
            // reply: comment.reply?.map((reply) => ({
            //   ...reply,
            //   isOwner: Number(authorId) === reply.friend.id,
            // })),
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
      };

      setNewsFeed(transformData);
    }
  }, [authorId, newsFeedId]);

  useEffect(() => {
    fetchNewsFeed();
  }, [newsFeedId, authorId, fetchNewsFeed]);

  if (!newsFeed) return null;

  const handleLike = async () => {
    await toggleLikeNewsFeed(Number(newsFeed.id), Number(authorId));
    fetchNewsFeed();
  };

  const handleComment = (data: FormData) => {
    formAction(data);
    fetchNewsFeed();
  };

  return (
    <NewsFeedCard
      newsFeed={newsFeed}
      authorId={authorId}
      onLike={handleLike}
      onComment={handleComment}
    />
  );
};
