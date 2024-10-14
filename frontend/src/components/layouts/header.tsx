'use client';

import { memo, useCallback, useMemo } from 'react';

// Components
import { BrandLink } from '../sections/brand-link';
import { Button } from '../ui/button';
import { SearchInput } from '../ui/search-input';

// Utils
import { cn } from '@/utils/cn';

// Icons
import {
  BellIcon,
  GripIcon,
  HeartIcon,
  MailIcon,
  MenuIcon,
  MessageSquareIcon,
  SearchIcon,
  ShoppingCartIcon,
} from 'lucide-react';

// Hooks
import { useDisclosure } from '@/hooks/use-disclosure';
import { CircleOverlay } from '../sections/circle-overlay';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PopoverContainer } from '../ui/popover';
import { Text } from '../ui/text';
import { SwitchTheme } from '../sections/switch-theme';

interface HeaderProps {
  isAuthenticated?: boolean;
}

export const Header = memo(({ isAuthenticated = true }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NAVIGATION_ITEMS = useMemo(
    () => [
      {
        title: 'Friend Requests',
        icon: <HeartIcon size={18} className="hover:animate-heartbeat" />,
        styles: 'hover:nav-item-destructive',
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
        styles: 'hover:nav-item-secondary hidden lg:flex',
      },
      {
        title: 'Applications',
        icon: <GripIcon size={18} />,
        styles: 'hover:nav-item-secondary',
      },
      {
        title: 'Search',
        icon: <SearchIcon size={18} />,
        styles: 'hover:nav-item-secondary flex lg:hidden',
      },
    ],
    [],
  );

  const handleButtonClick = useCallback(
    (title: string) => {
      switch (title) {
        case 'Search':
          onOpen();
          break;
        case 'Friend Requests':
          // Handle friend requests
          break;
        case 'Notifications':
          // Handle notifications
          break;
        case 'Messages':
          // Handle messages
          break;
        case 'Chat':
          // Handle chat
          break;
        case 'Applications':
          // Handle applications
          break;
        default:
        // Handle default case or do nothing
      }
    },
    [onOpen],
  );

  const renderAuthenticatedHeader = useCallback(
    () => (
      <>
        <div
          className={cn(
            'w-full h-full justify-center pr-3 hidden',
            isOpen && 'flex lg:hidden',
          )}
        >
          <SearchInput onClose={onClose} />
        </div>
        <nav
          className={cn(
            'w-full h-full flex justify-between items-center',
            isOpen && 'hidden lg:flex',
          )}
        >
          <div className="flex gap-5 lg:gap-8 md:flex-1 lg:flex">
            <div className="animate-heartbeat">
              <BrandLink size={38} />
            </div>
            <div className="flex gap-3 md:flex-1 md:justify-center lg:justify-start">
              {NAVIGATION_ITEMS.map(({ title, styles, icon }) => (
                <Button
                  key={title}
                  className={cn(
                    'w-[38px] h-[38px] p-0 border-none radius-md bg-transparent text-icon dark:hover:text-white',
                    styles,
                  )}
                  onClick={() => handleButtonClick(title)}
                >
                  {icon}
                </Button>
              ))}
            </div>
          </div>
          <div className="w-full justify-end items-center gap-6 hidden lg:flex">
            <div className="w-full max-w-[320px] flex">
              <SearchInput variant="primary" />
            </div>
            <CircleOverlay
              circleSize="tiny"
              circleClassName="border-0 w-2 h-2 top-0.5 right-0.5 bg-blue-600"
            >
              <Button
                variant="unstyle"
                className="w-9 p-0 h-full hover:bg-transparent"
              >
                <ShoppingCartIcon size={18} />
              </Button>
            </CircleOverlay>
            <PopoverContainer
              trigger={
                <CircleOverlay circleSize="tiny">
                  <Avatar className="w-full h-full">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </CircleOverlay>
              }
              content={
                <div className="grid gap-4">
                  <div className="flex justify-between items-center p-4">
                    <Text variant="primary">Jenna Davis</Text>
                    <SwitchTheme />
                  </div>
                </div>
              }
              contentClassName="p-0"
            />
          </div>
          <Button variant="unstyle" className="w-[58px] h-full lg:hidden">
            <MenuIcon size={18} />
          </Button>
        </nav>
      </>
    ),
    [NAVIGATION_ITEMS, isOpen, onClose, handleButtonClick],
  );

  return (
    <header
      className={cn(
        'sticky top-0 border bg-background dark:border-dark-950 dark:bg-dark-950 z-50',
        isAuthenticated ? 'h-[58px] dark:bg-dark-100 pl-3 lg:pr-3' : 'h-[55px]',
      )}
    >
      {isAuthenticated ? (
        renderAuthenticatedHeader()
      ) : (
        <div className="w-full flex justify-center">
          <BrandLink size={48} />
        </div>
      )}
    </header>
  );
});
Header.displayName = 'Header';
