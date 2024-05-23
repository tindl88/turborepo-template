import { Metadata } from 'next';

import { PageBaseProps } from '@/interfaces/page.interface';

import { getServerPhotos } from '@/modules/photos/api/photos.api';
import { PhotoRoot } from '@/modules/photos/components/photo-root';

export default async function PhotoPage({ searchParams }: PageBaseProps) {
  const photos = await getServerPhotos(searchParams);

  return (
    <div className="grow">
      <PhotoRoot items={photos} />
    </div>
  );
}

export async function generateMetadata(_pageProps: PageBaseProps): Promise<Metadata> {
  return {
    title: 'Photos',
    description: 'Photos Description'
  };
}
