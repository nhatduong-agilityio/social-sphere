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
  additionalClass?: string;
}

export const UserCardPopover = memo(
  ({ user, isStories = false, additionalClass }: UserPopoverProps) => {
    const { profilePicture, firstName, lastName } = user;

    return (
      <HoverCard>
        <HoverCardTrigger
          className={cn(
            'w-12 h-12 flex items-center justify-center rounded-full p-[3px]',
            {
              'border border-gray-900 dark:border-blue-800': isStories,
            },
            additionalClass,
          )}
        >
          <Avatar className="w-fit h-fit">
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
