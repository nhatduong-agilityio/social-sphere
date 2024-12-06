import {
  AccountGroupIcon,
  AccountHeartIcon,
  EmailPlusIcon,
  FormatFloatLeftIcon,
  TextBoxIcon,
} from '@/icons';

export const SHARE_OPTIONS = [
  {
    label: 'Share in your feed',
    value: 'yourFeed',
    description: 'Share this publication on your feed.',
    icon: <FormatFloatLeftIcon className="w-22 h-22 text-neutral-200" />,
  },
  {
    label: `Share in a friend's feed`,
    value: 'friendsFeed',
    description: `Share this publication on a friend's feed.`,
    icon: <AccountHeartIcon className="w-22 h-22 text-neutral-200" />,
  },
  {
    label: 'Share in a group',
    value: 'group',
    description: 'Share this publication in a group.',
    icon: <AccountGroupIcon className="w-22 h-22 text-neutral-200" />,
  },
  {
    label: 'Share in a page',
    value: 'page',
    description: 'Share this publication in a page.',
    icon: <TextBoxIcon className="w-22 h-22 text-neutral-200" />,
  },
  {
    label: 'Share in message',
    value: 'message',
    description: 'Share this publication in a private message.',
    icon: <EmailPlusIcon className="w-22 h-22 text-neutral-200" />,
  },
];
