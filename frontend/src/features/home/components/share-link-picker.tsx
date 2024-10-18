import { memo, useCallback } from 'react';

// Icons
import { Link2Icon } from 'lucide-react';

// Components
import { AutoCompleteInput } from '@/components/sections/auto-complete-input';
import { FormControl, FormField, FormItem } from '@/components/ui/form';

// Hooks
import { useComposeFeedForm } from '../hooks/use-compose-feed-form';

interface ShareLinkPickerProps {
  onCloseShareLinkPicker: () => void;
}

export const ShareLinkPicker = memo(
  ({ onCloseShareLinkPicker }: ShareLinkPickerProps) => {
    const { form } = useComposeFeedForm();

    const handleClose = useCallback(() => {
      form.setValue('sharedLink', '');
      onCloseShareLinkPicker();
    }, [form, onCloseShareLinkPicker]);

    return (
      <FormField
        control={form.control}
        name="sharedLink"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <AutoCompleteInput
                className="dark:text-neutral-200"
                type="url"
                startIcon={<Link2Icon size={16} />}
                placeholder="Enter the link URL"
                onClose={handleClose}
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    );
  },
);

ShareLinkPicker.displayName = 'ShareLinkPicker';
