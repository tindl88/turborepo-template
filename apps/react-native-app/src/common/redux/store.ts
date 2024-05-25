import type {TypedUseSelectorHook} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import {combineReducers, Middleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
// import {composeWithDevTools} from 'remote-redux-devtools';
import {configureStore} from '@reduxjs/toolkit';

import appSlice from '@/modules/app/states/app.slice';
import authSlice from '@/modules/auth/states/auth.slice';
import screenSlice from '@/modules/screen/states/screen.slice';

import rootSaga from './saga';

const preloadedState = {};

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [screenSlice.name]: screenSlice.reducer
});

const sagaMiddleware = createSagaMiddleware();

// const composeEnhancers = composeWithDevTools({
//   name: 'React Native Template',
//   realtime: true
// });

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(sagaMiddleware as Middleware),
  // enhancers: defaultEnhancers => defaultEnhancers().concat(composeEnhancers()),
  devTools: false
});

const sagasManager = sagaMiddleware.run(rootSaga);

export {sagasManager, store};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
