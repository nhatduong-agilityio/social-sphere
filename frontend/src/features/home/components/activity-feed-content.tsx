'use client';

import { useState } from 'react';
import { Briefcase, Gift } from 'lucide-react';
import { useTransition } from 'react';

// Components
import { ComposeFeedCard } from './compose-feed-card';
import { NotificationWidget } from './notification-widget';
import { StoriesWidget } from './stories-widget';
import { SuggestFriendsWidget } from './suggest-friends-widget';
import { NewsFeedCardList } from './news-feed-card-list';
import { Button } from '@/components/ui';

// Hooks
import { useDisclosure } from '@/hooks';

// Mocks
import { MOCK_FRIENDS } from '@/__mocks__/user';

// Icons
import { BirthdayIcon, JobIcon } from '@/icons';
import { Pagination } from '@/types';

// Actions
import { getNewsFeedIds } from '../actions';
import { NewsFeedIdModel, TFollowed } from '@/models';

interface ActivityFeedContentProps {
  authorId: string;
  newsFeedIds: NewsFeedIdModel[];
  suggestFriends: TFollowed[];
  pagination: Pagination;
}

export const ActivityFeedContent = ({
  authorId,
  newsFeedIds: initialNewsFeeds,
  suggestFriends,
  pagination,
}: ActivityFeedContentProps) => {
  const [newsFeedIds, setNewFeedIds] =
    useState<NewsFeedIdModel[]>(initialNewsFeeds);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(currentPage < pagination.pageCount);

  const {
    isOpen: isOverlayOpen,
    onOpen: onOpensOverlay,
    onClose: onCloseOverlay,
  } = useDisclosure();

  const handleAddStory = () => {
    onOpensOverlay();
  };

  const loadMore = async () => {
    startTransition(async () => {
      const nextPage = currentPage + 1;
      const { data: newNewsFeeds } = await getNewsFeedIds(authorId, nextPage);
      if (!newNewsFeeds) return;

      setNewFeedIds((prev) => [...prev, ...newNewsFeeds.data]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < newNewsFeeds.meta.pagination.pageCount);
    });
  };

  return (
    <div className="py-5 min-h-full">
      <div className="h-full grid grid-cols-12 gap-6">
        <div className="hidden lg:flex col-span-3 flex-col gap-6">
          <SuggestFriendsWidget suggestFriends={suggestFriends} />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <ComposeFeedCard
            isOverlayOpen={isOverlayOpen}
            onOpensOverlay={onOpensOverlay}
            onCloseOverlay={onCloseOverlay}
          />
          <div className="flex flex-col gap-6">
            <NewsFeedCardList newsFeedIds={newsFeedIds} authorId={authorId} />

            {/**TODO: Define common component later  */}
            {hasMore && (
              <Button variant="primary" onClick={loadMore} disabled={isPending}>
                {isPending ? 'Loading...' : 'Load More Posts'}
              </Button>
            )}
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
          <SuggestFriendsWidget suggestFriends={suggestFriends} />
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
