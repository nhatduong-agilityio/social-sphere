'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface PhotoProps {
  src: string;
  alt: string;
}

const Photo = ({ src, alt }: PhotoProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClickActive = () => setIsActive(!isActive);

  return (
    <div className="relative w-36 h-36 group">
      <Image
        src={src}
        alt={alt}
        fill
        quality={100}
        priority
        className="absolute inset-0 rounded-lg"
        sizes="(max-width: 768px) 100vw"
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute inset-0 z-10 bg-slate-700 bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out" />

      <div className="absolute z-20 bottom-0 right-0 m-2 opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
        <Button
          variant="primary"
          size="sm"
          className={cn(
            'flex w-9 h-9 rounded-full dark:bg-dark-100 bg-white items-center justify-center border-none',
            {
              'dark:bg-red-600 bg-red-600': isActive,
            },
          )}
          onClick={handleClickActive}
        >
          <Heart size={24} className="text-dark-100 dark:text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Photo;
