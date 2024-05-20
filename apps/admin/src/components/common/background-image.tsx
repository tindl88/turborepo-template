import React, { FC } from 'react';
import Image, { StaticImageData } from 'next/image';

type BackgroundImageProps = {
  src: StaticImageData;
  alt?: string;
};

const BackgroundImage: FC<BackgroundImageProps> = ({ src, alt }) => {
  return (
    <div className="-z-1 absolute left-0 top-0 h-full w-full">
      <Image fill className="h-full w-full object-cover object-center" src={src} alt={alt || ''} />
    </div>
  );
};

export default BackgroundImage;
