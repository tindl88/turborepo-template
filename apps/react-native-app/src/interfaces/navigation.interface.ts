import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Anthenticated: NavigatorScreenParams<AuthenticatedParamList>;
  Unanthenticated: NavigatorScreenParams<UnauthenticatedParamList>;
};

export type AuthenticatedParamList = {
  HomeDrawer: undefined;
  TravelDrawer: undefined;
  Filter: undefined;
  Notification: undefined;
  PostDetail: undefined;
  Preload: undefined;
  Search: undefined;
  HelpCenter: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
  ProfileEdit: undefined;
  Setting: undefined;
  SettingLanguage: undefined;
  SettingTheme: undefined;
  ScanCode: undefined;
  Post: PostScreenParams;
};

export type UnauthenticatedParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  VerifyOtp: undefined;
  CreateNewPassword: undefined;
};

export type HomeDrawerParamList = {
  HomeBottomTabStack: undefined;
  Filter: undefined;
  Notification: undefined;
  PostDetail: undefined;
  Preload: undefined;
  Search: undefined;
  HelpCenter: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
  ProfileEdit: undefined;
  Setting: undefined;
  SettingLanguage: undefined;
  SettingTheme: undefined;
  ScanCode: undefined;
  Post: PostScreenParams;
  UI: undefined;
};

export type HomeBottomTabParamList = {
  Home: undefined;
  Profile: undefined;
};

export type TravelDrawerParamList = {
  TravelBottomTabStack: undefined;
  Filter: undefined;
  Notification: undefined;
  PostDetail: undefined;
  Preload: undefined;
  Search: undefined;
  HelpCenter: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
  ProfileEdit: undefined;
  Setting: undefined;
  SettingLanguage: undefined;
  SettingTheme: undefined;
  ScanCode: undefined;
  Post: PostScreenParams;
  UI: undefined;
};

export type TravelBottomTabParamList = {
  Home: undefined;
  Profile: undefined;
};

export type PostScreenParams = { q: string; page: number; limit: number };
