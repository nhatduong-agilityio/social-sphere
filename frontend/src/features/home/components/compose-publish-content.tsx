'use client';

import { memo, useCallback, useRef } from 'react';

// Icons
import { EllipsisVerticalIcon } from 'lucide-react';

// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ComposeMediaPreview } from './compose-media-preview';
import { ComposeOptions } from './compose-options';
import { ComposeSelectAccess } from './compose-select-access';
import { ComposeGifPreview } from './compose-gif-preview';
import { GifPicker } from './gif-picker';

// Hooks
import { useComposeFeedForm } from '../hooks/use-compose-feed-form';
import { useDisclosure } from '@/hooks/use-disclosure';

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
      handleFileChange,
      handleRemoveMedia,
      handleGifSelect,
      handleRemoveGif,
    } = useComposeFeedForm();
    const mediaInputRef = useRef<HTMLInputElement>(null);

    const {
      isOpen: isOpenGifPicker,
      onOpen: onOpenGifPicker,
      onClose: onCloseGifPicker,
    } = useDisclosure();

    const handleSelectedGif = useCallback(
      (gifUrl: string) => {
        handleGifSelect(gifUrl);
        onCloseGifPicker();
      },
      [handleGifSelect, onCloseGifPicker],
    );

    return (
      <Form {...form}>
        <form>
          <div className="border-b border-gray-600 dark:border-dark-500 p-4">
            <div className="flex flex-row">
              <Avatar className="w-[42px] h-[42px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="ml-5 w-full">
                    <FormControl>
                      <Textarea
                        className="p-0"
                        variant="ghost"
                        size="sm"
                        placeholder="Write something about you..."
                        onFocus={onOpenOverlay}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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

            {isOpenGifPicker && (
              <GifPicker
                onGifSelect={handleSelectedGif}
                onCloseGifPicker={onCloseGifPicker}
              />
            )}
          </div>
          <ComposeOptions
            mediaInputRef={mediaInputRef}
            onFileChange={handleFileChange}
            onOpenOverlay={onOpenOverlay}
            onOpenGifPicker={onOpenGifPicker}
          />

          {isOverlayOpen && (
            <>
              <ComposeSelectAccess />
              <div className="p-2 flex gap-2 border-t border-gray-600 dark:border-dark-500">
                <Button
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
