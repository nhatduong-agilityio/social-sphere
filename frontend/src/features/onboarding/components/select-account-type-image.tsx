import Image from 'next/image';
import { memo } from 'react';

interface SelectAccountTypeImageProps {
  mainSrc: string;
  subLightSrc: string;
  subDarkSrc: string;
  alt: string;
}

export const SelectAccountTypeImage = memo(
  ({ mainSrc, subLightSrc, subDarkSrc, alt }: SelectAccountTypeImageProps) => (
    <div className="relative m-auto w-[269px] h-[207px]">
      <Image
        src={mainSrc}
        alt={alt}
        className="absolute transform scale-125 hidden md:block z-10"
        sizes="(max-width: 768px) 100vw, 50vw"
        fill
        quality={100}
        priority
        style={{ objectFit: 'cover', top: '-15%', left: 0 }}
      />
      <Image
        src={subLightSrc}
        alt={`${alt}-light`}
        className="mt-[-5%] dark:hidden"
        sizes="(max-width: 768px) 100vw, 50vw"
        fill
        priority
        style={{ objectFit: 'cover' }}
      />
      <Image
        src={subDarkSrc}
        alt={`${alt}-dark`}
        className="mt-[-5%] hidden dark:block"
        sizes="(max-width: 768px) 100vw, 50vw"
        fill
        priority
        style={{ objectFit: 'cover' }}
      />
    </div>
  ),
);

SelectAccountTypeImage.displayName = 'SelectAccountTypeImage';
