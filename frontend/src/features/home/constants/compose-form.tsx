import { COUNTRIES } from '@/constants/countries';
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
  [MOODS.EATING]: [
    {
      label: 'a good meal',
      value: 'meal',
      icon: '/images/meal.svg',
    },
    {
      label: 'at the restaurant',
      value: 'restaurant',
      icon: '/images/restaurant.svg',
    },
    {
      label: 'candy',
      value: 'candy',
      icon: '/images/candy.svg',
    },
    {
      label: 'a piece of cheese',
      value: 'cheese',
      icon: '/images/cheese.svg',
    },
    {
      label: 'a pack of fries',
      value: 'fries',
      icon: '/images/fries.svg',
    },
  ],
  [MOODS.READING]: [
    {
      label: 'The Colony',
      description: 'by Isac Galinov',
      value: 'theColony',
      icon: '/images/book.svg',
    },
    {
      label: 'My Trial',
      description: 'by Franz Fafka',
      value: 'myTrial',
      icon: '/images/book.svg',
    },
    {
      label: 'The Sand Planet',
      description: 'by Franck Ferbet',
      value: 'theSandPlanet',
      icon: '/images/book.svg',
    },
    {
      label: 'The Call of Gods',
      description: 'by John Belcks',
      value: 'theCallOfGods',
      icon: '/images/book.svg',
    },
    {
      label: 'The Lord Of Time',
      description: 'by Franck Bright',
      value: 'theLordOfTime',
      icon: '/images/book.svg',
    },
    {
      label: 'Les Miséreux',
      description: 'by Victor Hugues',
      value: 'lesMisereux',
      icon: '/images/book.svg',
    },
  ],
  [MOODS.WATCHING]: [
    {
      label: 'Traffic Flow',
      description: 'TV Show',
      value: 'trafficFlow',
      icon: '/images/movie.svg',
    },
    {
      label: 'Alien Parasit',
      description: 'Movie',
      value: 'alienParasit',
      icon: '/images/movie.svg',
    },
    {
      label: 'Galaxy Wars',
      description: 'Movie',
      value: 'galaxyWars',
      icon: '/images/movie.svg',
    },
    {
      label: 'The Great Invasion',
      description: 'Movie',
      value: 'theGreatInvasion',
      icon: '/images/movie.svg',
    },
    {
      label: 'The Dark Ages',
      description: 'TV Show',
      value: 'theDarkAges',
      icon: '/images/movie.svg',
    },
    {
      label: 'Freaking Holdup',
      description: 'TV Show',
      value: 'freakingHoldup',
      icon: '/images/movie.svg',
    },
  ],
  [MOODS.TRAVELING]: [
    ...COUNTRIES.map(({ name, code }) => ({
      label: name,
      value: code,
    })),
  ],
  // Add other mood details here (eating, reading, watching, travelling)
};
