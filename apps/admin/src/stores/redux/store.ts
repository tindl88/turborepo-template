import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore, ListenerEffectAPI, TypedAddListener, TypedStartListening } from '@reduxjs/toolkit';

// import { categoriesData } from '@/modules/categories/states/categories.data';
import categorySlice from '@/modules/categories/states/categories.slice';
// import { filesData } from '@/modules/files/states/files.data';
import fileSlice from '@/modules/files/states/files.slice';
// import { postsData } from '@/modules/posts/states/posts.data';
import postSlice from '@/modules/posts/states/posts.slice';
// import { productsData } from '@/modules/products/states/products.data';
import productSlice from '@/modules/products/states/products.slice';
// import { usersData } from '@/modules/users/states/users.data';
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

// const preloadedState = {
//   [userSlice.name]: usersData,
//   [fileSlice.name]: filesData,
//   [categorySlice.name]: categoriesData,
//   [postSlice.name]: postsData,
//   [productSlice.name]: productsData
// };

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV === 'development'
});

const sagasManager = sagaMiddleware.run(rootSaga);

export { sagasManager, store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
