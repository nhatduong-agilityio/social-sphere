'use client';

import { memo, useCallback, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Picker, { EmojiClickData } from 'emoji-picker-react';

// Icons
import { SmileIcon } from 'lucide-react';

// Components
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  Textarea,
} from '@/components/ui';

// Hooks
import { useDisclosure, useOnClickOutside } from '@/hooks';
import { ShareFormValues } from '../../hooks';

interface NewsFeedShareDialogAboutProps {
  form: UseFormReturn<ShareFormValues>;
}

export const NewsFeedShareDialogAbout = memo(
  ({ form }: NewsFeedShareDialogAboutProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const wrapperEmoji = useRef<HTMLDivElement>(null);

    const {
      isOpen: isOpenEmoji,
      onClose: onCloseEmoji,
      onToggle: onToggleEmoji,
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

    useOnClickOutside(wrapperEmoji, onCloseEmoji);

    return (
      <div className="flex items-center">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full border-none">
              <FormControl>
                <Textarea
                  className="p-2.5 min-h-0 max-h-[41px] rounded-none resize-none"
                  variant="ghost"
                  placeholder="Say something about this..."
                  {...field}
                  ref={textareaRef}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex relative px-3">
          <Button
            variant="link"
            size="fit"
            type="button"
            className="text-neutral-300 hover:text-primary dark:hover:text-primary text-3xs"
            onClick={onToggleEmoji}
          >
            <SmileIcon size={16} />
          </Button>
          {isOpenEmoji && (
            <div ref={wrapperEmoji} className="absolute z-10 top-8 right-0">
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
      </div>
    );
  },
);

NewsFeedShareDialogAbout.displayName = 'NewsFeedShareDialogAbout';
