'use client';

import { useCallback, useEffect, useState, useTransition } from 'react';
import { useFormState } from 'react-dom';

// Components
import { NewsFeedCard } from './news-feed-card';
import { PostSkeleton } from '@/components/sections';

// Models
import { CommentPayload, SharePayload } from '@/models';
import { ActionState, NewsFeed } from '@/types';

// Actions
import { fetchNewsFeedDetailAndComments } from '@/actions';
import { publishComment, shareNewFeeds, toggleLikeNewsFeed } from '../actions';

// Stores
import { useCommentReplyStore } from '../stores';

// Hooks
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
  const [isPending, startTransition] = useTransition();
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
    startTransition(async () => {
      const newsFeedDetail: NewsFeed = await fetchNewsFeedDetailAndComments({
        newsFeedId,
        authorId,
      });

      setNewsFeed(newsFeedDetail);
    });
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

  return isPending ? (
    <PostSkeleton />
  ) : (
    <NewsFeedCard
      newsFeed={newsFeed}
      authorId={authorId}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
    />
  );
};
