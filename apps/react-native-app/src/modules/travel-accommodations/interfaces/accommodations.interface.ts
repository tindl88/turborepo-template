import { ResponseFormat } from '@/interfaces/api-response.interface';

export type AccommodationEntity = {
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

export type PostsResponse = ResponseFormat<AccommodationEntity[]>;
export type PostResponse = ResponseFormat<AccommodationEntity>;
