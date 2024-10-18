'use client';

import { memo, useCallback, useRef } from 'react';

// Icons
import { EllipsisVerticalIcon } from 'lucide-react';

// Components
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ComposeMediaPreview } from './compose-media-preview';
import { ComposeOptions } from './compose-options';
import { ComposeSelectAccess } from './compose-select-access';
import { ComposeGifPreview } from './compose-gif-preview';
import { GifPicker } from './gif-picker';
import { TagFriends } from './tag-friends';
import { ComposeActivityPreview } from './compose-activity-preview';
import { MoodActivityPicker } from './mood-activity-picker';
import { ShareLinkPicker } from './share-link-picker';
import { LocationPicker } from './location-picker';
import { ComposeFormContent } from './compose-form-content';

// Hooks
import { useComposeFeedForm } from '../hooks/use-compose-feed-form';
import { useComposeDisclosure } from '../hooks/use-compose-disclosure';

interface ComposePublishContentProps {
  isOverlayOpen: boolean;
  onOpenOverlay: () => void;
}

export const ComposePublishContent = memo(
  ({ isOverlayOpen, onOpenOverlay }: ComposePublishContentProps) => {
    const {
      form,
      selectedImageUrl,
      selectedGifUrl,
      selectedTagFriends,
      selectedMood,
      handleSelectMood,
      handleFileChange,
      handleRemoveMedia,
      handleGifSelect,
      handleRemoveGif,
      handleRemoveFriend,
      handleTagFriends,
      handleRemoveMood,
    } = useComposeFeedForm();

    const {
      gifPicker,
      tagFriends,
      moods,
      shareLink,
      location,
      onOpenGifPicker,
      onOpenTagFriends,
      onOpenMoods,
      onOpenShareLink,
      onOpenLocation,
    } = useComposeDisclosure();

    const mediaInputRef = useRef<HTMLInputElement>(null);

    const handleSelectedGif = useCallback(
      (gifUrl: string) => {
        handleGifSelect(gifUrl);
        gifPicker.onClose();
      },
      [gifPicker, handleGifSelect],
    );

    return (
      <Form {...form}>
        <form>
          <div className="border-b border-gray-600 dark:border-dark-500 p-4">
            <ComposeFormContent onOpenOverlay={onOpenOverlay} />

            {selectedImageUrl && (
              <ComposeMediaPreview
                imageUrl={selectedImageUrl}
                onRemove={handleRemoveMedia}
              />
            )}

            {selectedGifUrl && (
              <ComposeGifPreview
                imageUrl={selectedGifUrl}
                onRemove={handleRemoveGif}
              />
            )}

            {(selectedTagFriends || selectedMood) && (
              <ComposeActivityPreview
                mood={selectedMood}
                friendIds={selectedTagFriends}
                onRemoveFriend={handleRemoveFriend}
              />
            )}

            {gifPicker.isOpen && (
              <GifPicker
                onGifSelect={handleSelectedGif}
                onCloseGifPicker={gifPicker.onClose}
              />
            )}

            {tagFriends.isOpen && (
              <TagFriends
                onCloseTagFriends={tagFriends.onClose}
                onSelectFriend={handleTagFriends}
              />
            )}

            {moods.isOpen && (
              <MoodActivityPicker
                defaultMood={selectedMood}
                onCloseMoodActivityPicker={moods.onClose}
                onSelectMood={handleSelectMood}
                onRemoveMood={handleRemoveMood}
              />
            )}

            {shareLink.isOpen && (
              <ShareLinkPicker onCloseShareLinkPicker={shareLink.onClose} />
            )}

            {location.isOpen && (
              <LocationPicker onCloseLocationPicker={location.onClose} />
            )}
          </div>

          <ComposeOptions
            mediaInputRef={mediaInputRef}
            onFileChange={handleFileChange}
            onOpenOverlay={onOpenOverlay}
            onOpenGifPicker={onOpenGifPicker}
            onOpenTagFriends={onOpenTagFriends}
            onOpenMoods={onOpenMoods}
            onOpenShareLink={onOpenShareLink}
            onOpenLocation={onOpenLocation}
          />

          {isOverlayOpen && (
            <>
              <ComposeSelectAccess />
              <div className="p-2 flex gap-2 border-t border-gray-600 dark:border-dark-500">
                <Button
                  type="button"
                  size="md"
                  variant="fixed"
                  className="p-[6px] pl-2 pr-3 text-2xs"
                >
                  <EllipsisVerticalIcon size={16} className="mr-1" /> View More
                </Button>
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  className="w-full hover:shadow-none hover:opacity-100"
                >
                  Publish
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    );
  },
);

ComposePublishContent.displayName = 'ComposePublishContent';
