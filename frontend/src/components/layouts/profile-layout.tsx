'use client';

import { ReactNode } from 'react';

// Components
import {
  ProfileHeader,
  ProfileSubHeader,
  ProfileNavTab,
} from '@/features/profile/components';

// Constants
import { TABS } from '@/constants';

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
      <ProfileNavTab tabs={TABS} />

      <div className="w-full">{children}</div>
    </div>
  </main>
);
