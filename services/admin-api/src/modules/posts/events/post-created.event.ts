import { User } from '@/modules/users/entities/user.entity';

import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '../entities/post.entity';

export class PostCreatedEvent {
  user: User;
  post: Post;
  postDto: CreatePostDto;
}
