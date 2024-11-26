import { render, waitFor } from '@testing-library/react';

// APIs
import { getFriendListByUsername } from '@/api/friends-profile/route';

// Components
import { FriendPanel } from '../friend-panel';

// Mocks
import { MOCK_ACCEPTED_FRIENDS } from '@/__mocks__/user';

// Mock the API function
jest.mock('@/api/friends-profile/route', () => ({
  getFriendListByUsername: jest.fn(),
}));

jest.mock('@/utils', () => ({
  getFullName: jest.fn(),
  cn: jest.fn(),
  getFirstLetters: jest.fn(),
}));

describe('FriendPanel Component', () => {
  beforeEach(() => {
    (getFriendListByUsername as jest.Mock).mockResolvedValue(
      MOCK_ACCEPTED_FRIENDS,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { container } = render(
      await FriendPanel({ username: 'admin@gmail.com' }),
    );
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
