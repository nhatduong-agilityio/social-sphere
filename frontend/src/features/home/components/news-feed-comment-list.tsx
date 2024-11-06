import { ComponentProps, memo } from 'react';

// Icons
import { ThumbsUpIcon } from 'lucide-react';

// Constants
import { NEWS_FEED_COMMENT_MORE_OPTIONS } from '../constants';

// Components
import { Button, Circle, Text } from '@/components/ui';
import { UserCardHeader } from '@/components/sections';

// Types
import { NewsFeedComment } from '@/types';

// Utils
import { cn, formatDate, getFullName } from '@/utils';

interface NewsFeedCommentListProps {
  hasBorder?: boolean;
  hasSeparator?: boolean;
  comment: NewsFeedComment;
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
  }: NewsFeedCommentListProps) => {
    const { friend, createdAt, content, reply, isOwner } = comment;

    const title = getFullName(friend.firstName, friend.lastName);
    const description = formatDate(createdAt);
    const replyCount = reply?.length || 0;

    return (
      <div
        className={cn(
          'flex flex-col',
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
          <Text className="text-neutral-400 dark:text-neutral-100">
            {content}
          </Text>
          <div className="flex gap-2.5 items-center py-2">
            <CommentButton className="flex items-center text-2xs">
              <ThumbsUpIcon size={12} strokeWidth={2} className="mr-[5px]" />
              {replyCount}
            </CommentButton>
            <CommentButton>Reply</CommentButton>
            {isOwner && <CommentButton>Edit</CommentButton>}
          </div>

          {reply?.length &&
            reply.map((comment) => (
              <NewsFeedCommentList
                key={comment.id}
                comment={comment}
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
