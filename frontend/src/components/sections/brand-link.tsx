import { memo } from 'react';
import Link from 'next/link';

// Components
import { BrandIcon } from '@/icons/brand-icon';

interface BrandLinkProps {
  size?: number;
}

export const BrandLink = memo(({ size = 38 }: BrandLinkProps) => (
  <Link
    href="/"
    aria-label="brand-link"
    data-testid="brand-link"
    className="w-fit outline-none"
  >
    <BrandIcon width={size} height={size} />
  </Link>
));

BrandLink.displayName = 'BrandLink';
