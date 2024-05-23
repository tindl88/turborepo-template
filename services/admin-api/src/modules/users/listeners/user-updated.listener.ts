import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserUpdatedEvent } from '../events/user-updated.event';

@Injectable()
export class UserUpdatedListener {
  constructor() {}

  @OnEvent('user.updated')
  async handleUserUpdatedEvent(_event: UserUpdatedEvent) {}
}
