import { FC } from 'react';

import { PhotoEntity } from '../interfaces/photos.interface';

interface IPhotoItemProps {
  item: PhotoEntity;
}

export const PhotoItem: FC<IPhotoItemProps> = ({ item }) => {
  return (
    <li>
      {item.id} - {item.title}
    </li>
  );
};
