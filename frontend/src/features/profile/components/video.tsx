'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Play } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';

// Utils
import { cn } from '@/utils/cn';

interface VideoProps {
  thumbnail: string;
  videoSrc: string;
  duration: string;
  alt: string;
}

const Video = ({ thumbnail, videoSrc, duration, alt }: VideoProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClickActive = () => setIsActive(!isActive);

  return (
    <div className="relative w-[184px] h-[138px] rounded-lg group">
      <Image
        src={thumbnail}
        alt={alt}
        fill
        quality={100}
        priority
        className="absolute inset-0 rounded-lg opacity-70"
        sizes="(max-width: 768px) 100vw"
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Link href={videoSrc}>
          <Button
            variant="primary"
            size="sm"
            className="w-[34px] h-[34px] rounded-full inset-0 flex items-center border-none dark:bg-blue-500 justify-center"
          >
            <Play className="text-white" size={20} />
          </Button>
        </Link>
      </div>
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

      <div className="absolute z-20 bottom-0 left-0 p-2">
        <p className="text-2xs text-white">{duration}</p>
      </div>
    </div>
  );
};

export default Video;
