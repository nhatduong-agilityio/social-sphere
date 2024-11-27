import { render, fireEvent, act } from '@testing-library/react';
import { UploadAvatarGroup } from '../upload-avatar-group';
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

describe('UploadAvatarGroup', () => {
  const mockGroup = {
    id: 1,
    documentId: 'group-1',
    name: 'Test Group',
    avatar: 'test-avatar.jpg',
    author: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    },
  } as GroupDetail;

  beforeEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
    mockUpload.mockResolvedValue('uploaded-url');
  });

  it('matches snapshot', () => {
    const { container } = render(<UploadAvatarGroup group={mockGroup} />);
    expect(container).toMatchSnapshot();
  });

  it('handles file upload successfully', async () => {
    const { getByTestId } = render(<UploadAvatarGroup group={mockGroup} />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = getByTestId('input-element');

    await act(async () => {
      fireEvent.change(fileInput, {
        target: { files: [file] },
      });
    });

    expect(mockUpload).toHaveBeenCalledWith(file);
    expect(mockUpdateGroup).toHaveBeenCalledWith('group-1', {
      avatar: 'uploaded-url',
    });
  });

  it('handles file validation error', async () => {
    const { getByTestId } = render(<UploadAvatarGroup group={mockGroup} />);

    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const fileInput = getByTestId('input-element');

    // Mock form validation error
    jest.mock('@hookform/resolvers/zod', () => ({
      zodResolver: () => ({
        validate: () => ({ success: false }),
      }),
    }));

    await act(async () => {
      fireEvent.change(fileInput, {
        target: { files: [invalidFile] },
      });
    });

    expect(mockToast).toHaveBeenCalled();
  });

  it('toggles popup buttons on click', () => {
    const { getAllByRole } = render(<UploadAvatarGroup group={mockGroup} />);

    const toggleButton = getAllByRole('button');
    fireEvent.click(toggleButton[0]);

    const buttonIcon = toggleButton[0].querySelector('svg');
    expect(buttonIcon).toHaveClass('transform', 'rotate-[135deg]');
  });
});
