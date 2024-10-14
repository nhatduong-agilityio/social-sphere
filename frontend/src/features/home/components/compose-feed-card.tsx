// Constants
import { ComposeTabValue } from '../constants/compose-tab';

// Components
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { ComposeTabHeader } from './compose-tab-header';
import { ComposePublishContent } from './compose-publish-content';

export const ComposeFeedCard = () => {
  return (
    <div className="border dark:border-dark-500 rounded-xl bg-card">
      <Tabs defaultValue={ComposeTabValue.Publish}>
        <ComposeTabHeader />
        <TabsContent value={ComposeTabValue.Publish} className="mt-6">
          <ComposePublishContent />
        </TabsContent>
        <TabsContent value={ComposeTabValue.Albums} className="mt-6">
          albums contents
        </TabsContent>
        <TabsContent value={ComposeTabValue.Video} className="mt-6">
          video contents
        </TabsContent>
      </Tabs>
    </div>
  );
};
