'use client';

import { BellIcon, BookmarkIcon, FlagIcon, XIcon } from 'lucide-react';

export const NEWS_FEED_MORE_OPTIONS = [
  {
    label: 'Bookmark',
    value: 'bookmark',
    description: 'Add this post to your bookmarks.',
    icon: (
      <BookmarkIcon size={18} strokeWidth={1} className="text-neutral-400" />
    ),
  },
  {
    label: 'Notify me',
    value: 'notifyMe',
    description: 'Send me the updates.',
    icon: <BellIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
  {
    label: 'Flag',
    value: 'flag',
    description: 'In case of inappropriate content.',
    icon: <FlagIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
];

export const NEWS_FEED_COMMENT_MORE_OPTIONS = [
  {
    label: 'Hide',
    value: 'hide',
    description: 'Hide this comment.',
    icon: <XIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
  {
    label: 'Report',
    value: 'report',
    description: 'Report this comment.',
    icon: <FlagIcon size={18} strokeWidth={1} className="text-neutral-400" />,
  },
];
