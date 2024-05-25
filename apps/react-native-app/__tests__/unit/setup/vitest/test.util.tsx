import React, {FC, ReactElement, ReactNode} from 'react';
import {render, RenderOptions} from '@testing-library/react-native';

type AllTheProvidersProps = {
  children: ReactNode;
};

export const AllTheProviders: FC<AllTheProvidersProps> = ({children}) => {
  return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// eslint-disable-next-line import/export
export * from '@testing-library/react-native';

// eslint-disable-next-line import/export
export {customRender as render};
