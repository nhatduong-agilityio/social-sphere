import { ReactNode } from 'react';

// Components
import { ProfileHeader, ProfileSubHeader } from '@/features/profile/components';

// Actions
import { getProfile } from '@/features/profile/actions';

interface ProfileLayoutProps {
  children: ReactNode;
  username: string;
}

export const ProfileLayout = async ({
  children,
  username,
}: ProfileLayoutProps) => {
  const profile = await getProfile(username);

  return (
    <main className="py-2">
      <ProfileHeader
        username={username}
        imageUrl={profile?.profilePicture}
        bannerUrl={profile?.banner}
      />
      <ProfileSubHeader user={profile} />

      <div className="w-full">{children}</div>
    </main>
  );
};
