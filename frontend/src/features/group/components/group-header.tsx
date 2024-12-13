'use client';

import { useEffect, useOptimistic } from 'react';
import { useFormState } from 'react-dom';
import { EditIcon, LogOutIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Components
import { Button, Dialog, DialogTrigger } from '@/components/ui';
import { UploadBannerGroup } from './upload-banner-group';
import { UploadAvatarGroup } from './upload-avatar-group';
import { GroupFormDialog } from './group-form-dialog';

// Types
import { ActionState, GroupDetail } from '@/types';

// Utils
import { formatNumber } from '@/utils';
import { isGroupAdmin } from '../utils';

// Actions
import { updateGroupAction } from '../actions';

// Hooks
import { toast } from '@/hooks';
import { GroupRemoveConfirmDialog } from './group-remove-confirm-dialog';
import { GroupLeaveConfirmDialog } from './group-leave-confirm-dialog';
import { ROUTER } from '@/constants';

interface GroupHeaderProps {
  authorId: string;
  group: GroupDetail;
}

const initialState: ActionState<GroupDetail> = {
  message: null,
  error: null,
};

export const GroupHeader = ({ group, authorId }: GroupHeaderProps) => {
  const router = useRouter();
  const [optimisticGroup, addOptimisticGroup] = useOptimistic(
    group,
    (state, newData: GroupDetail) => ({
      ...state,
      ...newData,
    }),
  );

  const [updateState, updateAction] = useFormState(
    updateGroupAction.bind(null, {
      groupId: optimisticGroup.id.toString(),
      prevData: group,
    }),
    initialState,
  );

  const isAdmin =
    authorId === optimisticGroup.author.id.toString() ||
    isGroupAdmin(optimisticGroup.members, authorId);
  const countMembers = optimisticGroup.members?.length;
  const member = optimisticGroup.members.find(
    (member) => member.user.id.toString() === authorId,
  );
  const initialGroupForm = {
    name: optimisticGroup.name,
    description: optimisticGroup.description,
    avatar: optimisticGroup.avatar,
  };

  const handleCreate = async (data: FormData) => {
    updateAction(data);
  };

  const handleRemoveGroupSuccess = (variant: 'remove' | 'leave') => {
    toast({
      variant: 'success',
      title: 'Success',
      description:
        variant === 'remove'
          ? 'Group removed successfully'
          : 'Left group successfully',
    });

    router.push(ROUTER.HOME);
  };

  useEffect(() => {
    if (updateState.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: updateState.error,
      });
    }

    if (updateState.message && updateState.data) {
      toast({
        variant: 'success',
        title: 'Success',
        description: updateState.message,
      });

      router.push(ROUTER.GROUP_NAME(updateState.data.name));
    }
  }, [router, updateState]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center relative">
        <UploadBannerGroup group={optimisticGroup} />
        <UploadAvatarGroup group={optimisticGroup} />
      </div>
      <div className="w-full flex items-start justify-between py-3 mt-[50px]">
        <div className="flex flex-col flex-1">
          <span className="font-montserrat text-[25.6px] font-semibold">
            {formatNumber(countMembers) || '0'}
          </span>
          <span className="dark:text-neutral-100 text-neutral-600 text-4xs uppercase">
            {countMembers > 1 ? 'Members' : 'Member'}
          </span>
        </div>

        <div className="text-center flex-1">
          <h2 className="font-semibold font-montserrat text-xl">
            {optimisticGroup.name}
          </h2>
          <span className="font-roboto dark:text-neutral-100 text-neutral-600 text-sm">
            {optimisticGroup.description}
          </span>
        </div>

        <div className="flex items-center justify-end flex-1 gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                aria-label="Edit Group"
                size="fit"
                variant="unstyle"
                className="flex items-center gap-1 border border-gray-900"
                disabled={!isAdmin}
              >
                <EditIcon size={16} />
              </Button>
            </DialogTrigger>
            <GroupFormDialog
              onCreate={handleCreate}
              initialValues={initialGroupForm}
              onAddOptimisticGroups={addOptimisticGroup}
            />
          </Dialog>
          {isAdmin && (
            <GroupRemoveConfirmDialog
              groupId={optimisticGroup.documentId}
              groupName={optimisticGroup.name}
              userId={authorId}
              trigger={
                <Button
                  aria-label="Remove Group"
                  size="fit"
                  variant="unstyle"
                  className="flex items-center gap-1 hover:text-red-600"
                >
                  <XIcon size={20} />
                </Button>
              }
              onRemoveSuccess={(_) => handleRemoveGroupSuccess('remove')}
            />
          )}
          {!isAdmin && member && (
            <GroupLeaveConfirmDialog
              groupId={optimisticGroup.documentId}
              groupMemberId={member.documentId}
              groupName={optimisticGroup.name}
              userId={authorId}
              trigger={
                <Button
                  aria-label="Remove Group"
                  size="fit"
                  variant="unstyle"
                  className="flex items-center gap-1 hover:text-dark-900"
                >
                  <LogOutIcon size={16} />
                </Button>
              }
              onLeaveSuccess={(_) => handleRemoveGroupSuccess('leave')}
            />
          )}
        </div>
      </div>
    </div>
  );
};
