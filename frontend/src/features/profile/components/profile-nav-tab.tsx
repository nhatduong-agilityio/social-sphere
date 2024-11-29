'use client';

import { memo, useCallback } from 'react';
import {
  BriefcaseBusiness,
  CircleCheckBig,
  GraduationCap,
  Grip,
} from 'lucide-react';
import { useParams, usePathname, useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/ui';

// Constants
import { ROUTER } from '@/constants';

// Utils
import { cn } from '@/utils';

export const ProfileNavTab = memo(() => {
  const pathname = decodeURIComponent(usePathname() || '');
  const { username } = useParams();
  const router = useRouter();

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

  const handleOnChangeLink = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router],
  );

  return (
    <div className="flex md:flex-col items-center gap-4 text-muted-foreground">
      {TABS.map(({ key, label, icon, href }) => {
        const isActive =
          decodeURIComponent(pathname) === decodeURIComponent(href);

        return (
          <Button
            key={key}
            variant="link"
            className={cn(
              'flex items-center w-fit md:w-64 h-10 justify-start dark:text-slate-300 text-slate-600 hover:bg-primary hover:shadow-md hover:text-white hover:dark:text-white',
              isActive && 'bg-blue-500 text-white dark:text-white',
            )}
            onClick={() => handleOnChangeLink(href)}
          >
            {icon}
            <span className="hidden md:block">{label}</span>
          </Button>
        );
      })}
    </div>
  );
});

ProfileNavTab.displayName = 'ProfileNavTab';
