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
import { getGroups } from '../actions';

// Types
import { GroupDetail } from '@/types';

// Utils
import { cn, getFirstLetters } from '@/utils';

interface GroupPickerProps {
  hasSelectedValue?: boolean;
  variant?: 'primary' | 'secondary';
  label?: string;
  placeholder?: string;
  authorId: string;
  onSelectGroup: (groupId: string) => void;
  onCloseGroupPicker: () => void;
}

const GroupItem = ({
  group,
  onSelectGroup,
}: {
  group: GroupDetail;
  onSelectGroup: () => void;
}) => {
  const { avatar, id, name, description } = group;

  return (
    <li
      className="cursor-pointer flex items-center px-3 py-1 gap-2.5 hover:bg-gray-600 hover:dark:bg-dark-500"
      onClick={onSelectGroup}
    >
      <div className="w-fit h-fit rounded-full relative">
        <Avatar size="md">
          <AvatarImage src={avatar} alt={`Avatar of the group-${id}`} />
          <AvatarFallback>{getFirstLetters(name, name)}</AvatarFallback>
        </Avatar>
        {location && (
          <Circle className="border-[1.4px] border-white absolute bottom-0 right-[-3px] w-[18px] h-[18px]">
            <CircleFlag countryCode="vn" />
          </Circle>
        )}
      </div>
      <Text className="leading-[18.2px] dark:text-gray-100">
        {name}
        <br />
        <Label className="text-2xs dark:text-neutral-100">{description}</Label>
      </Text>
    </li>
  );
};

export const GroupPicker = memo(
  ({
    hasSelectedValue = false,
    variant = 'primary',
    label = 'Group',
    placeholder = `Your group's name`,
    authorId,
    onSelectGroup,
    onCloseGroupPicker,
  }: GroupPickerProps) => {
    const [searchGroup, setSearchGroup] = useState('');
    const [groups, setgroups] = useState<GroupDetail[]>([]);

    const debouncedSearchGroup = useDebounce(searchGroup, 300);
    const isSecondary = variant === 'secondary';

    const handleGroupsList = useCallback(async () => {
      if (!debouncedSearchGroup) return;
      const { data: response } = await getGroups(
        authorId,
        debouncedSearchGroup,
      );
      if (response) setgroups(response.data);
    }, [authorId, debouncedSearchGroup]);

    useEffect(() => {
      handleGroupsList();
    }, [handleGroupsList]);

    const handleSelectFriend = useCallback(
      ({ id, name }: GroupDetail) => {
        onSelectGroup(id.toString());
        setSearchGroup(hasSelectedValue ? name : '');
        setgroups([]);
      },
      [hasSelectedValue, onSelectGroup],
    );

    const groupsList = useMemo(
      () => (
        <ul className="shadow-sphere-light">
          {groups.map((group) => (
            <GroupItem
              key={group.id}
              group={group}
              onSelectGroup={() => handleSelectFriend(group)}
            />
          ))}
        </ul>
      ),
      [groups, handleSelectFriend],
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
          value={searchGroup}
          onChange={(e) => setSearchGroup(e.target.value)}
          onClose={onCloseGroupPicker}
        />
        {groups.length > 0 && (
          <div className="absolute z-50 top-9 left-0 w-full max-h-[320px] overflow-auto rounded-[4px] border border-input bg-white dark:bg-dark-500 transition-all duration-300 ease-in-out">
            {groupsList}
          </div>
        )}
      </div>
    );
  },
);

GroupPicker.displayName = 'GroupPicker';
