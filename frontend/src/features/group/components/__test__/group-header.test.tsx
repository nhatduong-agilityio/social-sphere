import { render } from '@testing-library/react';
import { GroupHeader } from '../group-header';
import { GroupDetail, GroupRole } from '@/types';
import { UserModel } from '@/models';

const mockGroupDetail: GroupDetail = {
  id: 1,
  avatar: 'https://example.com/avatar.jpg',
  createdAt: '2024-01-20T10:30:00Z',
  documentId: 'group123',
  banner: 'https://example.com/banner.jpg',
  name: 'Tech Enthusiasts',
  description: 'A group for technology lovers and innovators',
  isPrivate: false,
  author: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john@example.com',
    avatar: 'https://example.com/john-avatar.jpg',
    followedRelationships: [],
  } as UserModel,
  members: [
    {
      id: 1,
      documentId: 'member1',
      user: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        avatar: 'https://example.com/john-avatar.jpg',
        followedRelationships: [],
      } as UserModel,
      role: GroupRole.ADMIN,
    },
    {
      id: 2,
      documentId: 'member2',
      user: {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        avatar: 'https://example.com/jane-avatar.jpg',
        followedRelationships: [],
      } as UserModel,
      role: GroupRole.MEMBER,
    },
  ],
  newsFeeds: [
    {
      id: 1,
      documentId: 'news1',
      content: 'Welcome to our tech group!',
      createdAt: '2024-01-20T11:00:00Z',
      author: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        avatar: 'https://example.com/john-avatar.jpg',
        followedRelationships: [],
      } as UserModel,
    },
  ],
};

// Mock useOptimistic hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useOptimistic: () => [mockGroupDetail, jest.fn()],
  useTransition: () => [false, jest.fn()],
  useEffect: jest.fn(),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{ message: null, error: null }, jest.fn()],
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

describe('GroupHeader', () => {
  it('matches snapshot for admin user', () => {
    const { container } = render(
      <GroupHeader authorId="1" group={mockGroupDetail} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot for non-admin user', () => {
    const { container } = render(
      <GroupHeader authorId="2" group={mockGroupDetail} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot for member user', () => {
    const memberGroup = {
      ...mockGroupDetail,
      members: [
        {
          id: 2,
          documentId: 'member2',
          user: {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            username: 'janesmith',
            email: 'jane@example.com',
            avatar: 'https://example.com/jane-avatar.jpg',
            followedRelationships: [],
          } as UserModel,
          role: GroupRole.MEMBER,
        },
      ],
    };

    const { container } = render(
      <GroupHeader authorId="2" group={memberGroup} />,
    );
    expect(container).toMatchSnapshot();
  });
});
