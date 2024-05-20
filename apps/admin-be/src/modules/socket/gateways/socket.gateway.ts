import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { WebsocketGuard } from '../../auth/guards/websocket.guard';
import { User } from '../../users/entities/user.entity';
import { ICustomSocket } from '../interfaces/socket.interface';

@WebSocketGateway({
  cors: {
    credentials: true,
    origin: ['*']
  }
})
export class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(_server: Server) {}

  handleConnection(_client: ICustomSocket) {}

  handleDisconnect(_client: ICustomSocket) {
    this.server.emit('USERS_CHANGED', { user: 'client.user.email', event: 'left' });
  }

  @UseGuards(WebsocketGuard)
  @SubscribeMessage('JOIN_GAME_ROOM')
  async joinRoom(client: ICustomSocket, payload: { user: User; roomId: string }) {
    client.join(payload.roomId);
    client.broadcast.to(payload.roomId).emit('USERS_CHANGED', { user: 'client.user.email', event: 'joined' });
  }

  @UseGuards(WebsocketGuard)
  @SubscribeMessage('LEAVE_GAME_ROOM')
  async leaveChatRoom(client: ICustomSocket, payload: { user: User; roomId: string }) {
    client.broadcast.to(payload.roomId).emit('USERS_CHANGED', { user: 'client.user.email', event: 'left' });
    client.leave(payload.roomId);
  }
}
