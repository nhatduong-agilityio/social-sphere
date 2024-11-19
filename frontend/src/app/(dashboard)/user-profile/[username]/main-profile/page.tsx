// Actions
import { getProfile } from '@/features/profile/actions';

// Components
import { NewFeedList } from '@/features/profile/components';

const MainProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const profile = await getProfile(params.username);

  return (
    <NewFeedList authorId={String(profile.id)} username={params.username} />
  );
};

export default MainProfilePage;
