import { render } from '@testing-library/react';
import { OverviewContent } from '../overview-content';
import { MOCK_FRIENDS } from '@/__mocks__';
import { auth } from '@/auth';

jest.mock('../../actions', () => ({
  getProfile: jest.fn(() => MOCK_FRIENDS[0]),
}));

jest.mock('@/auth', () => ({
  auth: jest.fn(() => ({
    user: {
      id: '1',
    },
  })),
}));

describe('OverviewContent Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { container } = render(
      await OverviewContent({ username: 'admin@gmail.com' }),
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly without auth', async () => {
    (auth as jest.Mock).mockReturnValueOnce(null);

    const { container } = render(
      await OverviewContent({ username: 'admin@gmail.com' }),
    );

    expect(container).toBeInTheDocument();
  });
});
