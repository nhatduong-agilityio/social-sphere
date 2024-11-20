'use client';

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
import { UserCardPopover } from '@/components/sections';

// Utils
import { getFullName } from '@/utils';

// Types
import { GroupMember } from '@/types';

interface GroupMembersWidgetProps {
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
  groupMembers,
}: GroupMembersWidgetProps) => {
  const renderSuggestedFriends = groupMembers.map((member) => (
    <GroupMemberItem key={member.id} member={member} />
  ));

  return (
    <Card className="w-full rounded-lg">
      <CardHeader className="flex flex-row px-4 py-2 justify-between">
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
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        {renderSuggestedFriends}
      </CardContent>
    </Card>
  );
};
