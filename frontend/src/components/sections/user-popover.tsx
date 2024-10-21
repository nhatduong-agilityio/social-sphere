// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PopoverContainer } from '@/components/ui/popover';
import UserContentPopover from '@/components/sections/user-content-popover';

// Utils
import { getFirstLetters, getFullName } from '@/utils/string';

// Types
import { UserDetail } from '@/types/user';
import { cn } from '@/utils/cn';

interface UserPopoverProps {
  isStories?: boolean;
  user: UserDetail;
}

const UserPopover = ({ user, isStories = false }: UserPopoverProps) => {
  const { avatar, firstName, lastName } = user;

  return (
    <PopoverContainer
      trigger={
        <div
          className={cn('w-12 h-12 flex items-center justify-center ', {
            'rounded-full border border-gray-900 dark:border-blue-800':
              isStories,
          })}
        >
          <Avatar>
            <AvatarImage
              src={avatar}
              alt={`Avatar of the user-${getFullName(firstName, lastName)} in team`}
            />
            <AvatarFallback>
              {getFirstLetters(firstName, lastName)}
            </AvatarFallback>
          </Avatar>
        </div>
      }
      content={<UserContentPopover user={user} />}
      contentClassName="p-0"
    />
  );
};

export default UserPopover;
