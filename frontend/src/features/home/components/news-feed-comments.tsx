'use client';

import { memo } from 'react';

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
import { NewsFeedCommentPagination, UserDetail } from '@/types';
import { NewsFeedCommentList } from './news-feed-comment-list';
import { NewsFeedCommentForm } from './news-feed-comment-form';
import { useCommentReplyStore } from '../stores';

interface NewsFeedCommentsProps {
  comments?: NewsFeedCommentPagination;
  author: UserDetail;
  onCloseComments: () => void;
  onComment: (data: FormData) => void;
}

export const NewsFeedComments = memo(
  ({ comments, author, onCloseComments, onComment }: NewsFeedCommentsProps) => {
    const { data: commentsList, commentTotal } = comments || {
      data: [],
    };
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
        <CardContent className="p-4 max-h-[450px] overflow-auto">
          {commentsList.map((comment, index) => (
            <NewsFeedCommentList
              key={comment.id}
              comment={comment}
              hasBorder={index > 0}
              onCommentReply={setCommentReplyValue}
            />
          ))}
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
