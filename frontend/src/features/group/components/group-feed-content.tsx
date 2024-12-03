'use client';

import { useState } from 'react';
import { useTransition } from 'react';

// Constants
import { PAGE_SIZE } from '@/constants';

// Components
import { Button } from '@/components/ui';
import { GroupMembersWidget } from './group-members-widget';

// Features
import { NewsFeedCardList } from '@/features/home/components/news-feed-card-list';

// Models
import { NewsFeedIdModel, NewsFeedIdsResponse } from '@/models';
import { GroupMembersResponse } from '@/types';

// Actions
import { fetchNewsFeedIds } from '@/actions';

// Hooks
import { useGroupMembers } from '../hooks';

interface GroupFeedContentProps {
  authorId: string;
  groupId: number;
  groupMembersPagination: GroupMembersResponse;
  newsFeedIdsPagination: NewsFeedIdsResponse;
}

export const GroupFeedContent = ({
  authorId,
  groupId,
  groupMembersPagination,
  newsFeedIdsPagination,
}: GroupFeedContentProps) => {
  const [isPending, startTransition] = useTransition();

  const { groupMembers, hasMore, loadMoreMembers } = useGroupMembers(
    groupId,
    groupMembersPagination,
  );

  const [newsFeedIds, setNewsFeedIds] = useState<NewsFeedIdModel[]>(
    newsFeedIdsPagination.data,
  );
  const [currentNewsFeedIdsPage, setCurrentNewsFeedIdsPage] = useState(1);
  const [hasMoreNewsFeedIds, setHasMoreNewsFeedIds] = useState(
    currentNewsFeedIdsPage < newsFeedIdsPagination.meta.pagination.pageCount,
  );

  const loadMoreNewsFeedIds = async () => {
    if (isPending) return;

    startTransition(async () => {
      const nextPage = currentNewsFeedIdsPage + 1;

      const newsFeedIdsResponse = await fetchNewsFeedIds({
        groupId,
        page: nextPage,
        pageSize: PAGE_SIZE,
      });

      if (!newsFeedIdsResponse) return;

      setNewsFeedIds((prev) => [...prev, ...newsFeedIdsResponse.data]);
      setCurrentNewsFeedIdsPage(nextPage);
      setHasMoreNewsFeedIds(
        nextPage < newsFeedIdsResponse.meta.pagination.pageCount,
      );
    });
  };

  return (
    <div className="py-5 min-h-full">
      <div className="h-full grid grid-cols-3 gap-6">
        <div className="hidden lg:flex col-span-1 flex-col gap-6">
          <GroupMembersWidget
            groupMembers={groupMembers}
            groupId={groupId}
            authorId={authorId}
          />
          {hasMore && (
            <Button
              variant="primary"
              onClick={() => startTransition(() => loadMoreMembers())}
              disabled={isPending}
              isLoading={isPending}
            >
              {isPending ? 'Loading...' : 'Load More Members'}
            </Button>
          )}
        </div>
        <div className="col-span-12 lg:col-span-2 flex flex-col gap-6">
          <NewsFeedCardList newsFeedIds={newsFeedIds} authorId={authorId} />

          {hasMoreNewsFeedIds && (
            <Button
              variant="primary"
              onClick={loadMoreNewsFeedIds}
              disabled={isPending}
              isLoading={isPending}
            >
              {isPending ? 'Loading...' : 'Load More News Feed'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
