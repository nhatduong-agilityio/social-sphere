'use client';

import { memo } from 'react';

// Icons
import { CheckIcon, PlusIcon, SearchIcon } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SearchInput } from '@/components/ui/search-input';
import { Input } from '@/components/ui/input';
import { Circle } from '@/components/ui/circle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DialogClose, DialogContainer } from '@/components/ui/dialog';

// Hooks
import { useDisclosure } from '@/hooks/use-disclosure';

// Types
import { UserDetail } from '@/types/user';

// Utils
import { getFirstLetters, getFullName } from '@/utils/string';

export const ComposeSearchBar = memo(
  ({
    searchFriend,
    setSearchFriend,
    friendsList,
    selectedFriends,
  }: {
    searchFriend: string;
    setSearchFriend: (value: string) => void;
    friendsList: JSX.Element;
    selectedFriends: UserDetail[];
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
        <DialogContainer
          trigger={
            <Button
              type="button"
              variant="link"
              size="link"
              className="text-2xs text-neutral-400"
            >
              Create Group
            </Button>
          }
          title="Create Group"
          contentClassName="p-0 gap-0"
          headerClassName="px-3 py-2 border-b border-gray-600 dark:border-dark-500"
          footerClassName="p-2 border-t border-gray-600 dark:border-dark-500"
          footer={
            <>
              <DialogClose asChild>
                <Button
                  size="md"
                  variant="fixed"
                  className="bg-gray-200 border-gray-200"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button size="md" variant="primary" disabled>
                Create a Group
              </Button>
            </>
          }
        >
          <div className="p-3 flex gap-2.5 border-b border-gray-600 dark:border-dark-500">
            <div className="flex items-center justify-center w-[42px] h-[42px] bg-gray-500 dark:bg-blue-900 rounded-[4px]">
              <PlusIcon size={18} className="text-neutral-400" />
            </div>
            <Input variant="ghost" placeholder="Give the group a name" />
          </div>
          <div className="h-[460px] flex">
            <div className="w-full h-full flex flex-col">
              <div className="p-3 border-b border-gray-600 dark:border-dark-500">
                <SearchInput
                  className="h-8 lg:h-8 rounded-none hover:border-gray-900 dark:bg-transparent dark:border-none"
                  placeholder="Search for friends to add"
                  value={searchFriend}
                  onChange={(event) => setSearchFriend(event.target.value)}
                />
              </div>
              <div className="h-full w-full overflow-auto py-3">
                {friendsList}
              </div>
            </div>
            <div className="h-full w-full flex flex-col max-w-[210px] bg-black-haze-50 dark:bg-card border-l border-gray-600 dark:border-dark-500">
              <div className="flex justify-between items-center p-3">
                <Label size="tiny" className="leading-8">
                  SELECTED
                </Label>
                <Label className="text-sm leading-8">
                  {selectedFriends.length}
                </Label>
              </div>
              <ul className="p-3">
                {selectedFriends.map(({ id, firstName, lastName, avatar }) => (
                  <li key={id} className="flex items-center gap-3 py-[6px]">
                    <div className="w-10 h-10 relative">
                      <Avatar>
                        <AvatarImage
                          src={avatar}
                          alt={`Avatar of the user-${getFullName(firstName, lastName)} in team`}
                        />
                        <AvatarFallback className="bg-neutral-400">
                          {getFirstLetters(firstName, lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <Circle className="border-2 border-white absolute bottom-0 right-[-1px] w-[18px] h-[18px] bg-neutral-400">
                        <CheckIcon size={8} className="text-white" />
                      </Circle>
                    </div>
                    <Label variant="neutral">
                      {getFullName(firstName, lastName)}
                    </Label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContainer>
      </div>
    );
  },
);
ComposeSearchBar.displayName = 'ComposeSearchBar';
