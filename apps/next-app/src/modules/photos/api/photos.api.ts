import { PhotoEntity, PhotoFilter } from '../interfaces/photos.interface';

export async function getServerPhotos(filter: PhotoFilter) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?q=${filter.q}&_start=${1}&_end=${10}`, {
    next: { revalidate: 60 }
  });
  const json = await res.json();

  return json as PhotoEntity[];
}

const PhotoApi = {
  getServerPhotos
};

export default PhotoApi;
