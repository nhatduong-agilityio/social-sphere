import { render } from '@testing-library/react';
import { DashboardLayout } from '../dashboard-layout';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

// Mock the dependencies
jest.mock('@/auth');
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));
jest.mock('../header-container', () => ({
  HeaderContainer: jest.fn(({ username }) => (
    <header data-testid="header">Username: {username}</header>
  )),
}));

describe('DashboardLayout', () => {
  const mockChildren = <div>Test Children</div>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to login when auth returns null', async () => {
    (auth as jest.Mock).mockResolvedValue(null);
    await DashboardLayout({ children: mockChildren });
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should redirect to login when auth returns undefined', async () => {
    (auth as jest.Mock).mockResolvedValue(undefined);
    await DashboardLayout({ children: mockChildren });
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should redirect to login when user is null', async () => {
    (auth as jest.Mock).mockResolvedValue({ user: null });
    await DashboardLayout({ children: mockChildren });
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should render dashboard layout with children when JWT is present', async () => {
    const mockUser = {
      jwt: 'mock-jwt-token',
      username: 'testuser',
    };

    (auth as jest.Mock).mockResolvedValue({ user: mockUser });
    const layout = await DashboardLayout({ children: mockChildren });
    const { container } = render(layout);

    expect(container.querySelector('main')).toBeInTheDocument();
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('should pass username to HeaderContainer', async () => {
    const mockUser = {
      jwt: 'mock-jwt-token',
      username: 'testuser',
    };

    (auth as jest.Mock).mockResolvedValue({ user: mockUser });
    const layout = await DashboardLayout({ children: mockChildren });
    const { getByTestId } = render(layout);

    expect(getByTestId('header')).toHaveTextContent('Username: testuser');
  });
});
