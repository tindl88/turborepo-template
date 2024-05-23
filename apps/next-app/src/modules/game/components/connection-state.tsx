import React, { FC } from 'react';

interface IConnectionStateProps {
  isConnected: boolean;
}

const ConnectionState: FC<IConnectionStateProps> = ({ isConnected }) => {
  return <p>State: {'' + isConnected}</p>;
};

export default ConnectionState;
