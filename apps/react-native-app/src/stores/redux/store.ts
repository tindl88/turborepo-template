import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  addListener,
  configureStore,
  createListenerMiddleware,
  ListenerEffectAPI,
  TypedAddListener,
  TypedStartListening
} from '@reduxjs/toolkit';

import appSlice from '@/modules/app/states/app.slice';
import authSlice from '@/modules/auth/states/auth.slice';
import screenSlice from '@/modules/screen/states/screen.slice';

import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [screenSlice.name]: screenSlice.reducer
});

const preloadedState = {};

const listenerMiddlewareInstance = createListenerMiddleware();

const store = configureStore({
  preloadedState,
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddlewareInstance.middleware).concat(sagaMiddleware),
  devTools: __DEV__
});

const sagasManager = sagaMiddleware.run(rootSaga);

export { sagasManager, store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// @see https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
export type AppDispatch = typeof store.dispatch;

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const startAppListening = listenerMiddlewareInstance.startListening as AppStartListening;
export const addAppListener = addListener as AppAddListener;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
