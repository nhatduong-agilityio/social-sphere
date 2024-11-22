'use client';

import { useTransition } from 'react';
import { leaveGroupById } from '../actions';

export const useLeaveGroup = () => {
  const [isPending, startTransition] = useTransition();

  const handleLeaveGroup = (params: {
    groupId: string;
    groupMemberId: string;
    userId?: string;
    page?: number;
  }) => {
    startTransition(async () => {
      await leaveGroupById(params);
    });
  };

  return {
    isPending,
    mutateLeaveGroup: handleLeaveGroup,
  };
};
