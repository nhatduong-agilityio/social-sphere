'use client';

import { useState, useEffect, useCallback, useTransition, useRef } from 'react';
import { CircleFlag } from 'react-circle-flags';
import { SearchIcon } from 'lucide-react';

// Components
import { AutoCompleteInput } from '@/components/sections';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Circle,
  Button,
  Label,
  Text,
} from '@/components/ui';

// Hooks
import { useDebounce, toast, useOnClickOutside, useFocusState } from '@/hooks';

// Utils
import { getFirstLetters, getFullName } from '@/utils';

// Actions
import { inviteToGroup } from '../actions';
import { getFriendsByUserId } from '@/features/home/actions';

// Types
import { GroupMember, GroupRole, UserDetail } from '@/types';

interface GroupInviteMembersInputProps {
  groupMembers: GroupMember[];
  groupId: number;
  authorId: string;
  addOptimisticMember: (action: GroupMember) => void;
}

export const GroupInviteMembersInput = ({
  groupMembers,
  groupId,
  authorId,
  addOptimisticMember,
}: GroupInviteMembersInputProps) => {
  const refWrapper = useRef<HTMLDivElement>(null);
  const { isFocused, handleFocus, handleBlur } = useFocusState();

  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<UserDetail[]>([]);
  const [isInvitingId, setIsInvitingId] = useState('');
  const [isPending, startTransition] = useTransition();

  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleSearch = useCallback(async () => {
    if (!debouncedSearch) return;

    const { data: friendsList } = await getFriendsByUserId(
      authorId,
      debouncedSearch,
    );

    if (friendsList) {
      setFriends(friendsList);
    }
  }, [debouncedSearch, authorId]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleInvite = async (friendId: string) => {
    setIsInvitingId(friendId);

    startTransition(async () => {
      try {
        const invitedFriend = friends.find(
          (member) => member.id.toString() === friendId,
        );

        if (invitedFriend) {
          addOptimisticMember({
            id: invitedFriend.id,
            documentId: invitedFriend.documentId || invitedFriend.id.toString(),
            role: GroupRole.MEMBER,
            user: invitedFriend,
          });
        }

        await inviteToGroup(groupId, friendId);

        toast({
          variant: 'success',
          title: 'Success',
          description: 'Friend invited successfully',
        });
      } catch (error) {
        // Refresh the friends list on error
        handleSearch();

        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to invite friend',
        });
      } finally {
        setIsInvitingId('');
      }
    });
  };

  useOnClickOutside(refWrapper, handleBlur);

  return (
    <div ref={refWrapper} className="relative">
      <AutoCompleteInput
        startIcon={<SearchIcon size={16} />}
        placeholder="Search friends to invite..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={handleFocus}
      />

      {isFocused && friends.length > 0 && (
        <div className="absolute z-50 bottom-9 left-0 w-full max-h-[320px] overflow-auto rounded-[4px] border border-input bg-white dark:bg-dark-500 transition-all duration-300 ease-in-out">
          <ul className="shadow-sphere-light">
            {friends.map(
              ({ id, profilePicture, firstName, lastName, location }) => (
                <li
                  key={id}
                  className="cursor-pointer flex justify-between items-center px-3 py-1 gap-2.5 hover:bg-gray-600 hover:dark:bg-dark-500"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-fit h-fit rounded-full relative">
                      <Avatar size="md">
                        <AvatarImage
                          src={profilePicture}
                          alt={`Avatar of the friend-${id}`}
                        />
                        <AvatarFallback>
                          {getFirstLetters(firstName, lastName)}
                        </AvatarFallback>
                      </Avatar>
                      {location && (
                        <Circle className="border-[1.4px] border-white absolute bottom-0 right-[-3px] w-[18px] h-[18px]">
                          <CircleFlag countryCode={location.countryCode} />
                        </Circle>
                      )}
                    </div>
                    <Text className="leading-[18.2px] dark:text-gray-100">
                      {getFullName(firstName, lastName)}
                      <br />
                      <Label className="text-2xs dark:text-neutral-100">
                        {location?.city}
                      </Label>
                    </Text>
                  </div>
                  <Button
                    data-testid="button-invite"
                    size="sm"
                    onClick={() => handleInvite(id.toString())}
                    disabled={
                      isPending ||
                      groupMembers.some((member) => member.user.id === id)
                    }
                    isLoading={isPending && isInvitingId === id.toString()}
                    className="ml-2"
                  >
                    Invite
                  </Button>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
