'use client';

import { ReactNode } from 'react';

// Components
import ProfileHeader from '@/components/layouts/profile-header';
import ProfileSubHeader from '@/components/layouts/profile-sub-header';
import NavTab from '@/components/layouts/profile-nav-tab';

// Constants
import { TABS } from '@/constants/nav-tab';

export const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="py-2">
      <ProfileHeader />
      <ProfileSubHeader
        user={{
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          job: 'Engineer',
          countFriends: 3400,
        }}
      />

      <div className="flex md:flex-row flex-col gap-8">
        <NavTab tabs={TABS} />

        <div className="w-full">{children}</div>
      </div>
    </main>
  );
};
