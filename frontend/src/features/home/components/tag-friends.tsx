'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { CircleFlag } from 'react-circle-flags';

// Icons
import { SearchIcon } from 'lucide-react';

// Components
import { AutoCompleteInput } from '@/components/sections';

// Hooks
import { useDebounce } from '@/hooks';

// Actions
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Circle,
  Text,
  Label,
  Button,
} from '@/components/ui';

// Actions
import { getFriendsByName } from '../actions';

// Types
import { UserDetail } from '@/types';

// Utils
import { cn, getFirstLetters, getFullName } from '@/utils';

interface TagFriendsProps {
  hasSelectedValue?: boolean;
  variant?: 'primary' | 'secondary';
  label?: string;
  placeholder?: string;
  onSelectFriend: (friendId: string) => void;
  onCloseTagFriends: () => void;
}

const FriendItem = ({
  friend,
  onSelectFriend,
}: {
  friend: UserDetail;
  onSelectFriend: () => void;
}) => {
  const { profilePicture, id, firstName, lastName, location } = friend;

  return (
    <li
      className="cursor-pointer flex items-center px-3 py-1 gap-2.5 hover:bg-gray-600 hover:dark:bg-dark-500"
      onClick={onSelectFriend}
    >
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
    </li>
  );
};

export const TagFriends = memo(
  ({
    hasSelectedValue = false,
    variant = 'primary',
    label = 'Friends',
    placeholder = 'Who are you with?',
    onSelectFriend,
    onCloseTagFriends,
  }: TagFriendsProps) => {
    const [searchFriend, setSearchFriend] = useState('');
    const [friends, setFriends] = useState<UserDetail[]>([]);

    const debouncedSearchFriend = useDebounce(searchFriend, 300);
    const isSecondary = variant === 'secondary';

    const handleFriendsList = useCallback(async () => {
      if (!debouncedSearchFriend) return;
      const { data } = await getFriendsByName(debouncedSearchFriend);
      if (data) setFriends(data);
    }, [debouncedSearchFriend]);

    useEffect(() => {
      handleFriendsList();
    }, [handleFriendsList]);

    const handleSelectFriend = useCallback(
      ({ id, firstName, lastName }: UserDetail) => {
        const friendName = getFullName(firstName, lastName);

        onSelectFriend(id.toString());
        setSearchFriend(hasSelectedValue ? friendName : '');
        setFriends([]);
      },
      [hasSelectedValue, onSelectFriend],
    );

    const friendsList = useMemo(
      () => (
        <ul className="shadow-sphere-light">
          {friends.map((friend) => (
            <FriendItem
              key={friend.id}
              friend={friend}
              onSelectFriend={() => handleSelectFriend(friend)}
            />
          ))}
        </ul>
      ),
      [friends, handleSelectFriend],
    );

    return (
      <div className="relative">
        <AutoCompleteInput
          additionalStartIconClass={cn(isSecondary && 'left-0 w-[70px]')}
          startIcon={
            isSecondary ? (
              <Button
                type="button"
                variant="unstyle"
                className="w-full text-white dark:text-white text-2xs border p-0 px-2.5 bg-neutral-200 dark:bg-dark-100 h-9 hover:bg-neutral-400/80 hover:dark:bg-neutral-400"
              >
                {label}&nbsp;:
              </Button>
            ) : (
              <SearchIcon size={16} />
            )
          }
          className={cn(isSecondary && 'pl-[74px] rounded-e-none')}
          placeholder={placeholder}
          variant="square"
          value={searchFriend}
          onChange={(e) => setSearchFriend(e.target.value)}
          onClose={onCloseTagFriends}
        />
        {friends.length > 0 && (
          <div className="absolute z-50 top-9 left-0 w-full max-h-[320px] overflow-auto rounded-[4px] border border-input bg-white dark:bg-dark-500 transition-all duration-300 ease-in-out">
            {friendsList}
          </div>
        )}
      </div>
    );
  },
);

TagFriends.displayName = 'TagFriends';
