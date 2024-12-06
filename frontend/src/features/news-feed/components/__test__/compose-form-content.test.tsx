import { render, screen, fireEvent } from '@testing-library/react';
import { ComposeFormContent } from '../compose-form-content';
import { useForm, FormProvider } from 'react-hook-form';
import { ComposeFeedFormValues } from '../../hooks';

describe('ComposeFormContent', () => {
  const onOpenOverlay = jest.fn();

  const TestWrapper = () => {
    const methods = useForm<ComposeFeedFormValues>({
      defaultValues: {
        content: '',
      },
    });

    return (
      <FormProvider {...methods}>
        <ComposeFormContent
          onOpenOverlay={onOpenOverlay}
          formControl={methods.control}
        />
      </FormProvider>
    );
  };

  it('renders with avatar and textarea', () => {
    const { container } = render(<TestWrapper />);

    expect(
      screen.getByPlaceholderText('Write something about you...'),
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('calls onOpenOverlay when textarea is focused', () => {
    render(<TestWrapper />);

    const textarea = screen.getByPlaceholderText(
      'Write something about you...',
    );
    fireEvent.focus(textarea);

    expect(onOpenOverlay).toHaveBeenCalledTimes(1);
  });

  it('allows text input in textarea', () => {
    render(<TestWrapper />);

    const textarea = screen.getByPlaceholderText(
      'Write something about you...',
    );
    fireEvent.change(textarea, { target: { value: 'Hello world' } });

    expect(textarea).toHaveValue('Hello world');
  });
});
