import React from 'react';

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="sidebar">Left sidebar</div>
      <div className="content">{children}</div>
    </div>
  );
};

export default AuthenticatedLayout;
