import { Option } from '@/types/option';
import { GlobeIcon, LockIcon, UserIcon, UsersIcon } from 'lucide-react';

export const ACCESS_ITEMS = [
  {
    label: 'Activity Feed',
    value: 'activityFeed',
  },
  {
    label: 'My Story',
    value: 'myStory',
  },
];

const commonRoles = [
  {
    label: 'Public',
    value: 'public',
    description: 'Anyone can see this publication.',
    icon: <GlobeIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
  {
    label: 'Friends',
    value: 'friends',
    description: 'Only friends can see this publication.',
    icon: <UsersIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
];

export const ACTIVITY_ROLES = [
  ...commonRoles,
  {
    label: 'Specific Friends',
    value: 'specificFriends',
    description: `Don't show it to some friends.`,
    icon: <UserIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
  {
    label: 'Only me',
    value: 'onlyMe',
    description: 'Only me can see this publication.',
    icon: <LockIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
];

export const STORY_ROLES = [
  ...commonRoles,
  {
    label: 'Friends and contacts',
    value: 'friendsAndContacts',
    description: 'Your friends and contacts.',
    icon: <UsersIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
];

export enum MOODS {
  STATUS = 'status',
  DRINKING = 'drinking',
  EATING = 'eating',
  READING = 'reading',
  WATCHING = 'watching',
  TRAVELING = 'travelling',
}

export const MOODS_TITLE: Record<MOODS, string> = {
  [MOODS.STATUS]: 'Feels',
  [MOODS.DRINKING]: 'Drinks',
  [MOODS.EATING]: 'Eats',
  [MOODS.READING]: 'Reads',
  [MOODS.WATCHING]: 'Watches',
  [MOODS.TRAVELING]: 'Travels',
};

export const MOOD_OPTIONS: Option[] = [
  {
    label: 'status',
    value: 'status',
    description: 'how do you feel?',
    icon: '/images/feeling.svg',
  },
  {
    label: 'drinking',
    value: 'drinking',
    description: 'What are you drinking?',
    icon: '/images/drinking.svg',
  },
  {
    label: 'eating',
    value: 'eating',
    description: 'What are you eating?',
    icon: '/images/eating.svg',
  },
  {
    label: 'reading',
    value: 'reading',
    description: 'What are you reading?',
    icon: '/images/reading.svg',
  },
  {
    label: 'watching',
    value: 'watching',
    description: 'What are you watching?',
    icon: '/images/watching.svg',
  },
  {
    label: 'travelling',
    value: 'travelling',
    description: 'Where are you travelling to?',
    icon: '/images/travelling.svg',
  },
];

export const MOOD_DETAILS: Record<string, Option[]> = {
  [MOODS.STATUS]: [
    { label: 'Awesome', value: 'awesome', icon: '/images/awesome.svg' },
    { label: 'Great', value: 'great', icon: '/images/great.svg' },
    { label: 'Calm', value: 'calm', icon: '/images/calm.svg' },
    { label: 'Cool', value: 'cool', icon: '/images/cool.svg' },
    { label: 'Sad', value: 'sad', icon: '/images/sad.svg' },
  ],
  [MOODS.DRINKING]: [
    { label: 'water', value: 'water', icon: '/images/water.svg' },
    { label: 'a coffee', value: 'coffee', icon: '/images/coffee.svg' },
    { label: 'a soda', value: 'soda', icon: '/images/soda.svg' },
    {
      label: 'an energy drink',
      value: 'energyDrink',
      icon: '/images/energy-drink.svg',
    },
    { label: 'a smoothie', value: 'smoothie', icon: '/images/smoothie.svg' },
  ],
  // Add other mood details here (eating, reading, watching, travelling)
};
