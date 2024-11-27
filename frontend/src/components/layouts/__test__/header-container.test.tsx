import { render } from '@testing-library/react';
import { HeaderContainer } from '../header-container';
import { getProfile } from '@/features/profile/actions';
import { Header } from '../header';

jest.mock('@/features/profile/actions');
jest.mock('../header', () => ({
  Header: jest.fn(({ isAuthenticated, user }) => (
    <div data-testid="header">
      <span data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </span>
      <span data-testid="user-data">{JSON.stringify(user)}</span>
    </div>
  )),
}));

describe('HeaderContainer', () => {
  const mockUsername = 'testuser';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Header with profile data when profile exists', async () => {
    const mockProfile = {
      id: 1,
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
    };

    (getProfile as jest.Mock).mockResolvedValue(mockProfile);

    const container = await HeaderContainer({ username: mockUsername });
    const { getByTestId } = render(container);

    expect(getProfile).toHaveBeenCalledWith(mockUsername);
    expect(getByTestId('auth-status')).toHaveTextContent('Authenticated');
    expect(getByTestId('user-data')).toHaveTextContent(
      JSON.stringify(mockProfile),
    );
  });

  it('should render Header with isAuthenticated false when no profile exists', async () => {
    (getProfile as jest.Mock).mockResolvedValue(null);

    const container = await HeaderContainer({ username: mockUsername });
    const { getByTestId } = render(container);

    expect(getProfile).toHaveBeenCalledWith(mockUsername);
    expect(getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
  });

  it('should pass correct props to Header component', async () => {
    const mockProfile = {
      id: 1,
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
    };

    (getProfile as jest.Mock).mockResolvedValue(mockProfile);

    const container = await HeaderContainer({ username: mockUsername });
    render(container);

    expect(Header).toHaveBeenCalledWith(
      {
        isAuthenticated: true,
        user: mockProfile,
      },
      expect.any(Object),
    );
  });
});
