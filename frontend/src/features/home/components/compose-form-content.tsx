'use client';

import { memo } from 'react';

// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

// Hooks
import { ComposeFeedFormValues } from '../hooks/use-compose-feed-form';
import { Control } from 'react-hook-form';

interface ComposeFormContentProps {
  onOpenOverlay: () => void;
  formControl: Control<ComposeFeedFormValues>;
}
export const ComposeFormContent = memo(
  ({ onOpenOverlay, formControl }: ComposeFormContentProps) => (
    <div className="flex flex-row">
      <Avatar className="w-[42px] h-[42px]">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <FormField
        control={formControl}
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
  ),
);

ComposeFormContent.displayName = 'ComposeFormContent';
