'use client';
import Image from 'next/image';

// Components
import { Card, CardTitle } from '@/components/ui/card';
import Rating from '@/features/profile/components/rating';

interface PlaceProps {
  title: string;
  src: string;
  alt: string;
  rating: number;
}

const LocationCard = ({ title, src, alt, rating }: PlaceProps) => (
  <Card className="rounded-lg flex flex-col items-start dark:bg-dark-300 relative w-60 h-[235px] p-3">
    <div className="relative w-[215px] h-[167px]">
      <Image
        src={src}
        alt={alt}
        fill
        quality={100}
        priority
        className="absolute inset-0 rounded-sm"
        sizes="(max-width: 768px) 100vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
    <CardTitle className="text-sm mt-1">{title}</CardTitle>
    <Rating initialRating={rating} />
  </Card>
);

export default LocationCard;
