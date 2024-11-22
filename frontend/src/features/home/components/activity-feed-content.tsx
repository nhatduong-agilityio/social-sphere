'use client';

import { useCallback, useState } from 'react';
import { Briefcase, Gift } from 'lucide-react';
import { useTransition } from 'react';

// Constants
import { PAGE_SIZE, CURRENT_PAGE } from '@/constants';

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
import { GroupsListResponse } from '@/types';

// Actions
import {
  NewsFeedIdModel,
  NewsFeedIdsResponse,
  TFollowed,
  TFollower,
} from '@/models';
import { AcceptFriendsWidget } from './accept-friends-widget';
import { GroupsWidget } from './groups-widget';
import { fetchNewsFeedIds } from '@/actions';

interface ActivityFeedContentProps {
  authorId: string;
  suggestFriends: TFollowed[];
  acceptFriends: TFollower[];
  newsFeedIdsPagination?: NewsFeedIdsResponse;
  groups?: GroupsListResponse;
}

export const ActivityFeedContent = ({
  authorId,
  newsFeedIdsPagination,
  suggestFriends,
  acceptFriends,
  groups,
}: ActivityFeedContentProps) => {
  const [newsFeedIds, setNewFeedIds] = useState<NewsFeedIdModel[]>(
    newsFeedIdsPagination?.data || [],
  );
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
  const [isPending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(
    currentPage <
      (newsFeedIdsPagination?.meta.pagination.pageCount || CURRENT_PAGE),
  );

  const {
    isOpen: isOverlayOpen,
    onOpen: onOpensOverlay,
    onClose: onCloseOverlay,
  } = useDisclosure();

  const handleAddStory = () => {
    onOpensOverlay();
  };

  const loadMore = async () => {
    if (isPending) return; // Prevent multiple calls while loading

    startTransition(async () => {
      const nextPage = currentPage + 1;

      const newsFeedIdsResponse = await fetchNewsFeedIds({
        authorId,
        page: nextPage,
        pageSize: PAGE_SIZE,
      });

      if (!newsFeedIdsResponse) return;

      setNewFeedIds((prev) => [...prev, ...newsFeedIdsResponse.data]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < newsFeedIdsResponse.meta.pagination.pageCount);
    });
  };

  const handleUpdateNewsFeedIds = useCallback(
    (newNewsFeedIds: NewsFeedIdModel) => {
      setNewFeedIds((prev) => [...[newNewsFeedIds], ...prev]);
    },
    [],
  );

  return (
    <div className="py-5 min-h-full">
      <div className="h-full grid grid-cols-12 gap-6">
        <div className="hidden lg:flex col-span-3 flex-col gap-6">
          <AcceptFriendsWidget friends={acceptFriends} authorId={authorId} />
          <GroupsWidget groups={groups} authorId={authorId} />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
          <ComposeFeedCard
            isOverlayOpen={isOverlayOpen}
            onOpensOverlay={onOpensOverlay}
            onCloseOverlay={onCloseOverlay}
            onUpdateNewsFeedIds={handleUpdateNewsFeedIds}
          />
          <div className="flex flex-col gap-6">
            <NewsFeedCardList newsFeedIds={newsFeedIds} authorId={authorId} />

            {/**TODO: Define common component later  */}
            {hasMore && (
              <Button
                variant="primary"
                onClick={loadMore}
                disabled={isPending}
                isLoading={isPending}
              >
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
          <SuggestFriendsWidget
            suggestFriends={suggestFriends}
            authorId={authorId}
          />

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
