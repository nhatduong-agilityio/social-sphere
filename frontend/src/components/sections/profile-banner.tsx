'use client';

import { SyntheticEvent } from 'react';
import { Camera } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

// Components
import { Button } from '@/components/ui/button';

// Constants
import { IMAGES } from '@/constants/images';

interface BannerProps {
  imageUrl?: string | StaticImageData;
}

const Banner = ({ imageUrl = IMAGES.PROFILE_BANNER.url }: BannerProps) => {
  const handleErrorImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = IMAGES.PROFILE_BANNER_FALLBACK.url;
  };

  return (
    <div className="relative w-full h-56 md:h-80 group">
      <Image
        src={imageUrl}
        alt={IMAGES.PROFILE_BANNER.alt}
        fill
        quality={100}
        priority
        className="absolute inset-0 rounded-sm"
        sizes="(max-width: 768px) 100vw"
        style={{ objectFit: 'cover' }}
        onError={handleErrorImage}
      />
      <div className="absolute inset-0 z-10 bg-slate-700 bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 ease-in-out" />

      <div className="absolute z-20 top-0 left-0 m-4">
        <Button
          variant="rounded"
          size="sm"
          className="flex items-center justify-center bg-transparent group border-transparent group-hover:border group-hover:border-white text-white rounded-sm"
        >
          <Camera className="text-2xl" />
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            Edit cover image
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Banner;
