import { render, screen } from '@testing-library/react';
import { SelectedOptionContent } from '../selected-option-content';
import { useForm, FormProvider } from 'react-hook-form';
import { ShareFormValues } from '@/features/home/hooks';
import { SHARE_OPTIONS } from '@/features/home/constants/share-news-feed';

// Mock child components
jest.mock('../../tag-friends', () => ({
  TagFriends: () => <div data-testid="tag-friends">Tag Friends Component</div>,
}));

jest.mock('../../group-picker', () => ({
  GroupPicker: () => (
    <div data-testid="group-picker">Group Picker Component</div>
  ),
}));

describe('SelectedOptionContent', () => {
  const TestWrapper = ({ selectedOption = SHARE_OPTIONS[0] }) => {
    const methods = useForm<ShareFormValues>();
    const mockProps = {
      authorId: '1',
      form: methods,
      selectedOption,
      onFriendsFeed: jest.fn(),
      onRemoveFriendsFeed: jest.fn(),
      onFriendsMessage: jest.fn(),
      onRemoveFriendsMessage: jest.fn(),
      onSelectGroup: jest.fn(),
      onRemoveGroup: jest.fn(),
      onRemove: jest.fn(),
    };

    return (
      <FormProvider {...methods}>
        <SelectedOptionContent {...mockProps} />
      </FormProvider>
    );
  };

  it('matches snapshot', () => {
    const { container } = render(<TestWrapper />);
    expect(container).toMatchSnapshot();
  });

  it('renders TagFriends for friends feed option', () => {
    render(<TestWrapper selectedOption={SHARE_OPTIONS[1]} />);
    expect(screen.getByTestId('tag-friends')).toBeInTheDocument();
  });

  it('renders GroupPicker for group option', () => {
    render(<TestWrapper selectedOption={SHARE_OPTIONS[2]} />);
    expect(screen.getByTestId('group-picker')).toBeInTheDocument();
  });

  it('renders nothing for default option', () => {
    const { container } = render(
      <TestWrapper selectedOption={SHARE_OPTIONS[0]} />,
    );
    expect(container.firstChild).toBeNull();
  });
});
