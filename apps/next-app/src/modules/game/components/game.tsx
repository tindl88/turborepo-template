'use client';

import { Suspense, useEffect, useState } from 'react';
import { Button } from '~react-web-ui-shadcn/components/ui/button';

import { socket } from '../utils/socket.util';

import ConnectionManager from './connection-manager';
import ConnectionState from './connection-state';

export default function Game() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    setIsHydrated(true);

    function onConnect() {
      setIsConnected(socket.connected);
    }

    function onDisconnect() {
      setIsConnected(socket.connected);
    }

    function onEvents(_data: unknown) {}

    function onConnectError(_data: unknown) {}

    function onException(_data: unknown) {}

    socket.on('connect', onConnect);
    socket.on('connect_error', onConnectError);
    socket.on('disconnect', onDisconnect);
    socket.on('events', onEvents);
    socket.on('exception', onException);

    return () => {
      socket.off('connect', onConnect);
      socket.off('connect_error', onConnectError);
      socket.off('disconnect', onDisconnect);
      socket.off('events', onEvents);
      socket.off('exception', onException);

      socket.disconnect();
    };
  }, []);

  if (!isHydrated) return null;

  return (
    <div className="grow">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container">
          <ConnectionManager />
          <ConnectionState isConnected={isConnected} />
          <div className="flex space-x-3">
            <Button onClick={() => socket.emit('CREATE_GAME_ROOM', { data: 'privateRoom' })}>Create Room</Button>
            <Button onClick={() => socket.emit('JOIN_GAME_ROOM', { data: 'privateRoom' })}>Join Room</Button>
            <Button onClick={() => socket.emit('LEAVE_GAME_ROOM', { data: 'privateRoom' })}>Leave</Button>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
