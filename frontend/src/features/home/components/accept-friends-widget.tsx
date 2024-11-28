'use client';

import { useCallback, useTransition } from 'react';
import {
  Ellipsis,
  EllipsisVertical,
  Loader,
  UserMinus,
  UserPlus,
} from 'lucide-react';

// Components
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenuItem,
  Text,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui';
import { UserCardPopover } from '@/components/sections';

// Utils
import { getFullName } from '@/utils';

// Types
import { TFollower } from '@/models';

// Actions
import { acceptedFriend, rejectedFriend } from '../actions';

interface AcceptFriendsWidgetProps {
  authorId: string;
  friends: TFollower[];
}

export const AcceptFriendsWidget = ({
  authorId,
  friends,
}: AcceptFriendsWidgetProps) => {
  const [isAcceptPending, startAcceptedTransition] = useTransition();
  const [isRejectedPending, startRejectedTransition] = useTransition();

  const handleAcceptedFriend = useCallback(
    (userId: string, relationshipId: string) => {
      startAcceptedTransition(async () => {
        await acceptedFriend(authorId, userId, relationshipId);
      });
    },
    [authorId],
  );

  const handleRejectedFriend = useCallback(
    async (relationshipId: string) => {
      startRejectedTransition(async () => {
        await rejectedFriend(relationshipId, authorId);
      });
    },
    [authorId],
  );

  const renderAcceptedFriends = friends.map(({ follower, documentId }) => (
    <div
      key={follower.id}
      className="p-4 flex w-full border-t border-slate-300 dark:border-slate-600 items-center justify-between group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <UserCardPopover user={follower} />

        <div className="flex flex-col">
          <Text className="text-xs">
            {getFullName(follower.firstName, follower.lastName)}
          </Text>
          <span className="text-4xs text-slate-500">
            {follower.location?.city}
          </span>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            data-testid="dropdown-trigger"
            variant="rounded"
            size="icon"
            className="border-none"
          >
            <Ellipsis size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-24 p-0 py-2 bg-white dark:bg-card rounded-md border border-slate-300 dark:border-slate-600">
          <DropdownMenuItem
            data-testid="accept-friend-dropdown"
            className="flex gap-3 w-full"
            onClick={() =>
              handleAcceptedFriend(follower.id.toString(), documentId)
            }
          >
            {isAcceptPending ? (
              <Loader
                data-testid="accept-loader"
                size={16}
                className="text-blue-400 animate-spin"
              />
            ) : (
              <UserPlus
                data-testid="accept-icon"
                size={16}
                className="text-blue-400 "
              />
            )}
            <Text className="text-4xs text-blue-400">Accept</Text>
          </DropdownMenuItem>
          <DropdownMenuItem
            data-testid="reject-friend-dropdown"
            className="flex gap-3 w-full"
            onClick={() => handleRejectedFriend(documentId)}
          >
            {isRejectedPending ? (
              <Loader
                data-testid="reject-loader"
                size={16}
                className="text-blue-400 animate-spin"
              />
            ) : (
              <UserMinus
                data-testid="reject-icon"
                size={16}
                className="text-red-400"
              />
            )}

            <Text className="text-4xs text-red-400">Reject</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ));

  return (
    <Card className="w-full rounded-lg">
      <CardHeader className="flex flex-row px-4 py-2 justify-between">
        <div className="flex items-center gap-4">
          <CardTitle className="text-sm font-normal dark:text-neutral-50 text-neutral-600">
            Accepted Friends
          </CardTitle>
        </div>

        <div className="flex items-center gap-3">
          <Button size="icon" variant="rounded" className="hover:bg-muted">
            <EllipsisVertical size={20} className="text-slate-600" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        {renderAcceptedFriends}
      </CardContent>
    </Card>
  );
};
