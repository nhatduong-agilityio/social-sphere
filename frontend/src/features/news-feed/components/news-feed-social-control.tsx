import { memo, ReactNode, forwardRef } from 'react';

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

interface NewsFeedSocialControl {
  isLiked?: boolean;
  authorId: string;
  newsFeed: NewsFeed;
  onOpenComments: () => void;
  onLike: () => Promise<void>;
  onShare: (data: FormData) => void;
}

interface SocialButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}

const SocialButton = forwardRef<HTMLButtonElement, SocialButtonProps>(
  ({ icon, onClick, className }, ref) => (
    <Button
      aria-label="Social Button"
      type="button"
      ref={ref}
      variant="primary"
      className={cn(
        'rounded-full p-0 relative dark:hover:opacity-1 hover:opacity-1',
        className,
      )}
      onClick={onClick}
    >
      {icon}
    </Button>
  ),
);

SocialButton.displayName = 'SocialButton';

export const NewsFeedSocialControl = memo(
  ({
    isLiked,
    authorId,
    newsFeed,
    onOpenComments,
    onLike,
    onShare,
  }: NewsFeedSocialControl) => {
    const defaultButtonStyle =
      'w-[43px] h-[43px] shadow-sphere-secondary hover:bg-blue-50';
    const likeButtonStyle = cn(
      'w-[54px] h-[54px] border-none bg-white dark:bg-blue-700',
      isLiked
        ? 'shadow-sphere-destructive hover:shadow-sphere-destructive'
        : 'hover:bg-white dark:hover:bg-blue-700 shadow-sphere-medium hover:shadow-sphere-medium',
    );

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
            <NewsFeedShareDialog
              authorId={authorId}
              newsFeed={newsFeed}
              onShare={onShare}
            />
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
            onClick={onLike}
            className={likeButtonStyle}
          />
        </div>
      </>
    );
  },
);

NewsFeedSocialControl.displayName = 'NewsFeedSocialControl';
