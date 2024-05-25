import { PayloadAction, Unsubscribe } from '@reduxjs/toolkit';

import { PostFilter } from '../interfaces/posts.interface';

import { AppStartListening } from '@/stores/redux/store';

import slice from './posts.slice';

function onListRequest(action: PayloadAction<{ filter?: PostFilter }>) {
  console.log('onListRequest', action);
}

export function setupPostListeners(startListening: AppStartListening): Unsubscribe {
  const listeners = [startListening({ actionCreator: slice.actions.listRequest, effect: onListRequest })];

  return () => listeners.forEach(unsubscribe => unsubscribe());
}
