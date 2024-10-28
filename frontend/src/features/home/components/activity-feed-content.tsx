'use client';

import { Briefcase, Gift } from 'lucide-react';

// Components
import { ComposeFeedCard } from './compose-feed-card';
import { NotificationWidget } from './notification-widget';
import { StoriesWidget } from './stories-widget';
import { SuggestFriendsWidget } from './suggest-friends-widget';

// Hooks
import { useDisclosure } from '@/hooks';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__/user';

// Icons
import { BirthdayIcon, JobIcon } from '@/icons';
import { NewsFeedCardList } from './news-feed-card-list';
import { NewsFeed } from '@/types';

interface ActivityFeedContentProps {
  newsFeeds: NewsFeed[];
}

export const ActivityFeedContent = ({
  newsFeeds,
}: ActivityFeedContentProps) => {
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
          <SuggestFriendsWidget />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <ComposeFeedCard
            isOverlayOpen={isOverlayOpen}
            onOpensOverlay={onOpensOverlay}
            onCloseOverlay={onCloseOverlay}
          />
          <div>
            <NewsFeedCardList newsFeeds={newsFeeds} />
          </div>
        </div>
        <div className="hidden lg:flex col-span-3 flex-col gap-6">
          <StoriesWidget onAddStory={handleAddStory} />
          <NotificationWidget
            avatar={
              MOCK_FRIENDS[0].profilePicture || '/images/avatar-placeholder.svg'
            }
            iconContent={<BirthdayIcon />}
            customClass="bg-green-100 dark:bg-green-100"
            title="Dan turns 31 today!"
            description="Send him your best wishes by leaving something on his wall."
            iconHeader={<Gift size={24} className="text-white" />}
            styleNotificationClass="border-2 border-green-100"
            notificationCount={27}
          />
          <SuggestFriendsWidget />
          <NotificationWidget
            avatar={
              MOCK_FRIENDS[0].profilePicture || '/images/avatar-placeholder.svg'
            }
            iconContent={<JobIcon />}
            customClass="bg-blue-600 dark:bg-blue-600"
            title="Nelly has a new job!"
            description="Send her message congratulating her for getting this job."
            iconHeader={<Briefcase size={24} className="text-white" />}
            styleNotificationClass="border-2 border-blue-600"
          />
        </div>
      </div>
    </div>
  );
};
