import { memo } from 'react';

// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { UserContentPopover } from '@/components/sections';

// Utils
import { getFirstLetters, cn } from '@/utils';

// Types
import { UserDetail } from '@/types';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';

interface UserPopoverProps {
  isStories?: boolean;
  size?: 'default' | 'sm' | 'md' | 'lg';
  additionalClass?: string;
  additionalAvatarClass?: string;
  user: UserDetail;
}

export const UserCardPopover = memo(
  ({
    user,
    isStories = false,
    size = 'default',
    additionalClass,
    additionalAvatarClass,
  }: UserPopoverProps) => {
    const { profilePicture, firstName, lastName } = user;
    const sizeWrapper = {
      default: 'w-12 h-12',
      sm: 'w-8 h-8',
      md: 'w-9 h-9',
      lg: 'w-[38px] h-[38px]',
    }[size];

    return (
      <HoverCard>
        <HoverCardTrigger data-testid="avatar-trigger" asChild>
          <div
            className={cn(
              sizeWrapper,
              'flex items-center justify-center rounded-full',
              {
                'border border-gray-900 dark:border-blue-800': isStories,
              },
              additionalClass,
            )}
          >
            <Avatar
              data-testid="avatar-wrapper"
              size={size}
              className={cn('bg-current', additionalAvatarClass)}
            >
              <AvatarImage
                src={profilePicture || ''}
                alt={`Avatar of the group-${getFirstLetters(firstName, lastName)}`}
                width={40}
                height={40}
                sizes="(max-width: 768px) 40px, (min-width: 769px) 80px"
              />
              <AvatarFallback>
                {getFirstLetters(firstName, lastName)}
              </AvatarFallback>
            </Avatar>
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <UserContentPopover user={user} />
        </HoverCardContent>
      </HoverCard>
    );
  },
);

UserCardPopover.displayName = 'UserCardPopover';
