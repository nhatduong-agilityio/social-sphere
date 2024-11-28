import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { ComposeTabHeader } from '../compose-tab-header';
import { COMPOSE_TAB_TITLES, ComposeTabValue } from '../../constants';
import { Tabs } from '@/components/ui';

describe('ComposeTabHeader', () => {
  const defaultProps = {
    isOverlayOpen: false,
    onCloseOverlay: jest.fn(),
  };

  const renderTabs = (children: ReactNode) => render(<Tabs>{children}</Tabs>);

  it('renders all tab triggers correctly', () => {
    renderTabs(<ComposeTabHeader {...defaultProps} />);

    expect(
      screen.getByText(COMPOSE_TAB_TITLES[ComposeTabValue.Publish]),
    ).toBeInTheDocument();
    expect(
      screen.getByText(COMPOSE_TAB_TITLES[ComposeTabValue.Albums]),
    ).toBeInTheDocument();
    expect(
      screen.getByText(COMPOSE_TAB_TITLES[ComposeTabValue.Video]),
    ).toBeInTheDocument();
  });
});
