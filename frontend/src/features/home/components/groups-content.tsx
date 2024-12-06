'use client';

import {
  memo,
  useCallback,
  useEffect,
  useOptimistic,
  useRef,
  useState,
  useTransition,
} from 'react';
import { EllipsisVertical, LogOutIcon, Plus, XIcon } from 'lucide-react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

// Constants
import { PAGE_SIZE, ROUTER, CURRENT_PAGE } from '@/constants';

// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogTrigger,
} from '@/components/ui';
import { StoryMeta } from './story-meta';
import {
  GroupFormDialog,
  GroupLeaveConfirmDialog,
  GroupRemoveConfirmDialog,
} from '@/features/group/components';

// Utils
import { getFirstLetters } from '@/utils';

// Types
import { ActionState, GroupDetail, GroupsListResponse } from '@/types';
import { GroupModel } from '@/models';

// Actions
import { createGroup } from '@/features/group/actions';
import { fetchGroups } from '@/actions';

// Hooks
import { toast } from '@/hooks';

interface GroupsWidgetProps {
  authorId: string;
  groups?: GroupsListResponse;
}

const initialState: ActionState<GroupModel> = {
  message: null,
  error: null,
};

export const GroupsContent = memo(({ authorId, groups }: GroupsWidgetProps) => {
  const router = useRouter();
  const refTriggerDialog = useRef<HTMLButtonElement>(null);
  const [initialGroups, setInitialGroups] = useState<GroupDetail[]>(
    groups?.data || [],
  );
  const [currentPage, setCurrentPage] = useState(CURRENT_PAGE);
  const [isPending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(
    currentPage < (groups?.meta?.pagination?.pageCount || CURRENT_PAGE),
  );

  const [createState, createAction] = useFormState(
    createGroup.bind(null, Number(authorId)),
    initialState,
  );
  const [optimisticGroups, addOptimisticGroups] = useOptimistic(
    initialGroups,
    (state, newGroup: GroupDetail) => [newGroup, ...state],
  );

  const loadMore = useCallback(async () => {
    if (isPending) return; // Prevent multiple calls while loading

    startTransition(async () => {
      const nextPage = currentPage + 1;

      const groupResponse = await fetchGroups({
        authorId,
        page: nextPage,
        pageSize: PAGE_SIZE,
      });

      setInitialGroups((prev) => [...prev, ...groupResponse.data]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < groupResponse.meta.pagination.pageCount);
    });
  }, [authorId, currentPage, isPending]);

  const handleCreate = (data: FormData) => {
    createAction(data);
  };

  const handleNavigate = (groupName: string) => {
    router.push(ROUTER.GROUP_NAME(groupName));
  };

  const handleRemoveGroupSuccess = (
    groupId: string,
    variant: 'remove' | 'leave',
  ) => {
    toast({
      variant: 'success',
      title: 'Success',
      description:
        variant === 'remove'
          ? 'Group removed successfully'
          : 'Left group successfully',
    });

    setInitialGroups((prevGroups) =>
      prevGroups.filter((group) => group.documentId !== groupId),
    );
  };

  useEffect(() => {
    if (createState.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: createState.error,
      });
    }

    if (createState.message && createState.data) {
      toast({
        variant: 'success',
        title: 'Success',
        description: createState.message,
      });
    }

    refTriggerDialog.current?.click();
  }, [authorId, createState]);

  const renderGroups = optimisticGroups.map(
    ({ id, documentId, author, members, name, description, avatar }) => {
      const isAdmin = author.id.toString() === authorId;
      const member = members.find(
        (member) => member.user.id.toString() === authorId,
      );

      return (
        <div
          key={documentId}
          className="p-4 flex w-full border-t border-slate-300 dark:border-slate-600 items-center justify-between group"
        >
          <div
            className="w-full flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavigate(name)}
          >
            <Avatar>
              <AvatarImage src={avatar} alt={`Avatar of the group-${id}`} />
              <AvatarFallback>{getFirstLetters(name, name)}</AvatarFallback>
            </Avatar>
            <StoryMeta title={name} description={description} />
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <GroupRemoveConfirmDialog
                groupId={documentId}
                groupName={name}
                userId={authorId}
                page={currentPage}
                trigger={
                  <Button
                    size="icon"
                    variant="rounded"
                    className="w-9 h-9 border-none hover:text-red-600"
                  >
                    <XIcon size={20} />
                  </Button>
                }
                onRemoveSuccess={(groupId) =>
                  handleRemoveGroupSuccess(groupId, 'remove')
                }
              />
            )}
            {!isAdmin && member && (
              <GroupLeaveConfirmDialog
                groupId={documentId}
                groupMemberId={member.documentId}
                groupName={name}
                userId={authorId}
                page={currentPage}
                trigger={
                  <Button
                    size="icon"
                    variant="rounded"
                    className="w-9 h-9 border-none hover:text-dark-900"
                  >
                    <LogOutIcon size={16} />
                  </Button>
                }
                onLeaveSuccess={(groupId) =>
                  handleRemoveGroupSuccess(groupId, 'leave')
                }
              />
            )}
          </div>
        </div>
      );
    },
  );

  return (
    <>
      <Card className="w-full rounded-lg">
        <CardHeader className="flex flex-row px-4 py-2 justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-sm font-normal dark:text-neutral-50 text-neutral-600 dark:text-gray-100">
              Groups
            </CardTitle>
          </div>

          <div className="flex items-center gap-3">
            <Button
              aria-label="Create Group"
              size="icon"
              variant="rounded"
              className="hover:bg-muted"
            >
              <EllipsisVertical size={20} className="text-slate-600" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col p-0">
          <Dialog>
            <DialogTrigger
              ref={refTriggerDialog}
              className="p-4 flex w-full text-left border-t border-slate-300 dark:border-slate-600 items-center gap-3 group cursor-pointer"
            >
              <div className="flex items-center justify-center rounded-full w-11 h-11 border-2 border-dashed dark:border-white group-hover:border-primary hover:border-solid">
                <Plus
                  size={20}
                  className="dark:text-white text-slate-300 group-hover:text-primary"
                />
              </div>

              <StoryMeta
                title="Add a new group"
                description="Share members' news feeds"
              />
            </DialogTrigger>
            <GroupFormDialog
              onCreate={handleCreate}
              onAddOptimisticGroups={addOptimisticGroups}
            />
          </Dialog>

          {renderGroups}
        </CardContent>
      </Card>

      {hasMore && (
        <Button
          variant="primary"
          onClick={loadMore}
          disabled={isPending}
          isLoading={isPending}
        >
          {isPending ? 'Loading...' : 'Load More Groups'}
        </Button>
      )}
    </>
  );
});

GroupsContent.displayName = 'GroupsContent';
