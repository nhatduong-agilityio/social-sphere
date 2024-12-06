import { render, screen, fireEvent } from '@testing-library/react';
import { ComposeOptions } from '../compose-options';
import { FormProvider, useForm } from 'react-hook-form';
import { useDisclosure } from '@/hooks';

jest.mock('@/hooks', () => ({
  useDisclosure: jest.fn(() => ({
    isOpen: false,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  })),
  useFocusState: jest.fn(() => ({
    isFocused: true,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  })),
}));

describe('ComposeOptions', () => {
  const defaultProps = {
    isOverlayOpen: false,
    onFileChange: jest.fn(),
    onOpenOverlay: jest.fn(),
    onOpenGifPicker: jest.fn(),
    onOpenTagFriends: jest.fn(),
    onOpenMoods: jest.fn(),
    onOpenShareLink: jest.fn(),
    onOpenLocation: jest.fn(),
  };

  const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it('renders basic options when overlay is closed', () => {
    const { container } = render(
      <TestWrapper>
        <ComposeOptions {...defaultProps} />
      </TestWrapper>,
    );

    expect(screen.getByText('Media')).toBeInTheDocument();
    expect(screen.getByText('Activity')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders expanded options when overlay is open', () => {
    (useDisclosure as jest.Mock).mockReturnValue({
      isOpen: true,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    });

    render(
      <TestWrapper>
        <ComposeOptions {...defaultProps} isOverlayOpen={true} />
      </TestWrapper>,
    );

    expect(screen.getByText('Photo/Video')).toBeInTheDocument();
    expect(screen.getByText('Mood/Activity')).toBeInTheDocument();
    expect(screen.getByText('Tag friends')).toBeInTheDocument();
    expect(screen.getByText('Post location')).toBeInTheDocument();
    expect(screen.getByText('Share link')).toBeInTheDocument();
    expect(screen.getByText('Post GIF')).toBeInTheDocument();
  });

  it('handles media upload click', () => {
    render(
      <TestWrapper>
        <ComposeOptions {...defaultProps} />
      </TestWrapper>,
    );

    const mediaButton = screen.getByText('Media').parentElement!;
    fireEvent.click(mediaButton);

    const fileInput = screen.getByLabelText('Upload Media Publish');
    expect(fileInput).toBeInTheDocument();
  });

  it('handles file change events', () => {
    render(
      <TestWrapper>
        <ComposeOptions {...defaultProps} />
      </TestWrapper>,
    );

    const fileInput = screen.getByLabelText('Upload Media Publish');
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(defaultProps.onFileChange).toHaveBeenCalled();
  });
});
