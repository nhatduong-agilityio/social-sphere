'use client';

import { memo } from 'react';
import {
  BriefcaseBusiness,
  CircleCheckBig,
  GraduationCap,
  Grip,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Components
import { Tabs, TabsList, TabsTrigger } from '@/components/ui';

// Constants
import { ROUTER } from '@/constants';

export const ProfileNavTab = memo(() => {
  const pathname = usePathname();

  const TABS = [
    {
      key: 'overview',
      label: 'Overview',
      href: ROUTER.PROFILE_OVERVIEW,
      icon: <CircleCheckBig className="md:mr-2" size={20} />,
    },
    {
      key: 'personal-info',
      label: 'Personal Info',
      href: ROUTER.PROFILE_PERSONAL_INFO,
      icon: <Grip className="md:mr-2" size={20} />,
    },
    {
      key: 'education',
      label: 'Education',
      href: ROUTER.PROFILE_EDUCATION,
      icon: <GraduationCap className="md:mr-2" size={20} />,
    },
    {
      key: 'jobs',
      label: 'Jobs',
      href: ROUTER.PROFILE_JOBS,
      icon: <BriefcaseBusiness className="md:mr-2" size={20} />,
    },
  ];

  return (
    <Tabs defaultValue={pathname || TABS[0].href}>
      <TabsList>
        {TABS.map(({ key, label, icon, href }) => (
          <Link key={key} href={href}>
            <TabsTrigger value={href}>
              {icon}
              <span className="hidden md:block">{label}</span>
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
});

ProfileNavTab.displayName = 'ProfileNavTab';
