import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicLayout from '../../../layouts/public.layout';

const PublicRoute: React.FC = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default PublicRoute;
