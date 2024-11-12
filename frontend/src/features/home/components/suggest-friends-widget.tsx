'use client';

import { useCallback, useState } from 'react';
import { EllipsisVertical, UserPlus } from 'lucide-react';

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

// Icons
import { CheckmarkIcon } from '@/icons';

// Types
import { TFollowed } from '@/models';

interface SuggestFriendsWidgetProps {
  suggestFriends: TFollowed[];
}

export const SuggestFriendsWidget = ({
  suggestFriends,
}: SuggestFriendsWidgetProps) => {
  const [addedFriends, setAddedFriends] = useState<string[]>([]);

  const handleAddFriend = useCallback(
    (userId: string) => {
      !addedFriends.includes(userId) &&
        setAddedFriends((prevAddedFriends) => [...prevAddedFriends, userId]);
    },
    [addedFriends],
  );
  const renderSuggestedFriends = suggestFriends.map((user) => (
    <div
      key={user.id}
      className="p-4 flex w-full border-t border-slate-300 dark:border-slate-600 items-center justify-between group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <UserCardPopover user={user} />

        <div className="flex flex-col">
          <Text className="text-xs">
            {getFullName(user.firstName, user.lastName)}
          </Text>
          <span className="text-4xs text-slate-500">{user.location?.city}</span>
        </div>
      </div>

      <Button
        size="icon"
        variant="rounded"
        className="w-9 h-9 border-none"
        onClick={() => handleAddFriend(user.id.toString())}
      >
        {addedFriends.includes(user.id.toString()) ? (
          <CheckmarkIcon />
        ) : (
          <UserPlus
            size={20}
            className="text-slate-600 group-hover:text-slate-500"
          />
        )}
      </Button>
    </div>
  ));

  return (
    <Card className="w-full rounded-lg">
      <CardHeader className="flex flex-row px-4 py-2 justify-between">
        <div className="flex items-center gap-4">
          <CardTitle className="text-sm font-normal">
            Suggested Friends
          </CardTitle>
        </div>

        <div className="flex items-center gap-3">
          <Button size="icon" variant="rounded" className="hover:bg-muted">
            <EllipsisVertical size={20} className="text-slate-600" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        {renderSuggestedFriends}
      </CardContent>
    </Card>
  );
};
