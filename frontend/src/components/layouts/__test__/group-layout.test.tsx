import { render } from '@testing-library/react';
import { GroupLayout } from '../group-layout';
import { auth } from '@/auth';
import { getGroupByName } from '@/features/group/actions';
import { notFound } from 'next/navigation';

jest.mock('@/auth');
jest.mock('@/features/group/actions');
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));
jest.mock('@/features/group/components', () => ({
  GroupHeader: jest.fn(({ group, authorId }) => (
    <header data-testid="group-header">
      Group: {group.name}, Author: {authorId}
    </header>
  )),
}));

describe('GroupLayout', () => {
  const mockChildren = <div>Test Children</div>;
  const mockGroupName = 'test-group';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render group layout when group and userId exist', async () => {
    const mockGroup = { id: 1, name: 'test-group' };
    const mockUser = { id: 'user123' };

    (auth as jest.Mock).mockResolvedValue({ user: mockUser });
    (getGroupByName as jest.Mock).mockResolvedValue({ data: mockGroup });

    const layout = await GroupLayout({
      children: mockChildren,
      groupName: mockGroupName,
    });
    const { container, getByTestId } = render(layout);

    expect(container.querySelector('main')).toBeInTheDocument();
    expect(getByTestId('group-header')).toBeInTheDocument();
    expect(getByTestId('group-header')).toHaveTextContent(
      `Group: ${mockGroup.name}`,
    );
    expect(getByTestId('group-header')).toHaveTextContent(
      `Author: ${mockUser.id}`,
    );
  });

  it('should call notFound when group does not exist', async () => {
    const mockUser = { id: 'user123' };

    (auth as jest.Mock).mockResolvedValue({ user: mockUser });
    (getGroupByName as jest.Mock).mockResolvedValue({ data: null });

    await GroupLayout({ children: mockChildren, groupName: mockGroupName });

    expect(notFound).toHaveBeenCalled();
  });

  it('should call notFound when userId does not exist', async () => {
    const mockGroup = { id: 1, name: 'test-group' };

    (auth as jest.Mock).mockResolvedValue({ user: null });
    (getGroupByName as jest.Mock).mockResolvedValue({ data: mockGroup });

    await GroupLayout({ children: mockChildren, groupName: mockGroupName });

    expect(notFound).toHaveBeenCalled();
  });

  it('should call notFound when auth returns null', async () => {
    const mockGroup = { id: 1, name: 'test-group' };

    (auth as jest.Mock).mockResolvedValue(null);
    (getGroupByName as jest.Mock).mockResolvedValue({ data: mockGroup });

    await GroupLayout({ children: mockChildren, groupName: mockGroupName });

    expect(notFound).toHaveBeenCalled();
  });
});
