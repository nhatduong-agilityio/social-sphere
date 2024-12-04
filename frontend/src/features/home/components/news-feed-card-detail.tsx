'use client';

import { useCallback, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

// Components
import { NewsFeedCard } from './news-feed-card';

// Models
import { CommentPayload, ListCommentsResponse, SharePayload } from '@/models';
import { ActionState, NewsFeed } from '@/types';

// Actions
import { fetchNewsFeedComments, fetchNewsFeedDetail } from '@/actions';
import { publishComment, shareNewFeeds, toggleLikeNewsFeed } from '../actions';

// Stores
import { useCommentReplyStore } from '../stores';

// Hooks
import { toast } from '@/hooks';
import { CURRENT_PAGE, PAGE_SIZE } from '@/constants';

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
  const [listCommentsPagination, setListCommentsPagination] =
    useState<ListCommentsResponse>();
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
    const newsFeedDetail = await fetchNewsFeedDetail({
      newsFeedId,
      authorId,
    });

    setNewsFeed(newsFeedDetail);
  }, [authorId, newsFeedId]);

  const fetchComments = useCallback(async () => {
    const newsFeedCommentsResponse = await fetchNewsFeedComments({
      newsFeedId,
      page: CURRENT_PAGE,
      pageSize: PAGE_SIZE,
    });

    setListCommentsPagination(newsFeedCommentsResponse);
  }, [newsFeedId]);

  useEffect(() => {
    fetchNewsFeed();
    fetchComments();
  }, [newsFeedId, authorId, fetchNewsFeed, fetchComments]);

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
    fetchComments();
    clearCommentReply();
  };

  const handleShare = (formData: FormData) => {
    shareAction(formData);
  };

  return (
    <NewsFeedCard
      newsFeed={newsFeed}
      listCommentsPagination={listCommentsPagination}
      authorId={authorId}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
    />
  );
};
