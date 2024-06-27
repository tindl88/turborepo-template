import React from 'react';
import { Button } from '~react-web-ui-shadcn/components/ui/button';

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
