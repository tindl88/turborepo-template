import { ResponseFormat } from '@/interfaces/api-response.interface';

export type TourEntity = {
  id: string;
  name: string;
  location: string;
  isFavorited: boolean;
  price: number;
  description: string;
  rating: string;
  image: string;
  images: string[];
};

export type PostsResponse = ResponseFormat<TourEntity[]>;
export type PostResponse = ResponseFormat<TourEntity>;
