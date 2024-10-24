import { NewsFeed } from '@/types';
import { MOCK_FRIENDS } from './user';

export const MOCK_NEWS_FEED: NewsFeed = {
  id: 'd4f27ea8-6e4f-4465-9147-2a5d60f25d8f',
  user: MOCK_FRIENDS[0],
  content: 'Lorems',
  createdDate: '2024-09-02T23:59:59Z',
};

export const MOCK_NEWS_FEED_LIST: NewsFeed[] = [
  {
    id: 'd4f27ea8-6e4f-4465-9147-2a5d60f25d8f',
    user: MOCK_FRIENDS[0],
    content: 'Lorems',
    createdDate: '2024-09-02T23:59:59Z',
  },
];
