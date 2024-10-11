import {
  CircleCheckBig,
  Grip,
  GraduationCap,
  BriefcaseBusiness,
} from 'lucide-react';

export const TABS = [
  {
    key: 'overview',
    label: 'Overview',
    href: '/user-profile/overview',
    icon: CircleCheckBig,
  },
  {
    key: 'personal-info',
    label: 'Personal Info',
    href: '/user-profile/personal-info',
    icon: Grip,
  },
  {
    key: 'education',
    label: 'Education',
    href: '/user-profile/education',
    icon: GraduationCap,
  },
  {
    key: 'jobs',
    label: 'Jobs',
    href: '/user-profile/jobs',
    icon: BriefcaseBusiness,
  },
];
