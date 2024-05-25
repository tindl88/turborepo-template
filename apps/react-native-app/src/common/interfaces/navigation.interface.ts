import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Anthenticated: NavigatorScreenParams<AuthenticatedParamList>;
  Unanthenticated: NavigatorScreenParams<UnauthenticatedParamList>;
};

export type AuthenticatedParamList = {
  Filter: undefined;
  Notification: undefined;
  PostDetail: undefined;
  Preload: undefined;
  HomeStack: undefined;
  Search: undefined;
};

export type UnauthenticatedParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  VerifyOtp: undefined;
  CreateNewPassword: undefined;
};

export type DrawerParamList = {
  HomeBottomTabStack: undefined;
};

export type HomeBottomTabParamList = {
  Home: undefined;
  Post: PostScreenParams;
  ScanCode: undefined;
  Setting: undefined;
  Profile: undefined;
  UI: undefined;
};

export type PostScreenParams = {q: string; page: number; limit: number};
