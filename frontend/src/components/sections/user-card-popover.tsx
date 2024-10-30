import { memo } from 'react';

// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { UserContentPopover } from '@/components/sections';

// Utils
import { getFirstLetters, getFullName, cn } from '@/utils';

// Types
import { UserDetail } from '@/types';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';

interface UserPopoverProps {
  isStories?: boolean;
  user: UserDetail;
  variant?: 'default' | 'sm' | 'md' | 'lg';
  additionalClass?: string;
  additionalAvatarClass?: string;
}

export const UserCardPopover = memo(
  ({
    user,
    isStories = false,
    variant = 'default',
    additionalClass,
    additionalAvatarClass,
  }: UserPopoverProps) => {
    const { profilePicture, firstName, lastName } = user;
    const sizeWrapper = {
      default: 'w-12 h-12',
      sm: 'w-8 h-8',
      md: 'w-9 h-9',
      lg: 'w-[38px] h-[38px]',
    }[variant];

    return (
      <HoverCard>
        <HoverCardTrigger
          className={cn(
            sizeWrapper,
            'flex items-center justify-center rounded-full',
            {
              'border border-gray-900 dark:border-blue-800': isStories,
            },
            additionalClass,
          )}
        >
          <Avatar size={variant} className={additionalAvatarClass}>
            <AvatarImage
              src={profilePicture}
              alt={`Avatar of the user-${getFullName(firstName, lastName)} in team`}
            />
            <AvatarFallback>
              {getFirstLetters(firstName, lastName)}
            </AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent>
          <UserContentPopover user={user} />
        </HoverCardContent>
      </HoverCard>
    );
  },
);

UserCardPopover.displayName = 'UserCardPopover';
