'use client';

import { memo } from 'react';

// Constants
import { SHARE_OPTIONS } from '../../constants/share-news-feed';

// Components
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Form,
} from '@/components/ui';
import { NewsFeedShareDialogControl } from './news-feed-share-dialog-control';
import { NewsFeedShareDialogPreview } from './news-feed-share-dialog-preview';
import { NewsFeedShareDialogAbout } from './news-feed-share-dialog-about';
import { ShareDropdown } from './share-dropdown';

// Types
import { NewsFeed } from '@/types';

// Hooks
import { useShareForm } from '../../hooks';

interface NewsFeedShareDialogProps {
  newsFeed: NewsFeed;
}

export const NewsFeedShareDialog = memo(
  ({ newsFeed }: NewsFeedShareDialogProps) => {
    const { form } = useShareForm();

    return (
      <DialogContent className="p-0 gap-0 md:max-w-[480px]">
        <Form {...form}>
          <form className="w-full">
            <DialogHeader className="px-3 py-2 border-b border-gray-600 dark:border-dark-500">
              <ShareDropdown options={SHARE_OPTIONS} />
              <DialogTitle className="hidden" />
              <DialogDescription className="hidden" />
            </DialogHeader>
            <div className="w-full">
              <div className="flex flex-col px-3 py-2">
                <NewsFeedShareDialogAbout form={form} />
                <NewsFeedShareDialogPreview newsFeed={newsFeed} />
              </div>
            </div>
            <NewsFeedShareDialogControl />
          </form>
        </Form>
      </DialogContent>
    );
  },
);

NewsFeedShareDialog.displayName = 'NewsFeedShareDialog';
