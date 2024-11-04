import { memo, useCallback, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

// Constants
import { MOCK_PAGES } from '@/__mocks__/user';

// Components
import { SHARE_OPTIONS } from '../../constants/share-news-feed';
import { TagFriends } from '../tag-friends';
import { GroupPicker } from '../group-picker';
import { SharePageDropdown } from './share-page-dropdown';

// Types
import { Option } from '@/types';

// Hooks
import { ShareFormValues } from '../../hooks';

interface SelectedOptionContentProps {
  form: UseFormReturn<ShareFormValues>;
  selectedOption: Option;
  onFriendsFeed: (friendId: string) => void;
  onRemoveFriendsFeed: () => void;
  onFriendsMessage: (friendId: string) => void;
  onRemoveFriendsMessage: () => void;
  onSelectGroup: (groupId: string) => void;
  onRemoveGroup: () => void;
  onSelectedOption: (option: Option) => void;
}

export const SelectedOptionContent = memo(
  ({
    form,
    selectedOption,
    onFriendsFeed,
    onRemoveFriendsFeed,
    onFriendsMessage,
    onRemoveFriendsMessage,
    onSelectGroup,
    onRemoveGroup,
    onSelectedOption,
  }: SelectedOptionContentProps) => {
    const handleRemove = useCallback(
      (removeCallback: () => void) => {
        removeCallback();
        onSelectedOption(SHARE_OPTIONS[0]);
      },
      [onSelectedOption],
    );

    const optionContentMap = useMemo(
      () => ({
        [SHARE_OPTIONS[1].value]: (
          <TagFriends
            hasSelectedValue
            variant="secondary"
            onCloseTagFriends={() => handleRemove(onRemoveFriendsFeed)}
            onSelectFriend={onFriendsFeed}
          />
        ),
        [SHARE_OPTIONS[2].value]: (
          <GroupPicker
            hasSelectedValue
            variant="secondary"
            onSelectGroup={onSelectGroup}
            onCloseGroupPicker={() => handleRemove(onRemoveGroup)}
          />
        ),
        [SHARE_OPTIONS[3].value]: (
          <SharePageDropdown form={form} pages={MOCK_PAGES} />
        ),
        [SHARE_OPTIONS[4].value]: (
          <TagFriends
            label="To"
            placeholder="Message a friend"
            hasSelectedValue
            variant="secondary"
            onCloseTagFriends={() => handleRemove(onRemoveFriendsMessage)}
            onSelectFriend={onFriendsMessage}
          />
        ),
      }),
      [
        form,
        handleRemove,
        onFriendsFeed,
        onFriendsMessage,
        onRemoveFriendsFeed,
        onRemoveFriendsMessage,
        onRemoveGroup,
        onSelectGroup,
      ],
    );

    return optionContentMap[selectedOption.value] || null;
  },
);

SelectedOptionContent.displayName = 'SelectedOptionContent';
