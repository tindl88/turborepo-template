import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
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

import { categoriesData } from '@/modules/categories/states/categories.data';
import categorySlice from '@/modules/categories/states/categories.slice';
import { filesData } from '@/modules/files/states/files.data';
import fileSlice from '@/modules/files/states/files.slice';
import { postsData } from '@/modules/posts/states/posts.data';
import postSlice from '@/modules/posts/states/posts.slice';
import { productsData } from '@/modules/products/states/products.data';
import productSlice from '@/modules/products/states/products.slice';
import { usersData } from '@/modules/users/states/users.data';
import userSlice from '@/modules/users/states/users.slice';

import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [fileSlice.name]: fileSlice.reducer,
  [categorySlice.name]: categorySlice.reducer,
  [postSlice.name]: postSlice.reducer,
  [productSlice.name]: productSlice.reducer
});

const preloadedState = {
  [userSlice.name]: usersData,
  [fileSlice.name]: filesData,
  [categorySlice.name]: categoriesData,
  [postSlice.name]: postsData,
  [productSlice.name]: productsData
};
const listenerMiddlewareInstance = createListenerMiddleware();

const store = configureStore({
  preloadedState,
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddlewareInstance.middleware).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV === 'development'
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
