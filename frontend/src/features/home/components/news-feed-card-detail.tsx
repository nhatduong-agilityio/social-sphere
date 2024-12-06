'use client';

import {
  useCallback,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from 'react';
import { useFormState } from 'react-dom';

// Components
import { NewsFeedCard } from './news-feed-card';

// Models
import { CommentPayload, ListCommentsResponse, SharePayload } from '@/models';
import { ActionState, NewsFeed, UserDetail } from '@/types';

// Actions
import { fetchNewsFeedComments, fetchNewsFeedDetail } from '@/actions';
import { publishComment, shareNewFeeds, toggleLikeNewsFeed } from '../actions';

// Stores
import { useCommentReplyStore } from '../stores';

// Hooks
import { toast } from '@/hooks';
import { CURRENT_PAGE, PAGE_SIZE } from '@/constants';
import { useSession } from 'next-auth/react';

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
  const { data: session } = useSession();
  const author = session?.user as UserDetail;

  const [isPending, startTransition] = useTransition();
  const [newsFeed, setNewsFeed] = useState<NewsFeed | null>(null);
  const [listCommentsPagination, setListCommentsPagination] =
    useState<ListCommentsResponse>();
  const [commentReplyValue, clearCommentReply] = useCommentReplyStore(
    (state) => [state.commentReplyValue, state.clearCommentReply],
  );

  const [optimisticNewsFeed, addOptimisticNewsFeed] = useOptimistic(
    newsFeed,
    (state, optimisticValue: NewsFeed) => optimisticValue,
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

  const handleLike = useCallback(async () => {
    if (!newsFeed || isPending) return;

    // Create optimistic update
    const optimisticUpdate = {
      ...newsFeed,
      isLiked: !newsFeed.isLiked,
      likes: {
        ...newsFeed.likes,
        likesTotal: newsFeed.isLiked
          ? (newsFeed.likes?.likesTotal || 1) - 1
          : (newsFeed.likes?.likesTotal || 0) + 1,
        likesRecent: newsFeed.isLiked
          ? newsFeed.likes?.likesRecent?.filter(
              (like) => like.friend.id !== Number(authorId),
            ) || []
          : [
              {
                friend: author,
                createdAt: new Date().toISOString(),
              },
              ...(newsFeed.likes?.likesRecent || []),
            ],
      },
    };

    startTransition(async () => {
      addOptimisticNewsFeed(optimisticUpdate);

      await toggleLikeNewsFeed(Number(newsFeed.id), Number(authorId));

      await fetchNewsFeed();
    });
  }, [
    addOptimisticNewsFeed,
    author,
    authorId,
    fetchNewsFeed,
    isPending,
    newsFeed,
  ]);

  const handleComment = useCallback(
    (data: FormData) => {
      startTransition(async () => {
        await publishComment(
          {
            id: Number(newsFeedId),
            authorId: Number(authorId),
            commentId: commentReplyValue.commentId,
          },
          initialCommentState,
          data,
        );
        await fetchComments();
      });
      clearCommentReply();
    },
    [
      authorId,
      clearCommentReply,
      commentReplyValue.commentId,
      fetchComments,
      newsFeedId,
    ],
  );

  const handleShare = useCallback(
    (formData: FormData) => {
      shareAction(formData);
    },
    [shareAction],
  );

  if (!newsFeed) return null;

  return (
    <NewsFeedCard
      newsFeed={optimisticNewsFeed || newsFeed}
      listCommentsPagination={listCommentsPagination}
      authorId={authorId}
      onLike={handleLike}
      onComment={handleComment}
      onShare={handleShare}
    />
  );
};
