import PublicLayout from '@/layouts/public.layout';
import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicRoute: React.FC = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default PublicRoute;
