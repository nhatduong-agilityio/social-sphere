'use client';

import { useCallback, useMemo, useState } from 'react';

// Constants
import { ComposeTabValue, TAB_DIALOG_CONTENT } from '../constants';

// Components
import { Tabs, TabsContent, Dialog } from '@/components/ui';
import { ComposeTabHeader } from './compose-tab-header';
import { ComposePublishContent } from './compose-publish-content';
import { ComposeTabContentDialog } from './compose-tab-content-dialog';

// Utils
import { cn } from '@/utils';

// Types
import { NewsFeedIdModel } from '@/models';

// Hooks
import { useDisclosure } from '@/hooks';
import { NewsFeed } from '@/types';

interface ComposeFeedCardProps {
  onUpdateNewsFeedIds: (newNewsFeedIds: NewsFeedIdModel) => void;
  onAddOptimisticNewsFeed: (action: NewsFeed) => void;
}

export const ComposeFeedCard = ({
  onUpdateNewsFeedIds,
  onAddOptimisticNewsFeed,
}: ComposeFeedCardProps) => {
  const {
    isOpen: isOverlayOpen,
    onOpen: onOpensOverlay,
    onClose: onCloseOverlay,
  } = useDisclosure();
  const [currentTab, setCurrentTab] = useState<ComposeTabValue>(
    ComposeTabValue.Publish,
  );

  const handleTabChange = useCallback((value: string) => {
    if (value !== ComposeTabValue.Publish) {
      setCurrentTab(value as ComposeTabValue);
    }
  }, []);

  const currentTabContent = useMemo(
    () =>
      currentTab !== ComposeTabValue.Publish
        ? TAB_DIALOG_CONTENT[currentTab]
        : null,
    [currentTab],
  );

  return (
    <>
      <div
        data-testid="overlay"
        className={cn(
          'fixed inset-0 bg-black opacity-50 dark:opacity-70 z-50',
          isOverlayOpen ? 'block' : 'hidden',
        )}
      />
      <div
        className={cn(
          'border dark:border-dark-500 rounded-xl bg-card',
          isOverlayOpen && 'relative z-50',
        )}
      >
        <Tabs
          value={ComposeTabValue.Publish}
          className="flex flex-col gap-4"
          onValueChange={handleTabChange}
        >
          <ComposeTabHeader
            isOverlayOpen={isOverlayOpen}
            onCloseOverlay={onCloseOverlay}
          />
          <TabsContent value={ComposeTabValue.Publish}>
            <ComposePublishContent
              isOverlayOpen={isOverlayOpen}
              onOpenOverlay={onOpensOverlay}
              onUpdateNewsFeedIds={onUpdateNewsFeedIds}
              onAddOptimisticNewsFeed={onAddOptimisticNewsFeed}
            />
          </TabsContent>
        </Tabs>
      </div>

      {currentTabContent && (
        <Dialog
          open={currentTab !== ComposeTabValue.Publish}
          onOpenChange={() => setCurrentTab(ComposeTabValue.Publish)}
        >
          <ComposeTabContentDialog tabContent={currentTabContent} />
        </Dialog>
      )}
    </>
  );
};
