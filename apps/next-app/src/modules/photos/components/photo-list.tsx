import { FC } from 'react';

import { PhotoEntity } from '../interfaces/photos.interface';

import { PhotoItem } from './photo-item';

interface IPhotoListProps {
  items?: PhotoEntity[];
}

export const PhotoList: FC<IPhotoListProps> = ({ items = [], ...rest }) => {
  if (items.length === 0) return null;

  return (
    <ol data-testid="photos-list" {...rest}>
      {items.map((item, index) => (
        <PhotoItem key={index} item={item} />
      ))}
    </ol>
  );
};
