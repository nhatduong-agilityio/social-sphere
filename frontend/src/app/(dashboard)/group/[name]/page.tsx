import { notFound } from 'next/navigation';

// Actions
import { getGroupByName } from '@/features/group/actions';

const GroupDetailPage = async ({ params }: { params: { name: string } }) => {
  const { data: group } = await getGroupByName(params.name);

  if (!group) return notFound();

  return <>{group.name}</>;
};

export default GroupDetailPage;
