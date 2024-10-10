import { memo } from 'react';

// Components
import { BrandLink } from '../sections/brand-link';

// Utils
import { cn } from '@/utils/cn';

// Icons
import { Button } from '../ui/button';
import {
  BellIcon,
  GripIcon,
  HeartIcon,
  MailIcon,
  MenuIcon,
  MessageSquareIcon,
  SearchIcon,
} from 'lucide-react';

const NAVIGATION_ITEMS = [
  {
    title: 'Friend Requests',
    icon: <HeartIcon size={18} />,
    styles: 'hover:bg-red-600 hover:shadow-sphere-destructive',
  },
  {
    title: 'Notifications',
    icon: <BellIcon size={18} />,
    styles: 'hover:bg-blue-50',
  },
  {
    title: 'Messages',
    icon: <MailIcon size={18} />,
    styles: 'hover:bg-blue-50',
  },
  {
    title: 'Chat',
    icon: <MessageSquareIcon size={18} />,
    styles: 'hover:bg-blue-600 hover:shadow-sphere-secondary hidden lg:flex',
  },
  {
    title: 'Applications',
    icon: <GripIcon size={18} />,
    styles: 'hover:bg-blue-600 hover:shadow-sphere-secondary',
  },
  {
    title: 'Search',
    icon: <SearchIcon size={18} />,
    styles: 'hover:bg-blue-600 hover:shadow-sphere-secondary flex lg:hidden',
  },
];

interface HeaderProps {
  isAuthenticated?: boolean;
}

export const Header = memo(({ isAuthenticated = true }: HeaderProps) => (
  <header
    className={cn(
      'sticky top-0 border bg-background dark:border-dark-950 dark:bg-dark-950 z-50',
      isAuthenticated ? 'h-[58px] dark:bg-dark-100 pl-3 lg:pr-3' : 'h-[55px]',
    )}
  >
    {isAuthenticated ? (
      <nav className="w-full h-full flex justify-between items-center">
        <div className="flex gap-5 lg:gap-8 md:flex-1 lg:flex">
          <div className="animate-heartbeat">
            <BrandLink size={38} />
          </div>
          <div className="flex gap-3 md:flex-1 md:justify-center lg:justify-start">
            {NAVIGATION_ITEMS.map(({ title, styles, icon }) => (
              <Button
                className={cn(
                  'w-[38px] h-[38px] p-0 border-none radius-md bg-transparent text-icon',
                  styles,
                )}
                key={title}
              >
                {icon}
              </Button>
            ))}
          </div>
        </div>
        <Button variant="unstyle" className="w-[58px] h-full lg:hidden">
          <MenuIcon size={18} />
        </Button>
      </nav>
    ) : (
      <div className="w-full flex justify-center">
        <BrandLink size={48} />
      </div>
    )}
  </header>
));
Header.displayName = 'Header';
