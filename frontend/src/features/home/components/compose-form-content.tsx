'use client';

import { memo } from 'react';
import { Control } from 'react-hook-form';

// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  FormControl,
  FormField,
  FormItem,
  Textarea,
} from '@/components/ui';

// Hooks
import { ComposeFeedFormValues } from '../hooks';

interface ComposeFormContentProps {
  onOpenOverlay: () => void;
  formControl: Control<ComposeFeedFormValues>;
}
export const ComposeFormContent = memo(
  ({ onOpenOverlay, formControl }: ComposeFormContentProps) => (
    <div className="flex flex-row">
      <Avatar className="w-[42px] h-[42px]">
        <AvatarImage src="https://github.com/shadcn.png" alt="Avatar Post" />
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
