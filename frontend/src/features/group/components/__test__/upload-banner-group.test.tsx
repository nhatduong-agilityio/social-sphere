import { render, fireEvent, act } from '@testing-library/react';
import { UploadBannerGroup } from '../upload-banner-group';
import { IMAGES } from '@/constants';
import { ToastProps } from '@/components/ui';
import { GroupDetail } from '@/types';

const mockToast = jest.fn();
const mockUpload = jest.fn();
const mockUpdateGroup = jest.fn();
const mockStartTransition = jest.fn((cb) => cb());

jest.mock('@/hooks', () => ({
  toast: ({ ...props }: ToastProps) => mockToast(props),
  useFocusState: () => ({
    isFocused: true,
    handleFocus: jest.fn(),
    handleBlur: jest.fn(),
  }),
}));

jest.mock('@/services', () => ({
  upload: (file: File) => mockUpload(file),
}));

jest.mock('../../actions', () => ({
  updateGroup: (groupId: string, data: GroupDetail) =>
    mockUpdateGroup(groupId, data),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, mockStartTransition],
}));

describe('UploadBannerGroup', () => {
  const mockGroup = {
    id: 1,
    documentId: 'group-1',
    name: 'Test Group',
    banner: IMAGES.PROFILE_BANNER.url,
  } as GroupDetail;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUpload.mockResolvedValue(IMAGES.PROFILE_BANNER.url);
  });

  it('matches snapshot', () => {
    const { container } = render(<UploadBannerGroup group={mockGroup} />);
    expect(container).toMatchSnapshot();
  });

  it('handles file upload successfully', async () => {
    const { getByTestId } = render(<UploadBannerGroup group={mockGroup} />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = getByTestId('input-element');

    await act(async () => {
      fireEvent.change(fileInput, {
        target: { files: [file] },
      });
    });

    expect(mockUpload).toHaveBeenCalledWith(file);
    expect(mockUpdateGroup).toHaveBeenCalledWith('1', {
      banner: IMAGES.PROFILE_BANNER.url,
    });
    expect(mockToast).toHaveBeenCalled();
  });

  it('handles file validation error', async () => {
    const { getByTestId } = render(<UploadBannerGroup group={mockGroup} />);

    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const fileInput = getByTestId('input-element');

    await act(async () => {
      fireEvent.change(fileInput, {
        target: { files: [invalidFile] },
      });
    });

    expect(mockToast).toHaveBeenCalled();
  });

  it('uses default banner when no banner is provided', () => {
    const groupWithoutBanner = { ...mockGroup, banner: undefined };
    const { container } = render(
      <UploadBannerGroup group={groupWithoutBanner} />,
    );

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      'http://localhost/_next/image?url=%2Fbanners%2Fprofile-banner.webp&w=3840&q=75',
    );
  });
});
