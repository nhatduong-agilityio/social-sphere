'use client';

import { useState } from 'react';
import { useTransition } from 'react';

// Components
import { Button } from '@/components/ui';
import { GroupMembersWidget } from './group-members-widget';

// Features
import { NewsFeedCardList } from '@/features/home/components/news-feed-card-list';

// Actions
import { getGroupMembers, getNewsFeedIdsInGroup } from '../actions';

// Models
import { NewsFeedIdModel, NewsFeedIdsResponse } from '@/models';
import { GroupMember, GroupMembersResponse } from '@/types';

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
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>(
    groupMembersPagination.data,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(
    currentPage < groupMembersPagination.meta.pagination.pageCount,
  );

  const [newsFeedIds, setNewsFeedIds] = useState<NewsFeedIdModel[]>(
    newsFeedIdsPagination.data,
  );
  const [currentNewsFeedIdsPage, setCurrentNewsFeedIdsPage] = useState(1);
  const [hasMoreNewsFeedIds, setHasMoreNewsFeedIds] = useState(
    currentNewsFeedIdsPage < newsFeedIdsPagination.meta.pagination.pageCount,
  );

  const loadMoreMembers = async () => {
    startTransition(async () => {
      const nextPage = currentPage + 1;

      const { data: groupMembersResponse } = await getGroupMembers(
        groupId,
        nextPage,
      );
      if (!groupMembersResponse) return;

      setGroupMembers((prev) => [...prev, ...groupMembersResponse.data]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < groupMembersResponse.meta.pagination.pageCount);
    });
  };

  const loadMoreNewsFeedIds = async () => {
    startTransition(async () => {
      const nextPage = currentNewsFeedIdsPage + 1;

      const { data: newNewsFeedIdsResponse } = await getNewsFeedIdsInGroup(
        groupId,
        nextPage,
      );
      if (!newNewsFeedIdsResponse) return;

      setNewsFeedIds((prev) => [...prev, ...newNewsFeedIdsResponse.data]);
      setCurrentNewsFeedIdsPage(nextPage);
      setHasMoreNewsFeedIds(
        nextPage < newNewsFeedIdsResponse.meta.pagination.pageCount,
      );
    });
  };

  return (
    <div className="py-5 min-h-full">
      <div className="h-full grid grid-cols-3 gap-6">
        <div className="hidden lg:flex col-span-1 flex-col gap-6">
          <GroupMembersWidget groupMembers={groupMembers} />
          {hasMore && (
            <Button
              variant="primary"
              onClick={loadMoreMembers}
              disabled={isPending}
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
            >
              {isPending ? 'Loading...' : 'Load More News Feed'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
