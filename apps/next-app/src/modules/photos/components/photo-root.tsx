'use client';

import { FC } from 'react';
import Pagination from '~react-web-ui-shadcn/components/ui/pagination-custom';

import { PhotoEntity } from '../interfaces/photos.interface';

import { usePhotos } from '../hooks/use-photos';

import PhotoFilter from './photo-filter';
import { PhotoList } from './photo-list';

interface IPhotoRootProps {
  items?: PhotoEntity[];
}

export const PhotoRoot: FC<IPhotoRootProps> = ({ items = [] }) => {
  const { data, totalCount, filter, setFilter } = usePhotos({ initialData: items });

  return (
    <section>
      <PhotoFilter value={filter.q} onTextChange={event => setFilter({ ...filter, q: event.target.value })} />
      <PhotoList items={data} />
      <Pagination
        totalItems={totalCount}
        currentPage={filter.page}
        itemPerPage={filter.limit}
        onChange={page => setFilter({ ...filter, page })}
      />
    </section>
  );
};
