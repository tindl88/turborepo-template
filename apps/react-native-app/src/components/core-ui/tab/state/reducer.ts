import {IAction, IState, Types} from './types';

export default function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case Types.SET_ACTIVE_TAB:
      state.activeTab = action.payload;

      return state;
    default:
      return state;
  }
}
