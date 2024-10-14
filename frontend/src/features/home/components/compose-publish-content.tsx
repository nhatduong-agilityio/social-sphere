'use client';

import { memo, useRef } from 'react';

// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { ComposeMediaPreview } from './compose-media-preview';
import { ComposeOptions } from './compose-options';

// Hooks
import { useComposeFeedForm } from '../hooks/use-compose-feed-form';

export const ComposePublishContent = memo(() => {
  const { form, selectedImageUrl, handleFileChange, handleRemoveMedia } =
    useComposeFeedForm();
  const mediaInputRef = useRef<HTMLInputElement>(null);

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
        </div>
        <ComposeOptions
          mediaInputRef={mediaInputRef}
          onFileChange={handleFileChange}
        />
      </form>
    </Form>
  );
});

ComposePublishContent.displayName = 'ComposePublishContent';
