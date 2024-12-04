'use client';

import { memo, useTransition } from 'react';

// Icons
import { XIcon } from 'lucide-react';

// Components
import {
  Button,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { NewsFeedComment, UserDetail } from '@/types';
import { NewsFeedCommentList } from './news-feed-comment-list';
import { NewsFeedCommentForm } from './news-feed-comment-form';
import { useCommentReplyStore } from '../stores';

interface NewsFeedCommentsProps {
  hasMore: boolean;
  comments: NewsFeedComment[];
  commentTotal: number;
  author: UserDetail;
  onCloseComments: () => void;
  loadMoreComments: () => Promise<void>;
  onComment: (data: FormData) => void;
}

export const NewsFeedComments = memo(
  ({
    hasMore,
    comments,
    commentTotal,
    author,
    loadMoreComments,
    onCloseComments,
    onComment,
  }: NewsFeedCommentsProps) => {
    const [isPending, startTransition] = useTransition();
    const [commentReplyValue, setCommentReplyValue, clearCommentReply] =
      useCommentReplyStore((state) => [
        state.commentReplyValue,
        state.setCommentReplyValue,
        state.clearCommentReply,
      ]);

    return (
      <div>
        <CardHeader className="p-4 flex flex-row justify-between items-center">
          <CardTitle className="text-base text-neutral-400">
            Comments ({commentTotal})
          </CardTitle>
          <Button
            size="icon"
            variant="unstyle"
            className="bg-white hover:bg-gray-600 dark:bg-card hover:dark:bg-dark-500 rounded-full w-[30px] h-[30px]"
            onClick={onCloseComments}
          >
            <XIcon size={18} className="text-neutral-400" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-4 max-h-[450px] overflow-auto">
          {comments.map((comment, index) => (
            <NewsFeedCommentList
              key={comment.id}
              comment={comment}
              hasBorder={index > 0}
              onCommentReply={setCommentReplyValue}
            />
          ))}
          {hasMore && (
            <Button
              variant="primary"
              onClick={() => startTransition(() => loadMoreComments())}
              disabled={isPending}
              isLoading={isPending}
            >
              {isPending ? 'Loading...' : 'Load More Comments'}
            </Button>
          )}
        </CardContent>
        <CardFooter className="p-4">
          <NewsFeedCommentForm
            user={author}
            onComment={onComment}
            commentReplyValue={commentReplyValue}
            onClearCommentReply={clearCommentReply}
          />
        </CardFooter>
      </div>
    );
  },
);

NewsFeedComments.displayName = 'NewsFeedComments';
