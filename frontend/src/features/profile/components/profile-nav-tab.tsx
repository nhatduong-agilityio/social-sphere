'use client';

import { memo } from 'react';
import Link from 'next/link';
import {
  BriefcaseBusiness,
  CircleCheckBig,
  GraduationCap,
  Grip,
} from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';

// Components
import { Tabs, TabsList, TabsTrigger } from '@/components/ui';

// Constants
import { ROUTER } from '@/constants';

export const ProfileNavTab = memo(() => {
  const pathname = decodeURIComponent(usePathname() || '');
  const { username } = useParams();

  const TABS = [
    {
      key: 'overview',
      label: 'Overview',
      href: ROUTER.PROFILE_ID_OVERVIEW(username as string),
      icon: <CircleCheckBig className="md:mr-2" size={20} />,
    },
    {
      key: 'personal-info',
      label: 'Personal Info',
      href: ROUTER.PROFILE_ID_PERSONAL_INFO(username as string),
      icon: <Grip className="md:mr-2" size={20} />,
    },
    {
      key: 'education',
      label: 'Education',
      href: ROUTER.PROFILE_ID_EDUCATION(username as string),
      icon: <GraduationCap className="md:mr-2" size={20} />,
    },
    {
      key: 'jobs',
      label: 'Jobs',
      href: ROUTER.PROFILE_ID_JOBS(username as string),
      icon: <BriefcaseBusiness className="md:mr-2" size={20} />,
    },
  ];

  return (
    <Tabs value={pathname || TABS[0].href}>
      <TabsList>
        {TABS.map(({ key, label, icon, href }) => (
          <Link key={key} href={href}>
            <TabsTrigger value={decodeURIComponent(href)}>
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
