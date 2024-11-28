import { render, fireEvent } from '@testing-library/react';
import { MoodActivityPicker } from '../mood-activity-picker';
import { MOODS } from '../../constants';

jest.mock('@/hooks', () => ({
  useFocusState: jest.fn(() => ({
    isFocused: true,
    onFocus: jest.fn(),
    onBlur: jest.fn(),
  })),
  useDebounce: (value: string) => value,
  useOnClickOutside: jest.fn(),
}));

describe('MoodActivityPicker', () => {
  const mockProps = {
    defaultMood: { title: MOODS.DRINKING, content: 'water' },
    onSelectMood: jest.fn(),
    onCloseMoodActivityPicker: jest.fn(),
    onRemoveMood: jest.fn(),
  };

  it('matches snapshot', () => {
    const { container } = render(<MoodActivityPicker {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('handle click mood item', () => {
    const { container, getAllByTestId } = render(
      <MoodActivityPicker {...mockProps} />,
    );

    const moodItem = getAllByTestId('mood-item');
    fireEvent.click(moodItem[0]);

    expect(container).toMatchSnapshot();
  });
});
