import { ResponseFormat } from '@/interfaces/api-response.interface';
import { BaseFilter } from '@/interfaces/filter.interface';

export type PhotoEntity = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export type PhotosResponse = ResponseFormat<PhotoEntity[]>;
export type PhotoResponse = ResponseFormat<PhotoEntity>;

export type PhotoFilter = BaseFilter;
