import { render, screen, fireEvent } from '@testing-library/react';
import { ComposeTabContentDialog } from '../compose-tab-content-dialog';
import { Dialog } from '@/components/ui';
import { ReactNode } from 'react';

describe('ComposeTabContentDialog', () => {
  const renderDialog = (children: ReactNode) =>
    render(<Dialog defaultOpen>{children}</Dialog>);

  const mockTabContent = {
    title: 'Test Dialog',
    steps: [
      {
        image: '/test-image-1.jpg',
        title: 'Step 1',
        description: 'First step description',
      },
      {
        image: '/test-image-2.jpg',
        title: 'Step 2',
        description: 'Second step description',
      },
    ],
  };

  it('renders initial step content correctly', () => {
    renderDialog(<ComposeTabContentDialog tabContent={mockTabContent} />);

    expect(screen.getByText(mockTabContent.title)).toBeInTheDocument();
    expect(screen.getByText(mockTabContent.steps[0].title)).toBeInTheDocument();
    expect(
      screen.getByText(mockTabContent.steps[0].description),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('navigates to next step when clicking Next button', () => {
    renderDialog(<ComposeTabContentDialog tabContent={mockTabContent} />);

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByText(mockTabContent.steps[1].title)).toBeInTheDocument();
    expect(
      screen.getByText(mockTabContent.steps[1].description),
    ).toBeInTheDocument();
  });

  it('disables button and shows "got it" text on last step', () => {
    renderDialog(<ComposeTabContentDialog tabContent={mockTabContent} />);

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    const button = screen.getByRole('button', { name: 'got it' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
