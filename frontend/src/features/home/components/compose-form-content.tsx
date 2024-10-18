import { memo } from 'react';

// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

// Hooks
import { useComposeFeedForm } from '../hooks/use-compose-feed-form';

interface ComposeFormContentProps {
  onOpenOverlay: () => void;
}

export const ComposeFormContent = memo(
  ({ onOpenOverlay }: ComposeFormContentProps) => {
    const { form } = useComposeFeedForm();

    return (
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
    );
  },
);

ComposeFormContent.displayName = 'ComposeFormContent';
