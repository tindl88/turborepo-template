import { ResponseFormat } from '@/interfaces/api-response.interface';

export type TravelPlaceEntity = {
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

export type PostsResponse = ResponseFormat<TravelPlaceEntity[]>;
export type PostResponse = ResponseFormat<TravelPlaceEntity>;
