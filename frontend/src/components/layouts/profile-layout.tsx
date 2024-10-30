import { ReactNode } from 'react';

// Components
import {
  ProfileHeader,
  ProfileSubHeader,
  ProfileNavTab,
} from '@/features/profile/components';

// Actions
import { getProfile } from '@/features/profile/actions';

export const ProfileLayout = async ({ children }: { children: ReactNode }) => {
  const profile = await getProfile();

  return (
    <main className="py-2">
      <ProfileHeader
        imageUrl={profile?.profilePicture}
        bannerUrl={profile?.banner}
      />
      <ProfileSubHeader user={profile} />

      <div className="flex md:flex-row flex-col gap-8">
        <ProfileNavTab />

        <div className="w-full">{children}</div>
      </div>
    </main>
  );
};
