import Link from 'next/link';
import { BrandIcon } from '@/icons/brand-icon';

export const BrandLink = () => (
  <Link
    href="/"
    aria-label="brand-link"
    data-testid="brand-link"
    className="w-fit outline-none"
  >
    <BrandIcon />
  </Link>
);
