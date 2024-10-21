'use client';

import { useCallback, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

// Components
import { Label } from '@/components/ui/label';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ComposeSearchBar } from './compose-search-bar';

// Hooks
import { useDebounce } from '@/hooks/use-debounce';
import { ComposeFeedFormValues } from '../hooks/use-compose-feed-form';

// Types
import { UserDetail } from '@/types/user';

// Actions
import { getFriends, getFriendsByName } from '../actions/get-friends';

// Utils
import { getFirstLetters, getFullName } from '@/utils/string';
import { cn } from '@/utils/cn';

const FriendsList = ({
  friends,
  form,
  variant = 'default',
}: {
  friends: UserDetail[];
  form: UseFormReturn<ComposeFeedFormValues>;
  variant?: 'default' | 'reserve';
}) => (
  <FormField
    control={form.control}
    name="sendFriends"
    render={() => (
      <FormItem className={cn('px-[6px]', variant === 'reserve' && 'px-3')}>
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
                <div
                  className={cn(
                    'flex items-center space-x-2.5 space-y-0',
                    variant === 'reserve' &&
                      'flex-row-reverse justify-between w-full space-x-0',
                  )}
                >
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
                  <div className="flex items-center space-x-2.5">
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
                </div>
              </FormItem>
            )}
          />
        ))}
      </FormItem>
    )}
  />
);

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

  const selectedFriendIds = form.watch('sendFriends') || [];
  const selectedFriends = friends.filter((friend) =>
    selectedFriendIds.includes(friend.id),
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-4 px-2.5">
        <Label className="text-2xs">Send in a message</Label>
        <ComposeSearchBar
          searchFriend={searchFriend}
          setSearchFriend={setSearchFriend}
          friendsList={
            <FriendsList form={form} friends={friends} variant="reserve" />
          }
          selectedFriends={selectedFriends}
        />
      </div>
      <FriendsList form={form} friends={friends} />
    </div>
  );
};
