'use client';
import Image from 'next/image';

// Components
import { Card, CardTitle } from '@/components/ui/card';
import Rating from '@/features/profile/components/rating';

interface PlaceProps {
  title: string;
  src: string;
  alt: string;
}

const LocationCard = ({ title, src, alt }: PlaceProps) => (
  <Card className="rounded-lg flex flex-col items-start dark:bg-dark-300 relative w-[248px] h-[235px]0 p-3">
    <div className="relative  w-[223px] h-[167px]">
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
    <Rating initialRating={4} />
  </Card>
);

export default LocationCard;
