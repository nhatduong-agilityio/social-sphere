import { render, screen, waitFor } from '@testing-library/react';
import { auth } from '@/auth';
import { getGroups } from '@/features/group/actions';
import { GroupsWidget } from '../groups-widget';

// Mock dependencies
jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('@/features/group/actions', () => ({
  getGroups: jest.fn(),
}));

jest.mock('../groups-content', () => ({
  GroupsContent: ({
    groups,
    authorId,
  }: {
    groups: Array<{ name: string }>;
    authorId: string;
  }) => (
    <div data-testid="groups-content">
      <span data-testid="author-id">{authorId}</span>
      {groups.map((group: { name: string }, index: number) => (
        <div key={index} data-testid="group">
          {group.name}
        </div>
      ))}
    </div>
  ),
}));

describe('GroupsWidget Component', () => {
  const mockAuth = auth as jest.Mock;
  const mockGetGroups = getGroups as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders GroupsContent with groups and authorId', async () => {
    const mockSession = { user: { id: '123' } };
    const mockGroups = {
      data: [
        { id: 1, name: 'Group 1' },
        { id: 2, name: 'Group 2' },
      ],
    };

    mockAuth.mockResolvedValue(mockSession);
    mockGetGroups.mockResolvedValue(mockGroups);

    render(await GroupsWidget());

    await waitFor(() => {
      expect(mockAuth).toHaveBeenCalled();
      expect(mockGetGroups).toHaveBeenCalledWith('123');
    });

    expect(screen.getByTestId('author-id')).toHaveTextContent('123');
    expect(screen.getAllByTestId('group')).toHaveLength(2);
    expect(screen.getAllByTestId('group')[0]).toHaveTextContent('Group 1');
    expect(screen.getAllByTestId('group')[1]).toHaveTextContent('Group 2');
  });

  it('handles no session gracefully', async () => {
    mockAuth.mockResolvedValue(null);
    mockGetGroups.mockResolvedValue({ data: [] });

    render(await GroupsWidget());

    await waitFor(() => {
      expect(mockAuth).toHaveBeenCalled();
      expect(mockGetGroups).toHaveBeenCalledWith('undefined');
    });

    expect(screen.queryByTestId('group')).not.toBeInTheDocument();
    expect(screen.getByTestId('author-id')).toHaveTextContent('undefined');
  });

  it('handles empty groups gracefully', async () => {
    const mockSession = { user: { id: '123' } };
    const mockGroups = { data: [] };

    mockAuth.mockResolvedValue(mockSession);
    mockGetGroups.mockResolvedValue(mockGroups);

    render(await GroupsWidget());

    await waitFor(() => {
      expect(mockAuth).toHaveBeenCalled();
      expect(mockGetGroups).toHaveBeenCalledWith('123');
    });

    expect(screen.queryByTestId('group')).not.toBeInTheDocument();
    expect(screen.getByTestId('author-id')).toHaveTextContent('123');
  });
});
