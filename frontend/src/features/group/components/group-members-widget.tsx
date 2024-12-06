'use client';

import { useOptimistic } from 'react';
import { EllipsisVertical } from 'lucide-react';

// Components
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Text,
} from '@/components/ui';
import {
  UserCardPopover,
  GroupInviteMembersInput,
} from '@/components/sections';

// Utils
import { getFullName } from '@/utils';

// Types
import { GroupMember } from '@/types';

interface GroupMembersWidgetProps {
  groupId: number;
  authorId: string;
  groupMembers: GroupMember[];
}

interface GroupMemberItemProps {
  member: GroupMember;
}

const GroupMemberItem = ({ member }: GroupMemberItemProps) => {
  const { user, role } = member;

  return (
    <div className="p-4 flex w-full border-t border-slate-300 dark:border-slate-600 items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3">
        <UserCardPopover user={user} />

        <div className="flex flex-col">
          <Text className="text-xs">
            {getFullName(user.firstName, user.lastName)}
          </Text>
          <span className="text-4xs text-slate-500 capitalize">{role}</span>
        </div>
      </div>
    </div>
  );
};

export const GroupMembersWidget = ({
  groupId,
  authorId,
  groupMembers,
}: GroupMembersWidgetProps) => {
  const [optimisticMembers, addOptimisticMember] = useOptimistic(
    groupMembers,
    (state, newMember: GroupMember) => [newMember, ...state],
  );

  const renderMembers = optimisticMembers.map((member) => (
    <GroupMemberItem key={member.id} member={member} />
  ));

  return (
    <Card className="w-full rounded-lg">
      <CardHeader className="flex flex-col px-4 py-2 justify-between gap-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-sm font-normal text-neutral-400 dark:text-gray-100">
              Group Members
            </CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <Button size="icon" variant="rounded" className="hover:bg-muted">
              <EllipsisVertical size={20} className="text-slate-600" />
            </Button>
          </div>
        </div>
        <GroupInviteMembersInput
          groupMembers={optimisticMembers}
          groupId={groupId}
          authorId={authorId}
          addOptimisticMember={addOptimisticMember}
        />
      </CardHeader>
      <CardContent className="flex flex-col p-0">{renderMembers}</CardContent>
    </Card>
  );
};
