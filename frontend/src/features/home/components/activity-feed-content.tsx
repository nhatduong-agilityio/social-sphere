'use client';

import { useCallback, useOptimistic, useState } from 'react';
import { useTransition } from 'react';

// Constants
import { PAGE_SIZE, CURRENT_PAGE } from '@/constants';

// Components
import { ComposeFeedCard } from './compose-feed-card';
import { NewsFeedCardList } from './news-feed-card-list';
import { Button } from '@/components/ui';

// Actions
import { fetchNewsFeedIds } from '@/actions';

// Models
import { NewsFeedIdModel, NewsFeedIdsResponse } from '@/models';
import { NewsFeed } from '@/types';
import { NewsFeedCard } from './news-feed-card';

interface ActivityFeedContentProps {
  authorId: string;
  newsFeedIdsPagination?: NewsFeedIdsResponse;
}

export const ActivityFeedContent = ({
  authorId,
  newsFeedIdsPagination,
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
  const [optimisticNewsFeed, addOptimisticNewsFeed] = useOptimistic(
    null,
    (state: NewsFeed | null, newFeed: NewsFeed) => newFeed,
  );

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
    <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
      <ComposeFeedCard
        onUpdateNewsFeedIds={handleUpdateNewsFeedIds}
        onAddOptimisticNewsFeed={addOptimisticNewsFeed}
      />
      <div className="flex flex-col gap-6">
        {optimisticNewsFeed && (
          <NewsFeedCard
            newsFeed={optimisticNewsFeed}
            authorId={authorId}
            onLike={async () => {}}
            onComment={() => {}}
            onShare={() => {}}
          />
        )}

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
  );
};
