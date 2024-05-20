import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export class UserCreatedEvent {
  userDto: CreateUserDto;
  user: User;
}
