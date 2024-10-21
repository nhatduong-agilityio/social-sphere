'use client';

import { ComposeFeedCard } from './compose-feed-card';
import StoriesWidget from './stories-widget';
import SuggestFriendsWidget from './suggest-friends-widget';

// Hooks
import { useDisclosure } from '@/hooks/use-disclosure';

export const ActivityFeed = () => {
  const {
    isOpen: isOverlayOpen,
    onOpen: onOpensOverlay,
    onClose: onCloseOverlay,
  } = useDisclosure();

  const handleAddStory = () => {
    onOpensOverlay();
  };

  return (
    <div className="py-5 min-h-full">
      <div className="h-full grid grid-cols-12 gap-6">
        <div className="hidden lg:flex col-span-3 flex-col gap-6">
          <h3>this is widgets 1</h3>
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <ComposeFeedCard
            isOverlayOpen={isOverlayOpen}
            onOpensOverlay={onOpensOverlay}
            onCloseOverlay={onCloseOverlay}
          />
        </div>
        <div className="hidden lg:flex col-span-3 flex-col gap-6">
          <StoriesWidget onAddStory={handleAddStory} />
          <SuggestFriendsWidget />
        </div>
      </div>
    </div>
  );
};
