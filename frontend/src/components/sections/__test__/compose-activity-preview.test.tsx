import { render, screen, waitFor } from '@testing-library/react';
import { ComposeActivityPreview } from '../compose-activity-preview';
import { getTaggedFriends } from '@/features/friend/actions';
import { MOODS } from '@/features/news-feed/constants';

// Mock the getTaggedFriends action
jest.mock('@/features/friend/actions', () => ({
  getTaggedFriends: jest.fn(),
}));

const mockFriends = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    username: 'janesmith',
  },
];

describe('ComposeActivityPreview', () => {
  beforeEach(() => {
    (getTaggedFriends as jest.Mock).mockResolvedValue(mockFriends);
  });

  it('renders mood with friends correctly', async () => {
    const props = {
      mood: {
        title: MOODS.STATUS,
        content: 'awesome',
      },
      friendIds: ['1', '2'],
      onRemoveFriend: jest.fn(),
      location: 'New York',
    };

    const { container } = render(<ComposeActivityPreview {...props} />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it('renders nothing when no content is provided', async () => {
    const props = {
      mood: {
        title: '',
        content: '',
      },
      friendIds: [],
      onRemoveFriend: jest.fn(),
      location: '',
    };

    const { container } = render(<ComposeActivityPreview {...props} />);
    await waitFor(() => {
      expect(container.firstChild).toBeNull();
      expect(container).toMatchSnapshot();
    });
  });

  it('renders when partial content is provided', async () => {
    const props = {
      mood: {
        title: '',
        content: '',
      },
      friendIds: ['1'],
      onRemoveFriend: jest.fn(),
      location: '',
    };

    const { container } = render(<ComposeActivityPreview {...props} />);

    await waitFor(() => {
      expect(container.firstChild).not.toBeNull();
      expect(container).toMatchSnapshot();
    });
  });

  it('renders multiple friends with correct separators', async () => {
    const props = {
      friendIds: ['1', '2', '3'],
      onRemoveFriend: jest.fn(),
      hasWithFriends: true,
    };

    render(<ComposeActivityPreview {...props} />);

    await waitFor(() => {
      const withText = screen.getByText(/with/i);
      expect(withText).toBeInTheDocument();
    });
  });
});
