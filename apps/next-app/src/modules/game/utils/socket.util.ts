import { getSession } from 'next-auth/react';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3500', {
  autoConnect: false,
  withCredentials: true,
  auth: async cb => {
    const session = await getSession();

    cb({ token: session?.user.accessToken });
  }
});
