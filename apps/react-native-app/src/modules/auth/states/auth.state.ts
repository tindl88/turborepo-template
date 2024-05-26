import { bindActionCreators } from 'redux';

import { useAppDispatch, useAppSelector } from '@/stores/redux/store';

import slice from './auth.slice';

export function useAuthState() {
  const dispatch = useAppDispatch();
  const state = useAppSelector(store => store[slice.name]);

  const actionCreators = bindActionCreators(slice.actions, dispatch);

  return { dispatch, ...state, ...actionCreators };
}
