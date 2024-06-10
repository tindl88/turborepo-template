import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Anthenticated: NavigatorScreenParams<AuthenticatedParamList>;
  Unanthenticated: NavigatorScreenParams<UnauthenticatedParamList>;
};

export type AuthenticatedParamList = {
  // BASE
  Preload: undefined;
  Search: undefined;
  HelpCenter: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
  Settings: undefined;
  SettingLanguage: undefined;
  SettingTheme: undefined;
  // TRAVEL APP
  TravelDrawer: undefined;
  // DEMO
  UI: undefined;
  ScanCode: undefined;
};

export type UnauthenticatedParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  VerifyOtp: undefined;
  CreateNewPassword: undefined;
};

export type ProfileParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
};

export type NotificationParamList = {
  Notifications: undefined;
};

export type TravelDrawerParamList = {
  TravelBottomTabStack: undefined;
};

export type TravelBottomTabParamList = {
  TravelExploreStack: undefined;
  TravelAccomodationStack: undefined;
  TravelTourStack: undefined;
  NotificationStack: undefined;
  ProfileStack: undefined;
};

export type TravelExploreParamList = {
  Home: undefined;
  TravelPlaces: TravelPlacesScreenParams;
  TravelPlaceDetail: undefined;
};

export type TravelAccomodationParamList = {
  TravelAccomodations: AccomodationsScreenParams;
  TravelAccomodationDetail: undefined;
};

export type TravelTourParamList = {
  TravelTours: TravelToursScreenParams;
  TravelTourDetail: undefined;
};

export type TravelToursScreenParams = { q: string; page: number; limit: number };
export type TravelPlacesScreenParams = { q: string; page: number; limit: number };
export type AccomodationsScreenParams = { q: string; page: number; limit: number };
