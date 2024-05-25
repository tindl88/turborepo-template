import {useContext} from 'react';

import * as actions from './actions';
import {Context, DispatchContext} from './context';

function useTabState() {
  const context = useContext(Context);

  if (context === undefined) throw new Error('useTabState must be used within a TabProvider');

  return context;
}

function useTabDispatch() {
  const context = useContext(DispatchContext);

  if (context === undefined) throw new Error('useTabDispatch must be used within a TabProvider');

  return context;
}

export function useTab() {
  const state = useTabState();
  const dispatch = useTabDispatch();
  const setActiveTab = (label: string) => dispatch(actions.setActiveTab(label));

  return {state, dispatch, setActiveTab};
}
