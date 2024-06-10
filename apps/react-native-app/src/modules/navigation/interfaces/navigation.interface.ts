import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

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
  TravelDrawer: NavigatorScreenParams<TravelDrawerParamList>;
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

export type TravelDrawerParamList = {
  TravelBottomTabStack: undefined;
};

export type TravelBottomTabParamList = {
  TravelExploreStack: NavigatorScreenParams<ExploreParamList>;
  AccomodationStack: NavigatorScreenParams<AccomodationParamList>;
  TourStack: NavigatorScreenParams<TourParamList>;
  NotificationStack: NavigatorScreenParams<NotificationParamList>;
  ProfileStack: NavigatorScreenParams<ProfileParamList>;
};

export type NotificationParamList = {
  Notifications: undefined;
};

export type ProfileParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
};

export type TravelPlacesScreenParams = { q: string; page: number; limit: number };
export type TravelPlaceDetailScreenParams = { id: string };
export type ExploreParamList = {
  Home: undefined;
  TravelPlaces: TravelPlacesScreenParams;
  TravelPlaceDetail: TravelPlaceDetailScreenParams;
};

export type AccomodationsScreenParams = { q: string; page: number; limit: number };
export type AccomodationDetailScreenParams = { id: string };
export type AccomodationParamList = {
  Accomodations: AccomodationsScreenParams;
  AccomodationDetail: AccomodationDetailScreenParams;
};

export type ToursScreenParams = { q: string; page: number; limit: number };
export type TourDetailScreenParams = { id: string };
export type TourParamList = {
  Tours: ToursScreenParams;
  TourDetail: TourDetailScreenParams;
};

export type AuthenticatedNavigationProps = CompositeNavigationProp<
  StackNavigationProp<AuthenticatedParamList>,
  CompositeNavigationProp<
    DrawerNavigationProp<TravelDrawerParamList>,
    BottomTabNavigationProp<TravelBottomTabParamList>
  >
>;

export type HomeStackProps<T extends keyof ExploreParamList> = CompositeScreenProps<
  StackScreenProps<ExploreParamList, T>,
  CompositeScreenProps<
    CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>,
    StackScreenProps<AuthenticatedParamList>
  >
>;
