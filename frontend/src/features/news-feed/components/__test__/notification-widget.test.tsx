import { render, screen } from '@testing-library/react';
import { NotificationWidget } from '../../../notification/components/notification-widget';
import { BellIcon } from 'lucide-react';

describe('NotificationWidget', () => {
  const mockProps = {
    title: 'Test Notification',
    description: 'Test Description',
    avatar: '/test-avatar.jpg',
    iconContent: <div>Icon Content</div>,
    iconHeader: <BellIcon />,
    notificationCount: 5,
    customClass: 'test-class',
    styleNotificationClass: 'notification-style',
  };

  it('matches snapshot', () => {
    const { container } = render(<NotificationWidget {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with all props', () => {
    render(<NotificationWidget {...mockProps} />);
    expect(screen.getByText('Test Notification')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('matches snapshot without notification count', () => {
    const { container } = render(
      <NotificationWidget {...mockProps} notificationCount={undefined} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with custom classes', () => {
    const { container } = render(
      <NotificationWidget
        {...mockProps}
        customClass="custom-class"
        styleNotificationClass="custom-notification"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders write message button', () => {
    render(<NotificationWidget {...mockProps} />);
    expect(screen.getByText('Write Message')).toBeInTheDocument();
  });
});
