import { render, screen } from '@testing-library/react';
import { NewsFeedComments } from '../news-feed-comments';
import { NewsFeedCommentPagination } from '@/types';
import { MOCK_FRIENDS } from '@/__mocks__';

jest.mock('emoji-picker-react', () => ({
  __esModule: true,
  default: () => <div data-testid="emoji-picker" />,
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [null, jest.fn()],
  useFormStatus: () => ({ pending: false }),
}));

describe('NewsFeedComments', () => {
  const mockAuthor = MOCK_FRIENDS[0];

  const mockComments = {
    data: [
      {
        id: 1,
        friend: MOCK_FRIENDS[0],
        createdAt: '2024-01-01T12:00:00Z',
        content: 'Test comment',
        reply: [],
        likes: {
          likesTotal: 5,
          remainingLikes: 2,
          likesRecent: [
            {
              friend: MOCK_FRIENDS[1],
              createdAt: '2024-01-01T12:00:00Z',
            },
          ],
        },
        isOwner: true,
        media: '/test-image.jpg',
      },
    ],
    commentTotal: 2,
    meta: { pagination: { page: 1, pageSize: 10, total: 1, pageCount: 1 } },
  } as NewsFeedCommentPagination;

  it('matches snapshot', () => {
    const { container } = render(
      <NewsFeedComments
        hasMore={false}
        comments={[]}
        commentTotal={0}
        author={mockAuthor}
        onCloseComments={() => {}}
        loadMoreComments={() => Promise.resolve()}
        onComment={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders comments count in header', () => {
    render(
      <NewsFeedComments
        hasMore={false}
        comments={mockComments.data}
        commentTotal={0}
        author={mockAuthor}
        onCloseComments={() => {}}
        loadMoreComments={() => Promise.resolve()}
        onComment={() => {}}
      />,
    );
    expect(screen.getByText('Comments (0)')).toBeInTheDocument();
  });
});
