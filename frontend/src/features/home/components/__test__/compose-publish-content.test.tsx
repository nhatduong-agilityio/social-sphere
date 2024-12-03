import { render } from '@testing-library/react';
import { ComposePublishContent } from '../compose-publish-content';

jest.mock('../../actions', () => ({
  publishNewsFeed: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  toast: jest.fn(),
  useDisclosure: () => ({
    isOpen: false,
    onOpen: jest.fn(),
    onClose: jest.fn(),
  }),
  useFocusState: jest.fn(() => ({
    isFocused: true,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  })),
  useComposeDisclosure: jest.fn(() => ({
    gifPicker: {
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    },
    tagFriends: {
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    },
    moods: {
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    },
    shareLink: {
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    },
    location: {
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    },
  })),
}));

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormState: () => [{ message: null, error: null }, jest.fn()],
}));

// Add mocks
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
}));

// Mock child components
jest.mock('../compose-form-content', () => ({
  ComposeFormContent: () => <div data-testid="mock-form-content" />,
}));

jest.mock('../compose-media-preview', () => ({
  ComposeMediaPreview: () => <div data-testid="mock-media-preview" />,
}));

jest.mock('../compose-options', () => ({
  ComposeOptions: () => <div data-testid="mock-compose-options" />,
}));

jest.mock('../compose-select-access', () => ({
  ComposeSelectAccess: () => <div data-testid="mock-select-access" />,
}));

jest.mock('../compose-gif-preview', () => ({
  ComposeGifPreview: () => <div data-testid="mock-gif-preview" />,
}));

jest.mock('../gif-picker', () => ({
  GifPicker: () => <div data-testid="mock-gif-picker" />,
}));

jest.mock('../tag-friends', () => ({
  TagFriends: () => <div data-testid="mock-tag-friends" />,
}));

jest.mock('../compose-activity-preview', () => ({
  ComposeActivityPreview: () => <div data-testid="mock-activity-preview" />,
}));

describe('ComposePublishContent', () => {
  const mockProps = {
    isOverlayOpen: false,
    onOpenOverlay: jest.fn(),
    onUpdateNewsFeedIds: jest.fn(),
  };

  it('matches snapshot', () => {
    const { container } = render(<ComposePublishContent {...mockProps} />);

    expect(container).toMatchSnapshot();
  });
});
