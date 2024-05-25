import {createContext, Dispatch} from 'react';

import initialState from './state';
import {IAction, IState} from './types';

export const Context = createContext<IState>(initialState);
export const DispatchContext = createContext<Dispatch<IAction>>(() => null);
