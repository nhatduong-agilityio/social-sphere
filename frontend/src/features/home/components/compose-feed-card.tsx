'use client';

// Constants
import { ComposeTabValue } from '../constants/compose-tab';

// Components
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ComposeTabHeader } from './compose-tab-header';
import { ComposePublishContent } from './compose-publish-content';
import { ComposeOverlay } from './compose-overlay';
import { useDisclosure } from '@/hooks/use-disclosure';

export const ComposeFeedCard = () => {
  const {
    isOpen: isOverlayOpen,
    onOpen: onOpensOverlay,
    onClose: onCloseOverlay,
  } = useDisclosure();

  return (
    <ComposeOverlay isOpen={isOverlayOpen}>
      <div className="border dark:border-dark-500 rounded-xl bg-card">
        <Tabs
          defaultValue={ComposeTabValue.Publish}
          className="flex flex-col gap-4"
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
          <TabsContent value={ComposeTabValue.Albums}>
            albums contents
          </TabsContent>
          <TabsContent value={ComposeTabValue.Video}>
            video contents
          </TabsContent>
        </Tabs>
      </div>
    </ComposeOverlay>
  );
};
