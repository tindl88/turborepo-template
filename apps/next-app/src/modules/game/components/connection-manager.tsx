import React from 'react';
import { Button } from '~ui/components/ui/button';

import { socket } from '../utils/socket.util';

const ConnectionManager = () => {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <>
      <Button onClick={connect}>Connect</Button>
      <Button onClick={disconnect}>Disconnect</Button>
    </>
  );
};

export default ConnectionManager;
