'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { removeGroupById } from '../actions';
import { ROUTER } from '@/constants';

export const useRemoveGroup = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRemoveGroup = (params: {
    groupId: string;
    groupName?: string;
    userId?: string;
    page?: number;
  }) => {
    startTransition(async () => {
      await removeGroupById(params);

      params.groupName && router.replace(ROUTER.HOME);
    });
  };

  return {
    isPending,
    mutateRemoveGroup: handleRemoveGroup,
  };
};
