import { NewsFeed, NewsFeedsResponse } from '@/types';
import { MOCK_FRIENDS } from './user';

export const MOCK_NEWS_FEED: NewsFeed = {
  id: 1,
  author: MOCK_FRIENDS[0],
  content: 'Was totally fantastic! People were really excited about this one!',
  createdAt: '2024-09-02T23:59:59Z',
  likes: {
    likesTotal: 5,
    remainingLikes: 3,
    likesRecent: [
      {
        friend: MOCK_FRIENDS[1],
        createdAt: '2024-09-03T22:59:59Z',
      },
      {
        friend: MOCK_FRIENDS[2],
        createdAt: '2024-09-03T23:00:59Z',
      },
      {
        friend: MOCK_FRIENDS[3],
        createdAt: '2024-09-03T23:05:59Z',
      },
      {
        friend: MOCK_FRIENDS[4],
        createdAt: '2024-09-03T23:06:59Z',
      },
      {
        friend: MOCK_FRIENDS[5],
        createdAt: '2024-09-03T23:09:59Z',
      },
    ],
  },
  comments: {
    commentTotal: 5,
    data: [
      {
        id: 1,
        friend: MOCK_FRIENDS[1],
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.',
        createdAt: '2024-09-03T22:59:59Z',
        likes: {
          likesTotal: 5,
          remainingLikes: 3,
          likesRecent: [
            {
              friend: MOCK_FRIENDS[1],
              createdAt: '2024-09-03T22:59:59Z',
            },
            {
              friend: MOCK_FRIENDS[2],
              createdAt: '2024-09-03T23:00:59Z',
            },
            {
              friend: MOCK_FRIENDS[3],
              createdAt: '2024-09-03T23:05:59Z',
            },
            {
              friend: MOCK_FRIENDS[4],
              createdAt: '2024-09-03T23:06:59Z',
            },
          ],
        },
        reply: [
          {
            id: 4,
            friend: MOCK_FRIENDS[5],
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.',
            createdAt: '2024-09-03T23:59:59Z',
          },
          {
            id: 3,
            friend: MOCK_FRIENDS[5],
            content:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.',
            createdAt: '2024-09-03T23:59:59Z',
          },
        ],
        isOwner: true,
      },
      {
        id: 5,
        friend: MOCK_FRIENDS[1],
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.',
        createdAt: '2024-09-03T22:59:59Z',
        likes: {
          likesTotal: 5,
          remainingLikes: 3,
          likesRecent: [
            {
              friend: MOCK_FRIENDS[1],
              createdAt: '2024-09-03T22:59:59Z',
            },
            {
              friend: MOCK_FRIENDS[2],
              createdAt: '2024-09-03T23:00:59Z',
            },
            {
              friend: MOCK_FRIENDS[3],
              createdAt: '2024-09-03T23:05:59Z',
            },
          ],
        },
        isOwner: false,
      },
    ],

    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 1,
        total: 1,
      },
    },
  },
  shares: [
    {
      id: 'd4f27ea8-6e4f-4472-9147-2a5d60f25d8f',
      friend: MOCK_FRIENDS[0],
      createdAt: '2024-09-03T23:59:59Z',
    },
  ],
  accessItems: ['activityFeed'],
  activityRole: 'friends',
  storyRole: 'friends',
  tagFriends: [MOCK_FRIENDS[4], MOCK_FRIENDS[5]],
  mood: {
    title: 'drinking',
    content: 'coffee',
  },
  location: 'Da Nang, Vietnam',
  media: 'blob:http://localhost:3000/a1698d1b-add9-4e2c-8c48-5fa5961f1a56',
  isLiked: true,
};

export const MOCK_NEWS_FEED_LIST: NewsFeedsResponse = {
  data: [MOCK_NEWS_FEED],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 100,
    },
  },
};
