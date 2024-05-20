import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserCreatedEvent } from '../events/user-created.event';

@Injectable()
export class UserCreatedListener {
  constructor() {}

  @OnEvent('user.created')
  async handleUserCreatedEvent(_event: UserCreatedEvent) {}
}
