import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SocketGateway } from './gateways/socket.gateway';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [SocketGateway, JwtService]
})
export class SocketModule {}
