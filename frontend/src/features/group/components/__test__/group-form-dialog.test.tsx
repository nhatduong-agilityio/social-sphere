import { ReactNode } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { GroupFormDialog } from '../group-form-dialog';
import { Dialog } from '@/components/ui';

describe('GroupFormDialog', () => {
  const mockOnCreate = jest.fn();
  const defaultProps = {
    isLoading: false,
    onCreate: mockOnCreate,
    initialValues: {
      name: 'Test Group',
      description: 'Test Description',
      avatar: 'test-avatar.jpg',
    },
  };

  const renderDialog = (children: ReactNode) =>
    render(<Dialog defaultOpen>{children}</Dialog>);

  it('matches snapshot', () => {
    const { container } = renderDialog(<GroupFormDialog {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when loading', () => {
    const { container } = renderDialog(
      <GroupFormDialog {...defaultProps} isLoading={true} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot without initial values', () => {
    const { container } = renderDialog(
      <GroupFormDialog onCreate={mockOnCreate} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('handles file upload button click correctly', () => {
    // Render without initial avatar to show upload button
    const { getByTestId } = renderDialog(
      <GroupFormDialog onCreate={mockOnCreate} />,
    );

    const uploadButton = getByTestId('upload-button');
    const fileInput = getByTestId('file-input');

    fireEvent.click(uploadButton);
    expect(fileInput).toHaveValue('');
  });
});
