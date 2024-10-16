import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { CircleFlag } from 'react-circle-flags';

// Icons
import { SearchIcon } from 'lucide-react';

// Components
import { AutoCompleteInput } from '@/components/sections/auto-complete-input';

// Hooks
import { useDebounce } from '@/hooks/use-debounce';

// Actions
import { UserDetail } from '@/types/user';
import { getFriendsByName } from '../actions/get-friends';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getFirstLetters, getFullName } from '@/utils/string';
import { Circle } from '@/components/ui/circle';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';

interface TagFriendsProps {
  onSelectFriend: (friendId: string) => void;
  onCloseTagFriends: () => void;
}

const FriendItem = ({
  friend,
  onSelectFriend,
}: {
  friend: UserDetail;
  onSelectFriend: (friendId: string) => void;
}) => {
  const { avatar, id, firstName, lastName, location } = friend;

  return (
    <li
      className="cursor-pointer flex items-center px-3 py-1 gap-2.5 hover:bg-gray-600 hover:dark:bg-dark-500"
      onClick={() => onSelectFriend(id)}
    >
      <div className="w-fit h-fit rounded-full relative">
        <Avatar size="md">
          <AvatarImage src={avatar} alt={`Avatar of the friend-${id}`} />
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
      <Text className="text-base leading-[18.2px] dark:text-gray-100">
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
  ({ onSelectFriend, onCloseTagFriends }: TagFriendsProps) => {
    const [searchFriend, setSearchFriend] = useState('');
    const [friends, setFriends] = useState<UserDetail[]>([]);

    const debouncedSearchFriend = useDebounce(searchFriend, 300);

    const handleFriendsList = useCallback(async () => {
      if (!debouncedSearchFriend) return;
      const { data } = await getFriendsByName(debouncedSearchFriend);
      if (data) setFriends(data);
    }, [debouncedSearchFriend]);

    useEffect(() => {
      handleFriendsList();
    }, [handleFriendsList]);

    const friendsList = useMemo(
      () => (
        <ul className="shadow-sphere-light">
          {friends.map((friend) => (
            <FriendItem
              key={friend.id}
              friend={friend}
              onSelectFriend={onSelectFriend}
            />
          ))}
        </ul>
      ),
      [friends, onSelectFriend],
    );

    return (
      <div className="relative">
        <AutoCompleteInput
          startIcon={<SearchIcon size={16} />}
          placeholder="Who are you with?"
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
