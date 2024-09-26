import Link from 'next/link';

// Constants
import { ROUTER } from '@/constants/router';

// Components
import {
  LinkWithIcon,
  type LinkWithIconProps,
} from '@/components/LinkWithIcon';

// Icons
import { BoltIcon, CubeIcon, BugAntIcon, UserIcon } from '@/icons';

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

const Header = () => (
  <header className="sticky top-0 h-12 border-b bg-white">
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
  </header>
);

export default Header;
