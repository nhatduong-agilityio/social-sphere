import { memo } from 'react';
import { XIcon } from 'lucide-react';

// Constants
import { ROUTER } from '@/constants';

// Components
import { Button, LinkWithIcon } from '@/components/ui';

// Types
import { UserDetail } from '@/types';

// Utils
import { getFullName } from '@/utils';

export const FriendTag = memo(
  ({ friend, onRemove }: { friend: UserDetail; onRemove: () => void }) => (
    <div className="flex items-center text-3xs text-white">
      <LinkWithIcon
        url={ROUTER.PROFILE_ID_PERSONAL_INFO(friend.username)}
        text={getFullName(friend.firstName, friend.lastName)}
        additionalClass="border-none rounded-s-[4px] h-full bg-neutral-300 dark:bg-dark-900 hover:underline hover:bg-neutral-300 hover:dark:bg-dark-900 px-[9px]"
      />
      <Button
        variant="unstyle"
        className="p-0 border-none rounded-e-[4px] w-6 h-6 text-primary bg-gray-300 dark:bg-dark-300 hover:bg-gray-600 hover:dark:bg-dark-300"
        onClick={onRemove}
      >
        <XIcon size={16} />
      </Button>
    </div>
  ),
);

FriendTag.displayName = 'FriendTag';
