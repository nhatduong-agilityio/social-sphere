import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

// Actions
import { getGroupByName } from '@/features/group/actions';
import { GroupHeader } from '@/features/group/components';
import { auth } from '@/auth';

interface GroupLayoutProps {
  children: ReactNode;
  groupName: string;
}

export const GroupLayout = async ({
  children,
  groupName,
}: GroupLayoutProps) => {
  const session = await auth();
  const userId = session?.user?.id;

  const { data: group } = await getGroupByName(groupName);

  if (!group || !userId) notFound();

  return (
    <main className="py-2">
      <GroupHeader group={group} authorId={userId} />
      <div className="w-full">{children}</div>
    </main>
  );
};
