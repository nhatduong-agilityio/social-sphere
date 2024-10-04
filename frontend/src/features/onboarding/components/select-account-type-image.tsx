import Image from 'next/image';
import { memo } from 'react';

interface SelectAccountTypeImageProps {
  mainSrc: string;
  subLightSrc: string;
  subDarkSrc: string;
  alt: string;
}

export const SelectAccountTypeImage = memo(
  ({ mainSrc, subLightSrc, subDarkSrc, alt }: SelectAccountTypeImageProps) => {
    const imageStyle = {
      maxWidth: '100%',
      height: 'auto',
    };

    return (
      <div className="relative">
        <Image
          src={mainSrc}
          alt={alt}
          className="absolute top-[15%] left-0 transform scale-125"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          style={imageStyle}
        />
        <Image
          src={subLightSrc}
          alt={`${alt}-light`}
          className="mt-[-5%] dark:hidden"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={imageStyle}
        />
        <Image
          src={subDarkSrc}
          alt={`${alt}-dark`}
          className="mt-[-5%] hidden dark:block"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={imageStyle}
        />
      </div>
    );
  },
);

SelectAccountTypeImage.displayName = 'SelectAccountTypeImage';
