import { render, screen, fireEvent } from '@testing-library/react';
import { ShareLinkPicker } from '../share-link-picker';
import { useForm, FormProvider } from 'react-hook-form';
import { ComposeFeedFormValues } from '../../hooks';

describe('ShareLinkPicker', () => {
  const TestWrapper = () => {
    const methods = useForm<ComposeFeedFormValues>({
      defaultValues: {
        sharedLink: '',
      },
    });

    return (
      <FormProvider {...methods}>
        <ShareLinkPicker form={methods} onCloseShareLinkPicker={jest.fn()} />
      </FormProvider>
    );
  };

  it('matches snapshot', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toMatchSnapshot();
  });

  it('renders URL input field', () => {
    render(<TestWrapper />);
    expect(
      screen.getByPlaceholderText('Enter the link URL'),
    ).toBeInTheDocument();
  });

  it('handles input change', () => {
    render(<TestWrapper />);
    const input = screen.getByPlaceholderText('Enter the link URL');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    expect(input).toHaveValue('https://example.com');
  });
});
