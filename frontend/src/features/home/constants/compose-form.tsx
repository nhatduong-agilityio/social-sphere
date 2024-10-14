import { GlobeIcon, LockIcon, UserIcon, UsersIcon } from 'lucide-react';

export const ACCESS_ITEMS = [
  {
    label: 'Activity Feed',
  },
  {
    label: 'My Story',
  },
];

const commonRoles = [
  {
    label: 'Public',
    description: 'Anyone can see this publication.',
    icon: <GlobeIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
  {
    label: 'Friends',
    description: 'Only friends can see this publication.',
    icon: <UsersIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
];

export const ACTIVITY_ROLES = [
  ...commonRoles,
  {
    label: 'Specific Friends',
    description: `Don't show it to some friends.`,
    icon: <UserIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
  {
    label: 'Only me',
    description: 'Only me can see this publication.',
    icon: <LockIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
];

export const STORY_ROLES = [
  ...commonRoles,
  {
    label: 'Friends and contacts',
    description: 'Your friends and contacts.',
    icon: <UsersIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
];
