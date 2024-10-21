'use client';

import { ReactNode } from 'react';

// Components
import ProfileHeader from '@/features/profile/components/profile-header';
import ProfileSubHeader from '@/features/profile/components/profile-sub-header';
import NavTab from '@/features/profile/components/profile-nav-tab';

// Constants
import { TABS } from '@/constants/nav-tab';

export const ProfileLayout = ({ children }: { children: ReactNode }) => (
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
