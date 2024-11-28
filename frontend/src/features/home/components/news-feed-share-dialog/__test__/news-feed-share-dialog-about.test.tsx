import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewsFeedShareDialogAbout } from '../news-feed-share-dialog-about';
import { useForm, FormProvider } from 'react-hook-form';
import { ShareFormValues } from '@/features/home/hooks';

// Mock emoji-picker-react
jest.mock('emoji-picker-react', () => ({
  __esModule: true,
  default: () => <div data-testid="emoji-picker" />,
}));

describe('NewsFeedShareDialogAbout', () => {
  const TestWrapper = () => {
    const methods = useForm<ShareFormValues>({
      defaultValues: {
        content: '',
      },
    });

    return (
      <FormProvider {...methods}>
        <NewsFeedShareDialogAbout form={methods} />
      </FormProvider>
    );
  };

  it('matches snapshot', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toMatchSnapshot();
  });

  it('renders textarea input', () => {
    render(<TestWrapper />);
    expect(
      screen.getByPlaceholderText('Say something about this...'),
    ).toBeInTheDocument();
  });

  it('toggles emoji picker on button click', () => {
    render(<TestWrapper />);
    const emojiButton = screen.getByRole('button');
    fireEvent.click(emojiButton);
    expect(screen.getByTestId('emoji-picker')).toBeInTheDocument();
  });

  it('handles text input', () => {
    render(<TestWrapper />);
    const textarea = screen.getByPlaceholderText('Say something about this...');
    fireEvent.change(textarea, { target: { value: 'Test comment' } });
    expect(textarea).toHaveValue('Test comment');
  });

  it('closes emoji picker when clicking outside', async () => {
    render(<TestWrapper />);
    const emojiButton = screen.getByRole('button');
    fireEvent.click(emojiButton);
    fireEvent.mouseDown(document.body);
    await waitFor(() => {
      expect(screen.queryByTestId('emoji-picker')).not.toBeInTheDocument();
    });
  });
});
