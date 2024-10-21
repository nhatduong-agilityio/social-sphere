'use client';

// Constants
import { ComposeTabValue } from '../constants/compose-tab';

// Components
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ComposeTabHeader } from './compose-tab-header';
import { ComposePublishContent } from './compose-publish-content';

// Utils
import { cn } from '@/utils/cn';

interface ComposeFeedCardProps {
  isOverlayOpen: boolean;
  onOpensOverlay: () => void;
  onCloseOverlay: () => void;
}

export const ComposeFeedCard = ({
  isOverlayOpen,
  onOpensOverlay,
  onCloseOverlay,
}: ComposeFeedCardProps) => (
  <>
    <div
      className={cn(
        'hidden fixed inset-0 bg-black opacity-50 dark:opacity-70 z-50',
        isOverlayOpen && 'block',
      )}
    />
    <div
      className={cn(
        'border dark:border-dark-500 rounded-xl bg-card',
        isOverlayOpen && 'relative z-50',
      )}
    >
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
        <TabsContent value={ComposeTabValue.Video}>video contents</TabsContent>
      </Tabs>
    </div>
  </>
);
