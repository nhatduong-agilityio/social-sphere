'use client';

import { memo, useState, ReactNode, forwardRef } from 'react';

// Icons
import { Link2Icon, MessageCircleIcon } from 'lucide-react';
import { HeartIcon } from '@/icons/heart-icon';

// Components
import { Button, Dialog, DialogTrigger } from '@/components/ui';
import { NewsFeedShareDialog } from './news-feed-share-dialog';

// Utils
import { cn } from '@/utils';

// Types
import { NewsFeed } from '@/types';
import { toggleLikeNewsFeed } from '../actions';

interface NewsFeedSocialControl {
  authorId: string;
  newsFeed: NewsFeed;
  onOpenComments: () => void;
}

interface SocialButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ icon, onClick, className }, ref) => (
    <Button
      ref={ref}
      variant="primary"
      className={cn('rounded-full p-0 hover:opacity-100 relative', className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  ),
);

SocialButton.displayName = 'SocialButton';

export const NewsFeedSocialControl = memo(
  ({ authorId, newsFeed, onOpenComments }: NewsFeedSocialControl) => {
    const [isLiked, setIsLiked] = useState(newsFeed.isLiked);

    const defaultButtonStyle =
      'w-[43px] h-[43px] shadow-sphere-secondary hover:bg-blue-50';
    const likeButtonStyle = cn(
      'w-[54px] h-[54px] border-none bg-white dark:bg-blue-700',
      isLiked
        ? 'shadow-sphere-destructive hover:shadow-sphere-destructive'
        : 'hover:bg-white dark:hover:bg-blue-700 shadow-sphere-medium hover:shadow-sphere-medium',
    );

    const handleLike = async () => {
      await toggleLikeNewsFeed(Number(newsFeed.id), Number(authorId));
      setIsLiked((prev) => !prev);
    };

    return (
      <>
        <div className="flex items-center gap-1">
          <SocialButton
            icon={<MessageCircleIcon size={18} />}
            className={defaultButtonStyle}
            onClick={onOpenComments}
          />
          <Dialog>
            <DialogTrigger asChild>
              <SocialButton
                icon={<Link2Icon size={18} />}
                className={defaultButtonStyle}
              />
            </DialogTrigger>
            <NewsFeedShareDialog newsFeed={newsFeed} />
          </Dialog>
          <SocialButton
            icon={
              <>
                <div
                  className={cn(
                    'absolute inset-0 rounded-full origin-center bg-red-100 transition-all duration-400 z-0',
                    isLiked ? 'scale-100' : 'scale-0',
                  )}
                />
                <HeartIcon
                  key={isLiked ? 'liked' : 'unliked'}
                  className={cn(
                    'w-4 h-4 animate-bouncy relative z-2',
                    isLiked ? 'text-white' : 'text-red-100 dark:text-white',
                  )}
                />
              </>
            }
            onClick={handleLike}
            className={likeButtonStyle}
          />
        </div>
      </>
    );
  },
);

NewsFeedSocialControl.displayName = 'NewsFeedSocialControl';
