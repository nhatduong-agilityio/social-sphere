import { EllipsisVertical } from 'lucide-react';

// Components
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Text,
} from '@/components/ui';
import { UserCardPopover } from '@/components/sections';

// Utils
import { getFullName } from '@/utils';

// Types
import { TNewFriends } from '@/types';
import { TFollowed } from '@/models';

interface NewFriendsWidgetProps {
  friends: TNewFriends[];
}

interface NewFriendItemProps {
  user: TFollowed;
}

const FriendItem = ({ user }: NewFriendItemProps) => (
  <div className="p-4 flex w-full border-t border-slate-300 dark:border-slate-600 items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <UserCardPopover user={user} />

      <div className="flex flex-col">
        <Text className="text-xs">
          {getFullName(user.firstName, user.lastName)}
        </Text>
        <span className="text-4xs text-slate-500">{user.location?.city}</span>
      </div>
    </div>
  </div>
);

export const NewFriendsWidget = ({ friends }: NewFriendsWidgetProps) => {
  const renderNewFriends = friends.map((user) => (
    <FriendItem key={user.id} user={user.followed} />
  ));

  return (
    <Card className="w-full rounded-lg">
      <CardHeader className="flex flex-row px-4 py-2 justify-between">
        <div className="flex items-center gap-4">
          <CardTitle className="text-sm font-normal">New Friends</CardTitle>
        </div>

        <div className="flex items-center gap-3">
          <Button
            aria-label="See More"
            size="icon"
            variant="rounded"
            className="hover:bg-muted"
          >
            <EllipsisVertical size={20} className="text-slate-300" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        {renderNewFriends}
      </CardContent>
    </Card>
  );
};
