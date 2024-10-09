import { memo } from 'react';
import Link from 'next/link';

// Constants
import { ROUTER } from '@/constants/router';

// Components
import {
  LinkWithIcon,
  type LinkWithIconProps,
} from '@/components/ui/link-with-icon';
import { BrandLink } from '../sections/brand-link';

// Utils
import { cn } from '@/utils/cn';

// Icons
import { CubeIcon } from '@/icons/cube-icon';
import { BugAntIcon } from '@/icons/bug-ant-icon';
import { UserIcon } from '@/icons/user-icon';
import { BoltIcon } from '@/icons/bolt-icon';

const NAVIGATION_ITEMS: LinkWithIconProps[] = [
  {
    url: ROUTER.CATEGORY,
    text: 'Category',
    title: 'Category Listing',
    icon: <CubeIcon customClass="w-4 h-4 mr-2" />,
  },
  {
    url: `${ROUTER.CATEGORY}?showError=true`,
    text: 'Error Page',
    title: 'Demo Error Page',
    icon: <BugAntIcon customClass="w-4 h-4 mr-2" />,
  },
  {
    url: ROUTER.LOGIN,
    text: 'Login',
    title: 'Login',
    icon: <UserIcon customClass="w-4 h-4 mr-2" />,
  },
];

interface HeaderProps {
  isAuthenticated?: boolean;
}

export const Header = memo(({ isAuthenticated = true }: HeaderProps) => (
  <header
    className={cn(
      'sticky top-0 border bg-background dark:border-dark-950 dark:bg-dark-950 z-50',
      isAuthenticated ? 'h-[58px]' : 'h-[55px]',
    )}
  >
    {isAuthenticated ? (
      <nav className="container mx-auto h-full flex justify-between items-center">
        <div>
          <Link href="/" title="Homepage">
            <BoltIcon customClass="text-blue-600 w-8 h-8" />
          </Link>
        </div>
        <div className="flex gap-2">
          {NAVIGATION_ITEMS.map(({ url, text, title, icon }) => (
            <LinkWithIcon
              key={url}
              url={url}
              text={text}
              title={title}
              icon={icon}
            />
          ))}
        </div>
      </nav>
    ) : (
      <div className="w-full flex justify-center">
        <BrandLink size={48} />
      </div>
    )}
  </header>
));
Header.displayName = 'Header';
