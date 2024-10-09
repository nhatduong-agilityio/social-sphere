import { SVGAttributes } from 'react';
import { cn } from '@/utils/cn';

const BrandIcon = ({ className, ...props }: SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={38}
    viewBox="0 0 210.7 210.7"
    fill="none"
    className={cn('text-blue-600 dark:text-white', className)}
    {...props}
  >
    <path
      d="M77.7 119h16.8l81.9-102.1h-142v177L77.6 140v-21h.1zm0-56.8h62.4l-10.2 12.7H77.7V62.2z"
      fill="currentColor"
    />
  </svg>
);

export { BrandIcon };
