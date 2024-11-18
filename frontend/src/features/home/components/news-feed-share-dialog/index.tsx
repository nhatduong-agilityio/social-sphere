'use client';

import { memo, useCallback, useState } from 'react';

// Constants
import { SHARE_OPTIONS } from '../../constants/share-news-feed';

// Components
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
} from '@/components/ui';
import { NewsFeedShareDialogControl } from './news-feed-share-dialog-control';
import { NewsFeedCardPreview } from '../news-feed-card-preview';
import { NewsFeedShareDialogAbout } from './news-feed-share-dialog-about';
import { ShareDropdown } from './share-dropdown';
import { ShareLocationPicker } from './share-location-picker';
import { TagFriends } from '../tag-friends';
import { ComposeActivityPreview } from '../compose-activity-preview';
import { SelectedOptionContent } from './selected-option-content';

// Types
import { NewsFeed, Option } from '@/types';

// Hooks
import { useShareForm } from '../../hooks';
import { useShareActionsDisclosure } from '../../hooks/use-share-actions-disclosure';

interface NewsFeedShareDialogProps {
  newsFeed: NewsFeed;
  onShare: (data: FormData) => void;
}

export const NewsFeedShareDialog = memo(
  ({ newsFeed, onShare }: NewsFeedShareDialogProps) => {
    const {
      form,
      selectedTagFriends,
      handleTagFriends,
      getFormData,
      handleRemoveFriend,
      handleFriendsFeed,
      handleRemoveFriendsFeed,
      handleFriendsMessage,
      handleRemoveFriendsMessage,
      handleSelectGroup,
      handleRemoveGroup,
    } = useShareForm();
    const { tagFriends, location, onOpenTagFriends, onOpenLocation } =
      useShareActionsDisclosure();
    const [selectedOption, setSelectedOption] = useState<Option>(
      SHARE_OPTIONS[0],
    );

    const handleRemove = useCallback((removeCallback: () => void) => {
      removeCallback();
      setSelectedOption(SHARE_OPTIONS[0]);
    }, []);

    const handleAction = async (_: FormData) => {
      const values = form.getValues();
      const enrichedFormData = getFormData(values);
      return onShare(enrichedFormData);
    };

    return (
      <DialogContent className="p-0 gap-0 md:max-w-[480px]">
        <Form {...form}>
          <form className="w-full" action={handleAction}>
            <DialogHeader className="p-2 border-b border-gray-600 dark:border-dark-500">
              <ShareDropdown
                options={SHARE_OPTIONS}
                selectedOption={selectedOption}
                onSelectedOption={setSelectedOption}
              />
              <DialogTitle className="hidden" />
              <DialogDescription className="hidden" />
            </DialogHeader>
            <div className="w-full">
              <SelectedOptionContent
                form={form}
                selectedOption={selectedOption}
                onFriendsFeed={handleFriendsFeed}
                onRemoveFriendsFeed={handleRemoveFriendsFeed}
                onFriendsMessage={handleFriendsMessage}
                onRemoveFriendsMessage={handleRemoveFriendsMessage}
                onSelectGroup={handleSelectGroup}
                onRemoveGroup={handleRemoveGroup}
                onRemove={handleRemove}
              />

              <div className="flex flex-col px-3 py-2">
                <NewsFeedShareDialogAbout form={form} />
                <NewsFeedCardPreview newsFeed={newsFeed} />
              </div>

              {tagFriends.isOpen && (
                <TagFriends
                  variant="secondary"
                  onCloseTagFriends={tagFriends.onClose}
                  onSelectFriend={handleTagFriends}
                />
              )}

              {location.isOpen && (
                <ShareLocationPicker
                  form={form}
                  onCloseLocationPicker={location.onClose}
                />
              )}

              <div className="flex flex-col p-0.5">
                <ComposeActivityPreview
                  hasWithFriends={false}
                  friendIds={selectedTagFriends}
                  onRemoveFriend={handleRemoveFriend}
                />
              </div>
            </div>
            <NewsFeedShareDialogControl
              form={form}
              onOpenTagFriends={onOpenTagFriends}
              onOpenLocation={onOpenLocation}
            />
          </form>
        </Form>
      </DialogContent>
    );
  },
);

NewsFeedShareDialog.displayName = 'NewsFeedShareDialog';
