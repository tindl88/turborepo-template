import { User } from '@/modules/users/entities/user.entity';

import { Post } from '../entities/post.entity';

export class PostDeletedEvent {
  user: User;
  oldPosts: Post[];
  newPosts: Post[];
}
