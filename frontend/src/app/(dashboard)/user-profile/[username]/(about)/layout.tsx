import { ReactNode } from 'react';

// Layouts
import { ProfileNavTab } from '@/features/profile/components';

const AboutLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex md:flex-row flex-col gap-8">
    <ProfileNavTab />

    <div className="w-full">{children}</div>
  </div>
);

export default AboutLayout;
