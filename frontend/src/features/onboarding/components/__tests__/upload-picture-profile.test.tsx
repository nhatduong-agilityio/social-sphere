import { fireEvent, render, waitFor } from '@testing-library/react';

// Stores
import { useOnboardingStore } from '../../stores';

// Components
import { UploadPictureProfile } from '../upload-picture-profile';

// Services
import { upload } from '@/services';

jest.mock('../../stores', () => ({
  useOnboardingStore: jest.fn(),
}));

jest.mock('@/services', () => ({
  upload: jest.fn(),
}));

describe('UploadPictureProfile Component', () => {
  const mockSetCurrentStep = jest.fn();
  const mockSetOnboardingData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useOnboardingStore as unknown as jest.Mock).mockReturnValue({
      currentStep: 3,
      setCurrentStep: mockSetCurrentStep,
      onboardingData: { profilePicture: null },
      setOnboardingData: mockSetOnboardingData,
    });
  });

  it('should render correctly', () => {
    const { container } = render(<UploadPictureProfile />);

    expect(container).toMatchSnapshot();
  });

  it('handles file selection and uploads the file', async () => {
    const mockFile = new File(['dummy content'], 'profile.jpg', {
      type: 'image/jpeg',
    });
    const mockImageUrl = 'https://example.com/profile.jpg';
    (upload as jest.Mock).mockResolvedValue(mockImageUrl);

    const { getByTitle } = render(<UploadPictureProfile />);

    const input = getByTitle('Upload profile picture');

    fireEvent.change(input, {
      target: { files: [mockFile] },
    });

    await waitFor(() => expect(upload).toHaveBeenCalledWith(mockFile));
  });

  it('navigates to the next step when the "Next" button is clicked', async () => {
    const mockImageUrl = 'https://example.com/profile.jpg';
    (upload as jest.Mock).mockResolvedValue(mockImageUrl);

    const { getByTitle, getByRole } = render(<UploadPictureProfile />);

    const input = getByTitle('Upload profile picture');
    const nextButton = getByRole('button', { name: 'Next' });

    fireEvent.change(input, {
      target: {
        files: [
          new File(['dummy content'], 'profile.jpg', { type: 'image/jpeg' }),
        ],
      },
    });

    await waitFor(() => expect(upload).toHaveBeenCalled());

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockSetOnboardingData).toHaveBeenCalledWith({
        profilePicture: mockImageUrl,
      });
      expect(mockSetCurrentStep).toHaveBeenCalledWith(4);
    });
  });

  it('calls handlePlusButton when Plus button is clicked', async () => {
    const { getByTitle } = render(<UploadPictureProfile />);

    const uploadButton = getByTitle('upload-button');
    fireEvent.click(uploadButton);

    expect(uploadButton).toBeInTheDocument();
  });

  it('calls handleBackButton when Back button is clicked', () => {
    const { getByRole } = render(<UploadPictureProfile />);

    const backButton = getByRole('button', { name: 'Back' });
    fireEvent.click(backButton);

    expect(mockSetCurrentStep).toHaveBeenCalledWith(2);
  });
});
