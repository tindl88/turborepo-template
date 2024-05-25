import React, {FC, ReactNode} from 'react';
import {useImmerReducer} from 'use-immer';

import {Context, DispatchContext} from './context';
import reducer from './reducer';
import initialState from './state';

interface ITabProviderProps {
  children: ReactNode;
}

const TabProvider: FC<ITabProviderProps> = ({children}) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </Context.Provider>
  );
};

export default TabProvider;
