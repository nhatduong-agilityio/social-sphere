'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

// Icons
import { SearchIcon } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SearchInput } from '@/components/ui/search-input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Hooks
import { useDebounce } from '@/hooks/use-debounce';
import { useDisclosure } from '@/hooks/use-disclosure';
import { ComposeFeedFormValues } from '../hooks/use-compose-feed-form';

// Types
import { UserDetail } from '@/types/user';

// Actions
import { getFriends, getFriendsByName } from '../actions/get-friends';

// Utils
import { getFirstLetters, getFullName } from '@/utils/string';

const SearchBar = ({
  searchFriend,
  setSearchFriend,
}: {
  searchFriend: string;
  setSearchFriend: (value: string) => void;
}) => {
  const { isOpen, onOpen } = useDisclosure();

  return (
    <div className="flex items-center gap-2">
      {isOpen ? (
        <SearchInput
          placeholder="Search People"
          className="lg:h-9 rounded-full hover:border-gray-900"
          value={searchFriend}
          onChange={(event) => setSearchFriend(event.target.value)}
        />
      ) : (
        <Button
          variant="unstyle"
          className="hover:bg-transparent p-0"
          onClick={onOpen}
        >
          <SearchIcon size={16} />
        </Button>
      )}
      <Button variant="link" size="link" className="text-2xs text-neutral-400">
        Create Group
      </Button>
    </div>
  );
};

interface ComposeFriendsListProps {
  form: UseFormReturn<ComposeFeedFormValues>;
}

export const ComposeFriendsList = ({ form }: ComposeFriendsListProps) => {
  const [searchFriend, setSearchFriend] = useState('');
  const [friends, setFriends] = useState<UserDetail[]>([]);

  const debouncedSearchFriend = useDebounce(searchFriend, 300);

  const handleFriendsList = useCallback(async () => {
    const { data } = debouncedSearchFriend
      ? await getFriendsByName(debouncedSearchFriend)
      : await getFriends();
    if (data) setFriends(data);
  }, [debouncedSearchFriend]);

  useEffect(() => {
    handleFriendsList();
  }, [handleFriendsList]);

  const friendsList = useMemo(
    () => (
      <FormField
        control={form.control}
        name="sendFriends"
        render={() => (
          <FormItem className="px-[6px]">
            {friends.map(({ avatar, id, firstName, lastName }) => (
              <FormField
                key={id}
                control={form.control}
                name="sendFriends"
                render={({ field }) => (
                  <FormItem
                    key={id}
                    className="flex justify-between items-center py-[6px] space-y-0 group"
                  >
                    <div className="flex items-center space-x-2.5 space-y-0">
                      <FormControl>
                        <Checkbox
                          className="w-[22px] h-[22px] group-hover:border-primary transition-colors duration-200"
                          variant="circle"
                          checked={field.value?.includes(id)}
                          onCheckedChange={(checked) => {
                            const currentValue = Array.isArray(field.value)
                              ? field.value
                              : [];
                            return checked
                              ? field.onChange([...currentValue, id])
                              : field.onChange(
                                  currentValue.filter((item) => item !== id),
                                );
                          }}
                        />
                      </FormControl>
                      <Avatar className="w-[38px] h-[38px]">
                        <AvatarImage
                          src={avatar}
                          alt={`Avatar of the friend-${id}`}
                        />
                        <AvatarFallback>
                          {getFirstLetters(firstName, lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <FormLabel variant="neutral">
                        {getFullName(firstName, lastName)}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </FormItem>
        )}
      />
    ),
    [friends, form.control],
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-4 px-2.5">
        <Label className="text-2xs">Send in a message</Label>
        <SearchBar
          searchFriend={searchFriend}
          setSearchFriend={setSearchFriend}
        />
      </div>
      {friendsList}
    </div>
  );
};
