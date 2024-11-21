'use client';

import { useEffect, useOptimistic, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { EditIcon } from 'lucide-react';

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

interface GroupHeaderProps {
  authorId: string;
  group: GroupDetail;
}

const initialState: ActionState<GroupDetail> = {
  message: null,
  error: null,
};

export const GroupHeader = ({ group, authorId }: GroupHeaderProps) => {
  const [optimisticGroup, addOptimisticGroup] = useOptimistic(
    group,
    (state, newData: GroupDetail) => ({
      ...state,
      ...newData,
    }),
  );

  const [updateState, updateAction] = useFormState(
    updateGroupAction.bind(null, optimisticGroup.documentId),
    initialState,
  );
  const [isPending, startTransition] = useTransition();

  const isAdmin =
    authorId === optimisticGroup.author.id.toString() ||
    isGroupAdmin(optimisticGroup.members, authorId);
  const countMembers = optimisticGroup.members?.length;
  const initialGroupForm = {
    name: optimisticGroup.name,
    description: optimisticGroup.description,
    avatar: optimisticGroup.avatar,
  };

  const handleCreate = async (data: FormData) => {
    const avatar = data.get('avatar') as File;
    const imageUrl = URL.createObjectURL(avatar);

    const newData = {
      ...optimisticGroup,
      name: data.get('name') as string,
      description: data.get('description') as string,
      avatar: avatar ? imageUrl : optimisticGroup.avatar,
    };

    startTransition(async () => {
      // Apply optimistic update
      addOptimisticGroup(newData);
      updateAction(data);
    });
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
    }
  }, [updateState]);

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
          <span className="text-neutral-100 text-4xs uppercase">Friends</span>
        </div>

        <div className="text-center flex-1">
          <h2 className="font-semibold font-montserrat text-xl">
            {optimisticGroup.name}
          </h2>
          <span className="font-roboto text-neutral-100 text-sm">
            {optimisticGroup.description}
          </span>
        </div>

        <div className="flex justify-end flex-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button
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
              isLoading={isPending}
              initialValues={initialGroupForm}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};
