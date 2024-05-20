import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export class UserUpdatedEvent {
  userDto: UpdateUserDto;
  user: User;
}
