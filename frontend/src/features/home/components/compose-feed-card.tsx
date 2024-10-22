'use client';

import { useCallback, useMemo, useState } from 'react';

// Constants
import { ComposeTabValue, TAB_DIALOG_CONTENT } from '../constants/compose-tab';

// Components
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ComposeTabHeader } from './compose-tab-header';
import { ComposePublishContent } from './compose-publish-content';
import { ComposeTabContentDialog } from './compose-tab-content-dialog';

// Utils
import { cn } from '@/utils/cn';
import { Dialog } from '@/components/ui/dialog';

interface ComposeFeedCardProps {
  isOverlayOpen: boolean;
  onOpensOverlay: () => void;
  onCloseOverlay: () => void;
}

export const ComposeFeedCard = ({
  isOverlayOpen,
  onOpensOverlay,
  onCloseOverlay,
}: ComposeFeedCardProps) => {
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
