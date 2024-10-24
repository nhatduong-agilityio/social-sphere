'use client';

import { memo } from 'react';

// Constants
import { NEWS_FEED_MORE_OPTIONS } from '../constants';

// Components
import { UserCardHeader } from '@/components/sections';
import { Card } from '@/components/ui';

// Types
import { NewsFeed } from '@/types';

// Utils
import { formatDate, getFullName } from '@/utils';

interface NewsFeedCardProps {
  newsFeed: NewsFeed;
}

export const NewsFeedCard = memo(({ newsFeed }: NewsFeedCardProps) => {
  const { user, createdDate = '2024-09-02T23:59:59Z' } = newsFeed;

  const title = getFullName(user.firstName, user.lastName);
  const description = formatDate(createdDate);

  return (
    <Card>
      <UserCardHeader
        user={user}
        title={title}
        description={description}
        moreOptions={NEWS_FEED_MORE_OPTIONS}
      />
    </Card>
  );
});

NewsFeedCard.displayName = 'NewsFeedCard';
