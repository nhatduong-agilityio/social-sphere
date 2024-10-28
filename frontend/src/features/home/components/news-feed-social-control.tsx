'use client';

import { memo, useState } from 'react';

// Icons
import { Link2Icon, MessageCircleIcon } from 'lucide-react';
import { HeartIcon } from '@/icons/heart-icon';

// Components
import { Button } from '@/components/ui';

// Utils
import { cn } from '@/utils';

interface NewsFeedSocialControl {
  isLiked?: boolean;
}

interface SocialButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const SocialButton = ({ icon, onClick, className }: SocialButtonProps) => (
  <Button
    variant="primary"
    className={cn('rounded-full p-0 hover:opacity-100', className)}
    onClick={onClick}
  >
    {icon}
  </Button>
);

export const NewsFeedSocialControl = memo(
  ({ isLiked: initState = false }: NewsFeedSocialControl) => {
    const [isLiked, setIsLiked] = useState(initState);

    const handleLikeClick = () => {
      setIsLiked((prev) => !prev);
    };

    const defaultButtonStyle =
      'w-[43px] h-[43px] shadow-sphere-secondary hover:bg-blue-50';
    const likeButtonStyle = cn(
      'w-[54px] h-[54px] border-none transition-colors duration-300 ease-in-out',
      isLiked
        ? 'bg-red-100 shadow-sphere-destructive hover:shadow-sphere-destructive'
        : 'bg-white hover:bg-white dark:hover:bg-white shadow-sphere-medium hover:shadow-sphere-medium',
    );

    return (
      <div className="flex items-center gap-1">
        <SocialButton
          icon={<MessageCircleIcon size={18} />}
          className={defaultButtonStyle}
        />
        <SocialButton
          icon={<Link2Icon size={18} />}
          className={defaultButtonStyle}
        />
        <SocialButton
          icon={
            <HeartIcon
              key={isLiked ? 'liked' : 'unliked'}
              className={cn(
                'w-[18px] h-[18px] animate-bouncy',
                isLiked ? 'text-white' : 'text-red-100',
              )}
            />
          }
          onClick={handleLikeClick}
          className={likeButtonStyle}
        />
      </div>
    );
  },
);

NewsFeedSocialControl.displayName = 'NewsFeedSocialControl';
