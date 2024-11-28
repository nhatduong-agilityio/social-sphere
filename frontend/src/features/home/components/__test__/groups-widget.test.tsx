import { render, screen } from '@testing-library/react';
import { GroupsWidget } from '../groups-widget';
import { fetchGroups } from '@/actions';
import { GroupsListResponse } from '@/types';

jest.mock('@/actions', () => ({
  fetchGroups: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{ message: null, error: null }, jest.fn()],
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const MOCK_GROUPS = {
  data: [
    {
      id: 1,
      documentId: 'group1',
      name: 'Test Group 1',
      description: 'First test group',
      avatar: 'avatar1.jpg',
      author: { id: 1 },
      members: [{ user: { id: 1 }, documentId: 'member1' }],
    },
    {
      id: 2,
      documentId: 'group2',
      name: 'Test Group 2',
      description: 'Second test group',
      avatar: 'avatar2.jpg',
      author: { id: 2 },
      members: [{ user: { id: 1 }, documentId: 'member2' }],
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 2,
      total: 15,
    },
  },
} as GroupsListResponse;

describe('GroupsWidget', () => {
  const mockProps = {
    authorId: '1',
    groups: MOCK_GROUPS,
  };

  beforeEach(() => {
    (fetchGroups as jest.Mock).mockResolvedValue(MOCK_GROUPS);
  });

  it('matches snapshot', () => {
    const { container } = render(<GroupsWidget {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders groups list correctly', () => {
    render(<GroupsWidget {...mockProps} />);

    MOCK_GROUPS.data.forEach((group) => {
      expect(screen.getByText(group.name)).toBeInTheDocument();
    });
  });
});
