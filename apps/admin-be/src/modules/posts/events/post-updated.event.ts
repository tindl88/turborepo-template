import { User } from '@/modules/users/entities/user.entity';

import { UpdatePostDto } from '../dto/update-post.dto';
import { Post } from '../entities/post.entity';

export class PostUpdatedEvent {
  user: User;
  oldPost: Post;
  newPost: Post;
  postDto: UpdatePostDto;
}
