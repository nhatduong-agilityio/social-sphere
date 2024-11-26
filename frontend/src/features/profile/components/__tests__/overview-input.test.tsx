import { act, fireEvent, render } from '@testing-library/react';
import { OverviewInput } from '../overview-input';
import { MOCK_FRIENDS } from '@/__mocks__';
import { WorkIcon } from '@/icons';
import { UserModel } from '@/models';

describe('OverviewInput Component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <OverviewInput
        user={MOCK_FRIENDS[0]}
        nameField="firstName"
        icon={<WorkIcon className="rounded-full" />}
        nameLabel="FIRST NAME"
        placeholder="Enter your first name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly without user', () => {
    const { container } = render(
      <OverviewInput
        user={{} as UserModel}
        nameField="firstName"
        icon={<WorkIcon className="rounded-full" />}
        nameLabel="FIRST NAME"
        placeholder="Enter your first name"
      />,
    );

    expect(container).toBeInTheDocument();
  });

  it('handle submit input change', () => {
    const { getByPlaceholderText, getByTitle } = render(
      <OverviewInput
        user={MOCK_FRIENDS[0]}
        nameField="firstName"
        icon={<WorkIcon className="rounded-full" />}
        nameLabel="FIRST NAME"
        placeholder="Enter your first name"
      />,
    );

    const input = getByPlaceholderText('Enter your first name');
    const inputButton = getByTitle('input-button');

    expect(input).toBeInTheDocument();

    act(() => {
      fireEvent.change(input, { target: { value: 'John' } });
    });

    fireEvent.click(inputButton);

    expect(input).toHaveValue('John');
  });
});
