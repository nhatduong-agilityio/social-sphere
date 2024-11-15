import { UseFormReturn } from 'react-hook-form';

// Constants
import { MOCK_PAGES } from '@/__mocks__/user';

// Components
import { SharePageDropdown } from './share-page-dropdown';
import { GroupPicker } from '../group-picker';
import { TagFriends } from '../tag-friends';
import { SHARE_OPTIONS } from '../../constants/share-news-feed';

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
  onRemove: (callback: () => void) => void;
}

export const SelectedOptionContent = ({
  form,
  selectedOption,
  onFriendsFeed,
  onRemoveFriendsFeed,
  onFriendsMessage,
  onRemoveFriendsMessage,
  onSelectGroup,
  onRemoveGroup,
  onRemove,
}: SelectedOptionContentProps) => {
  const optionContentMap = {
    [SHARE_OPTIONS[1].value]: (
      <TagFriends
        hasSelectedValue
        variant="secondary"
        onCloseTagFriends={() => onRemove(onRemoveFriendsFeed)}
        onSelectFriend={onFriendsFeed}
      />
    ),
    [SHARE_OPTIONS[2].value]: (
      <GroupPicker
        hasSelectedValue
        variant="secondary"
        onSelectGroup={onSelectGroup}
        onCloseGroupPicker={() => onRemove(onRemoveGroup)}
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
        onCloseTagFriends={() => onRemove(onRemoveFriendsMessage)}
        onSelectFriend={onFriendsMessage}
      />
    ),
  };

  return optionContentMap[selectedOption.value] || null;
};
