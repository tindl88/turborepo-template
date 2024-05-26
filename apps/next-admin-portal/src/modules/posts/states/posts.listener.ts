import { PayloadAction, Unsubscribe } from '@reduxjs/toolkit';

import { PostFilter } from '../interfaces/posts.interface';

import { AppStartListening } from '@/stores/redux/store';

import slice from './posts.slice';

function onListRequest(_action: PayloadAction<{ filter?: PostFilter }>) {}

export function setupPostListeners(startListening: AppStartListening): Unsubscribe {
  const listeners = [startListening({ actionCreator: slice.actions.listRequest, effect: onListRequest })];

  return () => listeners.forEach(unsubscribe => unsubscribe());
}
