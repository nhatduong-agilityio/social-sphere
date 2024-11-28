import { render } from '@testing-library/react';
import { NewsFeedCommentForm } from '../news-feed-comment-form';
import { useForm, FormProvider } from 'react-hook-form';
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

describe('NewsFeedCommentForm', () => {
  const mockUser = MOCK_FRIENDS[0];

  const mockCommentReplyValue = {
    commentId: undefined,
    friend: undefined,
  };

  const mockProps = {
    user: mockUser,
    commentReplyValue: mockCommentReplyValue,
    onComment: jest.fn(),
    onClearCommentReply: jest.fn(),
  };

  const TestWrapper = () => {
    const methods = useForm();
    return (
      <FormProvider {...methods}>
        <NewsFeedCommentForm {...mockProps} />
      </FormProvider>
    );
  };

  it('matches snapshot', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toMatchSnapshot();
  });
});
