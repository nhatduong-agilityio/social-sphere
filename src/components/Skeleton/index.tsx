import { twMerge } from 'tailwind-merge';

// Types
import { CustomClassType } from '@/types/components';

export const Skeleton = ({
  customClass = 'h-2.5 w-48 mb-3',
}: CustomClassType) => (
  <div className="animate-pulse">
    <div
      className={twMerge(
        'bg-gray-200 rounded-lg dark:bg-gray-700',
        customClass,
      )}
    />
  </div>
);
