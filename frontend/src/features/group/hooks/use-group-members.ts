'use client';

import { useEffect, useState } from 'react';
import { CURRENT_PAGE, PAGE_SIZE } from '@/constants';
import { GroupMember, GroupMembersResponse } from '@/types';
import { fetchGroupMembers } from '../actions';

export const useGroupMembers = (
  groupId: number,
  initialData: GroupMembersResponse,
) => {
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
  const [hasMore, setHasMore] = useState(
    currentPage < initialData.meta.pagination.pageCount,
  );

  useEffect(() => {
    setGroupMembers(initialData.data);
  }, [initialData.data]);

  const refreshGroupMembers = async () => {
    const response = await fetchGroupMembers({
      groupId,
      page: CURRENT_PAGE,
      pageSize: PAGE_SIZE,
    });
    setGroupMembers(response.data);
    setCurrentPage(CURRENT_PAGE);
    setHasMore(CURRENT_PAGE < response.meta.pagination.pageCount);
  };

  const loadMoreMembers = async () => {
    const nextPage = currentPage + 1;
    const response = await fetchGroupMembers({
      groupId,
      page: nextPage,
      pageSize: PAGE_SIZE,
    });

    setGroupMembers((prev) => [...prev, ...response.data]);
    setCurrentPage(nextPage);
    setHasMore(nextPage < response.meta.pagination.pageCount);
  };

  return {
    groupMembers,
    hasMore,
    refreshGroupMembers,
    loadMoreMembers,
  };
};
