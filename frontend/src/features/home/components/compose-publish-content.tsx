'use client';

import { memo, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useFormState, useFormStatus } from 'react-dom';

// Icons
import { EllipsisVerticalIcon } from 'lucide-react';

// Components
import { Button, Form } from '@/components/ui';
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
import { useComposeFeedForm, useComposeDisclosure } from '../hooks';
import { toast, useDisclosure } from '@/hooks';

// Actions
import { publishNewsFeed, PublishState } from '../actions';

interface ComposePublishContentProps {
  isOverlayOpen: boolean;
  onOpenOverlay: () => void;
}

const initialState: PublishState = {
  message: null,
  error: null,
};

export const ComposePublishContent = memo(
  ({ isOverlayOpen, onOpenOverlay }: ComposePublishContentProps) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const {
      form,
      getFormData,
      selectedImageUrl,
      selectedGifUrl,
      selectedTagFriends,
      selectedMood,
      selectedLocation,
      handleSelectMood,
      handleFileChange,
      handleRemoveMedia,
      handleGifSelect,
      handleRemoveGif,
      handleRemoveFriend,
      handleTagFriends,
      handleRemoveMood,
      handleRemoveAllFriends,
    } = useComposeFeedForm();

    // Management server action to publish post
    const [state, formAction] = useFormState(
      publishNewsFeed.bind(null, userId),
      initialState,
    );
    const { pending } = useFormStatus();

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
    const viewMore = useDisclosure();

    const handleSelectedGif = useCallback(
      (gifUrl: string) => {
        handleGifSelect(gifUrl);
        gifPicker.onClose();
      },
      [gifPicker, handleGifSelect],
    );

    const disableButton = !form.getValues('content') || pending;

    const resetFormState = useCallback(() => {
      form.reset();
      handleRemoveMedia();
      handleRemoveGif();
      handleRemoveAllFriends();
      handleRemoveMood();
    }, [
      form,
      handleRemoveMedia,
      handleRemoveGif,
      handleRemoveAllFriends,
      handleRemoveMood,
    ]);

    useEffect(() => {
      if (state.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: state.error,
        });
      }

      if (state.message) {
        toast({
          variant: 'success',
          title: 'Success',
          description: state.message,
        });
        resetFormState();
      }
    }, [resetFormState, state]);

    const handleAction = async (_: FormData) => {
      const values = form.getValues();
      const enrichedFormData = getFormData(values);
      return formAction(enrichedFormData);
    };

    return (
      <Form {...form}>
        <form action={handleAction}>
          <div className="border-b border-gray-600 dark:border-dark-500 p-4">
            <ComposeFormContent
              formControl={form.control}
              onOpenOverlay={onOpenOverlay}
            />

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

            {(selectedTagFriends || selectedMood || location) && (
              <ComposeActivityPreview
                mood={selectedMood}
                friendIds={selectedTagFriends}
                location={selectedLocation}
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
              <ShareLinkPicker
                form={form}
                onCloseShareLinkPicker={shareLink.onClose}
              />
            )}

            {location.isOpen && (
              <LocationPicker
                form={form}
                onCloseLocationPicker={location.onClose}
              />
            )}
          </div>

          <ComposeOptions
            isOverlayOpen={isOverlayOpen}
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
              <ComposeSelectAccess
                form={form}
                isOpenFriendsList={viewMore.isOpen}
              />
              <div className="p-2 flex gap-2 border-t border-gray-600 dark:border-dark-500">
                {!viewMore.isOpen && (
                  <Button
                    type="button"
                    size="md"
                    variant="fixed"
                    className="p-[6px] pl-2 pr-3 text-2xs font-sans"
                    onClick={viewMore.onOpen}
                  >
                    <EllipsisVerticalIcon size={16} className="mr-1" /> View
                    More
                  </Button>
                )}
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  className="w-full hover:shadow-none hover:opacity-100 text-2xs"
                  disabled={disableButton}
                  isLoading={pending}
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
