export enum Types {
  SET_ACTIVE_TAB = 'core-ui/tab/SET_ACTIVE_TAB'
}

export interface IState {
  activeTab: string;
}

export type SetActiveTab = { type: typeof Types.SET_ACTIVE_TAB; payload: string };

export type IAction = SetActiveTab;
