'use client';

import { ReactNode, useRef } from 'react';
import {
  Button,
  DialogClose,
  DialogContainer,
  Heading,
  Text,
} from '@/components/ui';
import { useRemoveGroup } from '../hooks';

interface GroupRemoveConfirmDialogProps {
  groupId: string;
  groupName?: string;
  userId?: string;
  page?: number;
  trigger: ReactNode;
  onRemoveSuccess: (groupId: string) => void;
}

export const GroupRemoveConfirmDialog = ({
  groupId,
  groupName,
  userId,
  page,
  trigger,
  onRemoveSuccess,
}: GroupRemoveConfirmDialogProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { isPending, mutateRemoveGroup } = useRemoveGroup();

  const handleRemoveGroup = async () => {
    await mutateRemoveGroup({
      groupId,
      groupName,
      userId,
      page,
    });

    onRemoveSuccess(groupId);

    // Close dialog after successful deletion
    // closeRef.current?.click();
  };

  return (
    <DialogContainer
      trigger={trigger}
      title="Delete Group"
      contentClassName="p-0 gap-0 md:max-w-[320px]"
      headerClassName="px-3 py-2 border-b border-gray-600 dark:border-dark-500"
      footerClassName="p-2 border-t border-gray-600 dark:border-dark-500"
      footer={
        <>
          <DialogClose ref={closeRef} asChild>
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
            onClick={handleRemoveGroup}
          >
            Delete
          </Button>
        </>
      }
    >
      <div className="flex flex-col text-center p-3">
        <Heading headingLevel="h3" className="text-lg font-semibold mb-2">
          Are you sure you want to delete this {groupName} group?
        </Heading>
        <Text>
          This action cannot be undone. All group content will be permanently
          removed.
        </Text>
      </div>
    </DialogContainer>
  );
};
