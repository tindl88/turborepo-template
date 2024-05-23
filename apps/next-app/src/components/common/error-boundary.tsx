'use client';

import { FC, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import ErrorInformation from './error-information';

type ErrorFallbackProps = {
  error: Error;
};

const ErrorFallback: FC<ErrorFallbackProps> = ({ error }) => {
  return <ErrorInformation code={undefined} title={error.name} message={error.message} />;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>;
};

export default ErrorBoundary;
