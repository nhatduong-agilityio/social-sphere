import { cn } from '@/utils/cn';

interface StarIconProps {
  isActive?: boolean;
  customClass?: string;
}

export const StarIcon = ({
  isActive = true,
  customClass = 'w-[14px] h-[14px]',
}: StarIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn(customClass, { 'fill-blue-500 stroke-blue-500': isActive })}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
