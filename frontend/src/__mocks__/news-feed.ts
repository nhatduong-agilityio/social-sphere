import { NewsFeed } from '@/types';
import { MOCK_FRIENDS } from './user';

export const MOCK_NEWS_FEED: NewsFeed = {
  id: 'd4f27ea8-6e4f-4465-9147-2a5d60f25d8f',
  user: MOCK_FRIENDS[0],
  content: 'Was totally fantastic! People were really excited about this one!',
  createdDate: '2024-09-02T23:59:59Z',
  likes: {
    likesTotal: 5,
    remainingLikes: 3,
    likesRecent: [
      {
        friend: MOCK_FRIENDS[1],
        createdDate: '2024-09-03T22:59:59Z',
      },
      {
        friend: MOCK_FRIENDS[2],
        createdDate: '2024-09-03T23:00:59Z',
      },
      {
        friend: MOCK_FRIENDS[3],
        createdDate: '2024-09-03T23:05:59Z',
      },
      {
        friend: MOCK_FRIENDS[4],
        createdDate: '2024-09-03T23:06:59Z',
      },
      {
        friend: MOCK_FRIENDS[5],
        createdDate: '2024-09-03T23:09:59Z',
      },
    ],
  },
  comments: {
    data: {
      totalComments: 4,
      comments: [
        {
          id: 'd4f27ea8-6e4f-4465-0000-2a5d60f25d8f',
          friend: MOCK_FRIENDS[1],
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.',
          createdDate: '2024-09-03T22:59:59Z',
          likes: [MOCK_FRIENDS[5]],
          reply: [
            {
              id: 'd4f27ea8-6e4f-4465-1111-2a5d60f25d8f',
              friend: MOCK_FRIENDS[5],
              content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.',
              createdDate: '2024-09-03T23:59:59Z',
            },
            {
              id: 'd4f27ea8-6e4f-4465-1111-2a5d60231122',
              friend: MOCK_FRIENDS[5],
              content:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.',
              createdDate: '2024-09-03T23:59:59Z',
            },
          ],
          isOwner: true,
        },
        {
          id: 'd4f27ea8-6e4f-4465-0000-2a5d60f25238',
          friend: MOCK_FRIENDS[1],
          content:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.',
          createdDate: '2024-09-03T22:59:59Z',
          likes: [MOCK_FRIENDS[5]],
          isOwner: false,
        },
      ],
    },
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
      createdDate: '2024-09-03T23:59:59Z',
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

export const MOCK_NEWS_FEED_LIST: NewsFeed[] = [MOCK_NEWS_FEED];
