'use client';

import { useCallback, useEffect, useState } from 'react';

// Components
import { NewsFeedCard } from './news-feed-card';

// Models
import { NewsFeedDetailResponse } from '@/models';
import { NewsFeed } from '@/types';

// Actions
import { toggleLikeNewsFeed } from '../actions';

interface NewsFeedCardDetailProps {
  newsFeedId: string;
  authorId: string;
}

export const NewsFeedCardDetail = ({
  newsFeedId,
  authorId,
}: NewsFeedCardDetailProps) => {
  const [newsFeed, setNewsFeed] = useState<NewsFeed | null>(null);

  const fetchNewsFeed = useCallback(async () => {
    const response = await fetch(`/api/news-feed/${newsFeedId}`);

    const { data }: NewsFeedDetailResponse = await response.json();

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

  return (
    <NewsFeedCard newsFeed={newsFeed} authorId={authorId} onLike={handleLike} />
  );
};
