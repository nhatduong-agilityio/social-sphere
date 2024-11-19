'use client';

import { useCallback, useState } from 'react';
import { EllipsisVertical, Loader, UserPlus } from 'lucide-react';

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
import { requestAddFriends } from '../actions';

interface SuggestFriendsWidgetProps {
  authorId: string;
  suggestFriends: TFollowed[];
}

interface SuggestedFriendItemProps {
  user: TFollowed;
  handleAddFriend: (userId: string) => void;
  isPending: { [key: string]: boolean };
  addedFriends: string[];
}

const SuggestedFriendItem = ({
  user,
  handleAddFriend,
  isPending,
  addedFriends,
}: SuggestedFriendItemProps) => {
  const isDisabled =
    isPending[user.id] || addedFriends.includes(user.id.toString());

  return (
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

      <Button
        size="icon"
        variant="rounded"
        className="w-9 h-9 border-none"
        onClick={() => handleAddFriend(user.id.toString())}
        disabled={isDisabled}
      >
        {addedFriends.includes(user.id.toString()) ? (
          isPending[user.id] ? (
            <Loader size={20} />
          ) : (
            <CheckmarkIcon />
          )
        ) : (
          <UserPlus
            size={20}
            className="text-slate-600 group-hover:text-slate-500"
          />
        )}
      </Button>
    </div>
  );
};

export const SuggestFriendsWidget = ({
  authorId,
  suggestFriends,
}: SuggestFriendsWidgetProps) => {
  const [addedFriends, setAddedFriends] = useState<string[]>([]);
  const [isPending, setIsPending] = useState<{ [key: string]: boolean }>({});

  const handleAddFriend = useCallback(
    async (userId: string) => {
      setIsPending((prevPending) => ({ ...prevPending, [userId]: true }));

      await requestAddFriends(authorId, userId);

      setIsPending((prevPending) => ({ ...prevPending, [userId]: false }));

      !addedFriends.includes(userId) &&
        setAddedFriends((prevAddedFriends) => [...prevAddedFriends, userId]);
    },
    [addedFriends, authorId],
  );

  const renderSuggestedFriends = suggestFriends.map((user) => (
    <SuggestedFriendItem
      key={user.id}
      user={user}
      handleAddFriend={handleAddFriend}
      isPending={isPending}
      addedFriends={addedFriends}
    />
  ));

  return (
    <Card className="w-full rounded-lg">
      <CardHeader className="flex flex-row px-4 py-2 justify-between">
        <div className="flex items-center gap-4">
          <CardTitle className="text-sm font-normal text-neutral-400 dark:text-gray-100">
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
