import {SetActiveTab, Types} from './types';

export const setActiveTab = (payload: string): SetActiveTab => {
  return {type: Types.SET_ACTIVE_TAB, payload};
};
