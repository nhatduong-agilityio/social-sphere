'use client';

import { ReactNode } from 'react';
import {
  Button,
  DialogClose,
  DialogContainer,
  Heading,
  Text,
} from '@/components/ui';
import { useLeaveGroup } from '../hooks';

interface GroupLeaveConfirmDialogProps {
  groupId: string;
  groupMemberId: string;
  groupName?: string;
  userId?: string;
  page?: number;
  trigger: ReactNode;
  onLeaveSuccess: (groupId: string) => void;
}

export const GroupLeaveConfirmDialog = ({
  groupId,
  groupMemberId,
  groupName,
  userId,
  page,
  trigger,
  onLeaveSuccess,
}: GroupLeaveConfirmDialogProps) => {
  const { isPending, mutateLeaveGroup } = useLeaveGroup();

  const handleLeaveGroup = async () => {
    await mutateLeaveGroup({
      groupId,
      groupMemberId,
      userId,
      page,
    });

    onLeaveSuccess(groupId);
  };

  return (
    <DialogContainer
      trigger={trigger}
      title="Leave Group"
      contentClassName="p-0 gap-0 md:max-w-[320px]"
      headerClassName="px-3 py-2 border-b border-gray-600 dark:border-dark-500"
      footerClassName="p-2 border-t border-gray-600 dark:border-dark-500"
      footer={
        <>
          <DialogClose asChild>
            <Button
              size="md"
              variant="fixed"
              className="bg-gray-200 border-gray-200"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="md"
            variant="primary"
            disabled={isPending}
            isLoading={isPending}
            onClick={handleLeaveGroup}
          >
            Leave
          </Button>
        </>
      }
    >
      <div className="flex flex-col text-center p-3">
        <Heading headingLevel="h3" className="text-lg font-semibold mb-2">
          Are you sure you want to leave {groupName} group?
        </Heading>
        <Text>
          You will no longer have access to this group&apos;s content.
        </Text>
      </div>
    </DialogContainer>
  );
};
