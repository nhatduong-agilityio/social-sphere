import { ReactNode } from 'react';

// Actions
import { getGroupByName } from '@/features/group/actions';
import { GroupHeader } from '@/features/group/components';
import { notFound } from 'next/navigation';

interface GroupLayoutProps {
  children: ReactNode;
  groupName: string;
}

export const GroupLayout = async ({
  children,
  groupName,
}: GroupLayoutProps) => {
  const { data: group } = await getGroupByName(groupName);

  if (!group) notFound();

  return (
    <main className="py-2">
      <GroupHeader group={group} />
      {/* <ProfileSubHeader user={profile} /> */}

      <div className="w-full">{children}</div>
    </main>
  );
};
