import { render, screen } from '@testing-library/react';
import { NewsFeedShareDialogControl } from '../news-feed-share-dialog-control';
import { useForm, FormProvider } from 'react-hook-form';
import { ShareFormValues } from '@/features/home/hooks';
import { Dialog } from '@/components/ui';

describe('NewsFeedShareDialogControl', () => {
  const TestWrapper = () => {
    const methods = useForm<ShareFormValues>();
    const mockProps = {
      form: methods,
      onOpenTagFriends: jest.fn(),
      onOpenLocation: jest.fn(),
    };

    return (
      <Dialog defaultOpen>
        <FormProvider {...methods}>
          <NewsFeedShareDialogControl {...mockProps} />
        </FormProvider>
      </Dialog>
    );
  };

  it('matches snapshot', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toMatchSnapshot();
  });

  it('renders all control buttons', () => {
    render(<TestWrapper />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5); // Tag, Location, Privacy, Cancel, Publish
  });
});
