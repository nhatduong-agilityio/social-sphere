'use client';

import { useState } from 'react';
import { useTransition } from 'react';

// Components
import { Button } from '@/components/ui';

// Icons
import { GroupMember, GroupMembersResponse } from '@/types';

// Actions
import { getGroupMembers } from '../actions';
import { GroupMembersWidget } from './group-members-widget';

interface GroupFeedContentProps {
  groupId: number;
  groupMembersPagination: GroupMembersResponse;
}

export const GroupFeedContent = ({
  groupId,
  groupMembersPagination,
}: GroupFeedContentProps) => {
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>(
    groupMembersPagination.data,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(
    currentPage < groupMembersPagination.meta.pagination.pageCount,
  );

  const loadMoreMembers = async () => {
    startTransition(async () => {
      const nextPage = currentPage + 1;

      const { data: newNewsFeeds } = await getGroupMembers(groupId, nextPage);
      if (!newNewsFeeds) return;

      setGroupMembers((prev) => [...prev, ...newNewsFeeds.data]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < newNewsFeeds.meta.pagination.pageCount);
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
          {/* <ComposeFeedCard
            isOverlayOpen={isOverlayOpen}
            onOpensOverlay={onOpensOverlay}
            onCloseOverlay={onCloseOverlay}
          /> */}
        </div>
      </div>
    </div>
  );
};
