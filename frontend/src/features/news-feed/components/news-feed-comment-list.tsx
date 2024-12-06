import { ComponentProps, memo } from 'react';

// Icons
import { ThumbsUpIcon } from 'lucide-react';

// Constants
import { NEWS_FEED_COMMENT_MORE_OPTIONS } from '../constants';

// Components
import { Button, Circle, Text } from '@/components/ui';
import { UserCardHeader } from '@/components/sections';
import { ComposeMediaPreview } from './compose-media-preview';

// Types
import { NewsFeedComment } from '@/types';

// Utils
import { cn, formatDate, getFullName } from '@/utils';
import { CommentReplyValues } from '../stores';

interface NewsFeedCommentListProps {
  hasBorder?: boolean;
  hasSeparator?: boolean;
  comment: NewsFeedComment;
  onCommentReply: (values: CommentReplyValues) => void;
}

const CommentButton = ({
  children,
  ...props
}: ComponentProps<typeof Button>) => (
  <Button
    variant="link"
    size="fit"
    className="text-neutral-300 dark:text-gray-100 hover:text-primary dark:hover:text-primary text-3xs"
    {...props}
  >
    {children}
  </Button>
);

export const NewsFeedCommentList = memo(
  ({
    hasBorder = false,
    hasSeparator = false,
    comment,
    onCommentReply,
  }: NewsFeedCommentListProps) => {
    const { id, friend, createdAt, content, reply, isOwner, likes, media } =
      comment;

    const title = getFullName(friend.firstName, friend.lastName);
    const description = formatDate(createdAt);
    const likesCount = likes?.likesTotal || 0;

    const handleReplyComment = () => {
      onCommentReply({
        commentId: id,
        friend,
      });
    };

    return (
      <div
        className={cn(
          'w-full flex flex-col',
          hasBorder && 'border-t dark:border-blue-800 pt-3 mb-6',
        )}
      >
        <UserCardHeader
          user={friend}
          title={title}
          description={description}
          moreOptions={NEWS_FEED_COMMENT_MORE_OPTIONS}
          variant="md"
          className="p-0"
        />

        <div className="flex flex-col mt-2.5 ml-[52px] mr-12 relative">
          <div className="flex flex-col gap-2.5">
            <Text className="text-neutral-400 dark:text-neutral-100">
              {content}
            </Text>
            {media && <ComposeMediaPreview imageUrl={media} />}
          </div>
          <div className="flex gap-2.5 items-center py-2">
            <CommentButton className="flex items-center text-2xs">
              <ThumbsUpIcon size={12} strokeWidth={2} className="mr-[5px]" />
              {likesCount}
            </CommentButton>
            <CommentButton onClick={handleReplyComment}>Reply</CommentButton>
            {isOwner && <CommentButton>Edit</CommentButton>}
          </div>

          {reply &&
            reply.map((comment) => (
              <NewsFeedCommentList
                key={comment.id}
                comment={comment}
                onCommentReply={onCommentReply}
                hasBorder
                hasSeparator
              />
            ))}

          {hasSeparator && (
            <div className="absolute top-0 left-[-36px] h-full w-[1.4px] bg-gray-600 dark:bg-dark-200">
              <Circle
                variant="primary"
                className="w-[14px] h-[14px] shadow-sphere-light absolute top-[calc((100%_-14px)_/_2)] left-[-7px] dark:border-dark-200 dark:bg-dark-200"
              />
            </div>
          )}
        </div>
      </div>
    );
  },
);

NewsFeedCommentList.displayName = 'NewsFeedCommentList';
