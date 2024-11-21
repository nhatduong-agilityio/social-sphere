'use client';

import { memo, useCallback, useEffect, useState, useTransition } from 'react';
import { EllipsisVertical, Plus } from 'lucide-react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

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
import { GroupFormDialog } from '@/features/group/components';

// Utils
import { getFirstLetters } from '@/utils';

// Types
import { ActionState, GroupDetail, GroupsListResponse } from '@/types';

// Actions
import { createGroup, getGroups } from '@/features/group/actions';

// Hooks
import { toast } from '@/hooks';
import { GroupModel } from '@/models';
import { ROUTER } from '@/constants';

interface GroupsWidgetProps {
  authorId: string;
  groups?: GroupsListResponse;
}

const initialState: ActionState<GroupModel> = {
  message: null,
  error: null,
};

export const GroupsWidget = memo(({ authorId, groups }: GroupsWidgetProps) => {
  const router = useRouter();
  const [initialGroups, setInitialGroups] = useState<GroupDetail[]>(
    groups?.data || [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState(
    currentPage < (groups?.meta?.pagination?.pageCount || 1),
  );

  const [createState, createAction] = useFormState(
    createGroup.bind(null, Number(authorId)),
    initialState,
  );

  const loadMore = useCallback(async () => {
    startTransition(async () => {
      const nextPage = currentPage + 1;

      const { data: newNewsFeeds } = await getGroups(
        authorId,
        undefined,
        nextPage,
      );
      if (!newNewsFeeds) return;

      setInitialGroups((prev) => [...prev, ...newNewsFeeds.data]);
      setCurrentPage(nextPage);
      setHasMore(nextPage < newNewsFeeds.meta.pagination.pageCount);
    });
  }, [authorId, currentPage]);

  const handleCreate = async (data: FormData) => {
    startTransition(async () => {
      createAction(data);
    });
  };

  const handleNavigate = (groupName: string) => {
    router.push(ROUTER.GROUP_NAME(groupName));
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

      const newGroup: GroupDetail = {
        ...createState.data,
        members: createState.data.groupMembers,
        author: createState.data.createdUser,
        newsFeeds: createState.data.posts,
      };

      setInitialGroups((prev) => [...prev, newGroup]);
    }
  }, [createState]);

  const renderStoriesFriends = initialGroups.map(
    ({ id, documentId, name, description, avatar }) => (
      <div
        key={documentId}
        className="p-4 flex w-full border-t border-slate-300 dark:border-slate-600 items-center justify-between group cursor-pointer"
        onClick={() => handleNavigate(name)}
      >
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatar} alt={`Avatar of the group-${id}`} />
            <AvatarFallback>{getFirstLetters(name, name)}</AvatarFallback>
          </Avatar>
          <StoryMeta title={name} description={description} />
        </div>
      </div>
    ),
  );

  return (
    <>
      <Card className="w-full rounded-lg">
        <CardHeader className="flex flex-row px-4 py-2 justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-sm font-normal text-neutral-400 dark:text-gray-100">
              Groups
            </CardTitle>
          </div>

          <div className="flex items-center gap-3">
            <Button size="icon" variant="rounded" className="hover:bg-muted">
              <EllipsisVertical size={20} className="text-slate-600" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col p-0">
          <Dialog>
            <DialogTrigger asChild>
              <div className="p-4 flex w-full border-t border-slate-300 dark:border-slate-600 items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <Button
                    size="icon"
                    variant="rounded"
                    className="w-11 h-11 border-2 border-dashed dark:border-white group-hover:border-primary hover:border-solid"
                  >
                    <Plus
                      size={20}
                      className="dark:text-white text-slate-300 group-hover:text-primary"
                    />
                  </Button>

                  <StoryMeta
                    title="Add a new group"
                    description="Share members' news feeds"
                  />
                </div>
              </div>
            </DialogTrigger>
            <GroupFormDialog onCreate={handleCreate} isLoading={isPending} />
          </Dialog>

          {renderStoriesFriends}
        </CardContent>
      </Card>

      {hasMore && (
        <Button variant="primary" onClick={loadMore} disabled={isPending}>
          {isPending ? 'Loading...' : 'Load More Groups'}
        </Button>
      )}
    </>
  );
});

GroupsWidget.displayName = 'GroupsWidget';
