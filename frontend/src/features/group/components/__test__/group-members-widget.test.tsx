import { render } from '@testing-library/react';
import { GroupMembersWidget } from '../group-members-widget';
import { GroupMember } from '@/types';
import { UserModel } from '@/models';

const mockGroupMembers = [
  {
    id: 1,
    documentId: 'member1',
    user: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar1.jpg',
      followedRelationships: [],
    } as UserModel,
    role: 'admin',
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
      avatar: 'https://example.com/avatar2.jpg',
      followedRelationships: [],
    } as UserModel,
    role: 'member',
  },
] as GroupMember[];

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
  useOptimistic: () => [mockGroupMembers, jest.fn()],
}));

describe('GroupMembersWidget', () => {
  const mockProps = {
    groupId: 1,
    authorId: '1',
    groupMembers: mockGroupMembers,
  };

  it('matches snapshot', () => {
    const { container } = render(<GroupMembersWidget {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders group members list correctly', () => {
    const { getByText } = render(<GroupMembersWidget {...mockProps} />);

    expect(getByText('Group Members')).toBeInTheDocument();
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Jane Smith')).toBeInTheDocument();
    expect(getByText('admin')).toBeInTheDocument();
    expect(getByText('member')).toBeInTheDocument();
  });

  it('renders member cards with correct roles', () => {
    const { getAllByText } = render(<GroupMembersWidget {...mockProps} />);

    const adminRoles = getAllByText('admin');
    const memberRoles = getAllByText('member');

    expect(adminRoles).toHaveLength(1);
    expect(memberRoles).toHaveLength(1);
  });

  it('renders invite members input', () => {
    const { getByPlaceholderText } = render(
      <GroupMembersWidget {...mockProps} />,
    );

    expect(
      getByPlaceholderText('Search friends to invite...'),
    ).toBeInTheDocument();
  });
});
