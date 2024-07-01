'use client';

import React, { FC, ReactNode } from 'react';

import { mediaStyles } from '@/components/media';

type HeadProps = {
  children?: ReactNode;
};

const Head: FC<HeadProps> = ({ children }) => {
  return (
    // eslint-disable-next-line @next/next/no-head-element
    <head>
      {children}
      <meta httpEquiv="cleartype" content="on" />
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <style type="text/css" dangerouslySetInnerHTML={{ __html: mediaStyles }} />
    </head>
  );
};

export default Head;
