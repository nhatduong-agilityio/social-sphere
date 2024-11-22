'use client';

import { useCallback, useState } from 'react';
import { useTransition } from 'react';

// Constants
import { PAGE_SIZE, CURRENT_PAGE } from '@/constants';

// Components
import { Button } from '@/components/ui';
import { NewFriendsWidget } from './new-friends-widget';
import { NewsFeedCardList } from '@/features/home/components/news-feed-card-list';

// Types
import { NewsFeedIdModel } from '@/models';
import { Pagination, TNewFriends } from '@/types';

// Actions
import { fetchNewsFeedIds } from '@/actions';

interface NewFeedContentProps {
  authorId: string;
  newsFeedIds: NewsFeedIdModel[];
  newFriends: TNewFriends[];
  pagination: Pagination;
}

export const NewFeedContent = ({
  authorId,
  newsFeedIds: initialNewsFeeds,
  newFriends,
  pagination,
}: NewFeedContentProps) => {
  const [newsFeedIds, setNewFeedIds] =
    useState<NewsFeedIdModel[]>(initialNewsFeeds);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
  const [isPending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(currentPage < pagination.pageCount);

  const loadMore = useCallback(async () => {
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
  }, [authorId, currentPage, isPending]);

  return (
    <div className="py-5 min-h-full">
      <div className="h-full flex w-full gap-6">
        <div className="hidden lg:flex lg:w-400 col-span-3 flex-col gap-6">
          <NewFriendsWidget friends={newFriends} />
        </div>
        <div className="flex w-full flex-col gap-6">
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
      </div>
    </div>
  );
};
