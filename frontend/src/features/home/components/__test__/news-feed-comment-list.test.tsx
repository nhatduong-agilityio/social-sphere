import { render, screen, fireEvent } from '@testing-library/react';
import { NewsFeedCommentList } from '../news-feed-comment-list';
import { NewsFeedComment } from '@/types';
import { MOCK_FRIENDS } from '@/__mocks__';

describe('NewsFeedCommentList', () => {
  const mockComment = {
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
  } as NewsFeedComment;

  const mockProps = {
    comment: mockComment,
    onCommentReply: jest.fn(),
  };

  it('matches snapshot', () => {
    const { container } = render(<NewsFeedCommentList {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with replies', () => {
    const commentWithReplies = {
      ...mockComment,
      reply: [
        {
          id: 2,
          friend: MOCK_FRIENDS[1],
          createdAt: '2024-01-02T12:00:00Z',
          content: 'Reply comment',
          reply: [],
          isOwner: false,
        },
      ],
    };
    const { container } = render(
      <NewsFeedCommentList {...mockProps} comment={commentWithReplies} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders comment content and media', () => {
    render(<NewsFeedCommentList {...mockProps} />);
    expect(screen.getByText('Test comment')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('handles reply action', () => {
    render(<NewsFeedCommentList {...mockProps} />);
    const replyButton = screen.getByText('Reply');
    fireEvent.click(replyButton);
    expect(mockProps.onCommentReply).toHaveBeenCalledWith({
      commentId: 1,
      friend: mockComment.friend,
    });
  });

  it('shows edit button for owner', () => {
    render(<NewsFeedCommentList {...mockProps} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('hides edit button for non-owner', () => {
    const nonOwnerComment = { ...mockComment, isOwner: false };
    render(<NewsFeedCommentList {...mockProps} comment={nonOwnerComment} />);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
});
