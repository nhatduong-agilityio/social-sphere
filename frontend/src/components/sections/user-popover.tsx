// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PopoverContainer } from '@/components/ui/popover';
import UserContentPopover from '@/components/sections/user-content-popover';

// Utils
import { getFirstLetters, getFullName } from '@/utils/string';

// Types
import { UserDetail } from '@/types/user';

interface UserPopoverProps {
  user: UserDetail;
}

const UserPopover = ({ user }: UserPopoverProps) => {
  const { avatar, firstName, lastName } = user;

  return (
    <PopoverContainer
      trigger={
        <Avatar>
          <AvatarImage
            src={avatar}
            alt={`Avatar of the user-${getFullName(firstName, lastName)} in team`}
          />
          <AvatarFallback>
            {getFirstLetters(firstName, lastName)}
          </AvatarFallback>
        </Avatar>
      }
      content={<UserContentPopover user={user} />}
      contentClassName="p-0"
    />
  );
};

export default UserPopover;
