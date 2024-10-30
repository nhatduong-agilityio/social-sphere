'use client';

import { ComponentProps, memo, useCallback, useRef } from 'react';
import Picker, { EmojiClickData } from 'emoji-picker-react';

// Icons
import { AtSignIcon, CameraIcon, SmileIcon } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UserCardPopover } from '@/components/sections';
import { Input } from '@/components/ui';
import { ComposeMediaPreview } from './compose-media-preview';
import { TagFriends } from './tag-friends';
import { ComposeActivityPreview } from './compose-activity-preview';

// Hooks
import { useCommentForm } from '../hooks';
import { useDisclosure, useOnClickOutside } from '@/hooks';

// Types
import { UserDetail } from '@/types';

interface NewsFeedCommentFormProps {
  user: UserDetail;
}

const ActionButton = ({
  children,
  ...props
}: ComponentProps<typeof Button>) => (
  <Button
    variant="link"
    size="fit"
    type="button"
    className="text-neutral-300 hover:text-primary dark:hover:text-primary text-3xs"
    {...props}
  >
    {children}
  </Button>
);

export const NewsFeedCommentForm = memo(
  ({ user }: NewsFeedCommentFormProps) => {
    const {
      form,
      handleFileChange,
      selectedImageUrl,
      handleRemoveMedia,
      handleTagFriends,
      selectedTagFriends,
      handleRemoveFriend,
    } = useCommentForm();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const wrapperEmoji = useRef<HTMLDivElement>(null);
    const mediaInputRef = useRef<HTMLInputElement>(null);

    const {
      isOpen: isOpenEmoji,
      onClose: onCloseEmoji,
      onToggle: onToggleEmoji,
    } = useDisclosure();
    const {
      isOpen: isOpenTagFriends,
      onClose: onCloseTagFriends,
      onToggle: onToggleTagFriends,
    } = useDisclosure();

    const onEmojiClick = useCallback(
      (emoji: EmojiClickData) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentContent = form.getValues('content') || '';

        const newContent =
          currentContent.substring(0, start) +
          emoji.emoji +
          currentContent.substring(end);

        form.setValue('content', newContent);

        const newCursorPos = start + emoji.emoji.length;
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      },
      [form],
    );

    const handleOptionClick = useCallback(() => {
      mediaInputRef.current?.click();
    }, [mediaInputRef]);

    useOnClickOutside(wrapperEmoji, onCloseEmoji);

    return (
      <Form {...form}>
        <form className="flex flex-col w-full border dark:border-blue-800 rounded-lg">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full border-none rounded-lg">
                <FormControl>
                  <Textarea
                    className="min-h-[128px] p-2.5 bg:transparent dark:bg-dark-500 rounded-none rounded-t-lg"
                    variant="ghost"
                    size="sm"
                    placeholder="Write a comment..."
                    {...field}
                    ref={textareaRef}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="media"
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    id="media-comment-upload"
                    type="file"
                    ref={mediaInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    aria-label="Upload Media Comment"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {selectedTagFriends.length > 0 && (
            <div className="px-3 pt-3">
              <ComposeActivityPreview
                friendIds={selectedTagFriends}
                onRemoveFriend={handleRemoveFriend}
              />
            </div>
          )}

          {isOpenTagFriends && (
            <div className="p-3">
              <TagFriends
                onCloseTagFriends={onCloseTagFriends}
                onSelectFriend={handleTagFriends}
              />
            </div>
          )}

          {selectedImageUrl && (
            <div className="p-3">
              <ComposeMediaPreview
                imageUrl={selectedImageUrl}
                onRemove={handleRemoveMedia}
              />
            </div>
          )}

          <div className="flex justify-between items-center p-2">
            <UserCardPopover user={user} variant="sm" />
            <div className="flex gap-4 items-center">
              <ActionButton onClick={onToggleTagFriends}>
                <AtSignIcon size={18} />
              </ActionButton>
              <div className="flex relative">
                <ActionButton onClick={onToggleEmoji}>
                  <SmileIcon size={18} />
                </ActionButton>
                {isOpenEmoji && (
                  <div
                    ref={wrapperEmoji}
                    className="absolute z-10 bottom-8 right-0"
                  >
                    <Picker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
              <ActionButton onClick={handleOptionClick}>
                <CameraIcon size={18} />
              </ActionButton>
              <Button variant="primary" className="text-2xs h-9">
                Post Comment
              </Button>
            </div>
          </div>
        </form>
      </Form>
    );
  },
);

NewsFeedCommentForm.displayName = 'NewsFeedCommentForm';
