import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';

export type LinkWithIconProps = {
  url: string;
  text: string;
  title?: string;
  icon?: ReactNode;
  additionalClass?: string;
};

export const LinkWithIcon = ({
  url,
  text,
  title,
  icon,
  additionalClass = 'rounded-lg border px-2 py-1',
}: LinkWithIconProps) => (
  <Link
    href={url}
    title={title || text}
    className={twMerge('flex items-center hover:bg-slate-50', additionalClass)}
  >
    {icon}
    {text}
  </Link>
);
