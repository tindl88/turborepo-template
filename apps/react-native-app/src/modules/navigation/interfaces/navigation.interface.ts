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
  ForgotPassword: undefined;
  VerifyOtp: undefined;
  ResetPassword: undefined;
};

export type NotificationParamList = {
  Notifications: undefined;
};

export type ProfileParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
};

export type TravelDrawerParamList = {
  TravelBottomTabStack: undefined;
};

export type TravelBottomTabParamList = {
  TravelExploreStack: NavigatorScreenParams<ExploreParamList>;
  AccommodationStack: NavigatorScreenParams<AccommodationParamList>;
  TourStack: NavigatorScreenParams<TourParamList>;
  NotificationStack: NavigatorScreenParams<NotificationParamList>;
  ProfileStack: NavigatorScreenParams<ProfileParamList>;
};

export type TravelPlacesScreenParams = { q: string; page: number; limit: number };
export type TravelPlaceDetailScreenParams = { id: string };
export type ExploreParamList = {
  Home: undefined;
  TravelPlaces: TravelPlacesScreenParams;
  TravelPlaceDetail: TravelPlaceDetailScreenParams;
};

export type AccommodationsScreenParams = { q: string; page: number; limit: number };
export type AccommodationDetailScreenParams = { id: string };
export type AccommodationParamList = {
  Accommodations: AccommodationsScreenParams;
  AccommodationDetail: AccommodationDetailScreenParams;
};

export type ToursScreenParams = { q: string; page: number; limit: number };
export type TourDetailScreenParams = { id: string };
export type TourParamList = {
  Tours: ToursScreenParams;
  TourDetail: TourDetailScreenParams;
};

/**
 * Type for hook useNavigation
 *
 * Usage:
 * const navigation = useNavigation<AuthenticatedNavigationProps>()
 * const navigation = useNavigation<UnauthenticatedNavigationProps>()
 */
export type UnauthenticatedNavigationProps = StackNavigationProp<UnauthenticatedParamList>;

export type AuthenticatedNavigationProps = CompositeNavigationProp<
  StackNavigationProp<AuthenticatedParamList>,
  CompositeNavigationProp<
    DrawerNavigationProp<TravelDrawerParamList>,
    BottomTabNavigationProp<TravelBottomTabParamList>
  >
>;

/**
 * Type for screens
 *
 * Usage:
 * function HomeScreen({}: TravelExploreStack<'Home'>) {...}
 * function ProfileScreen({}: ProfileStackProps<'Profile'>) {...}
 */
export type UnauthenticatedStackProps<T extends keyof UnauthenticatedParamList> = StackScreenProps<
  UnauthenticatedParamList,
  T
>;

type RestProps = CompositeScreenProps<
  CompositeScreenProps<DrawerScreenProps<TravelDrawerParamList>, BottomTabScreenProps<TravelBottomTabParamList>>,
  StackScreenProps<AuthenticatedParamList>
>;

export type AuthenticatedStackProps<T extends keyof AuthenticatedParamList> = CompositeScreenProps<
  StackScreenProps<AuthenticatedParamList, T>,
  RestProps
>;

export type ProfileStackProps<T extends keyof ProfileParamList> = CompositeScreenProps<
  StackScreenProps<ProfileParamList, T>,
  RestProps
>;

export type NotificationStackProps<T extends keyof NotificationParamList> = CompositeScreenProps<
  StackScreenProps<NotificationParamList, T>,
  RestProps
>;

export type TravelExploreStackProps<T extends keyof ExploreParamList> = CompositeScreenProps<
  StackScreenProps<ExploreParamList, T>,
  RestProps
>;

export type TravelTourStackProps<T extends keyof TourParamList> = CompositeScreenProps<
  StackScreenProps<TourParamList, T>,
  RestProps
>;

export type TravelAccommodationStackProps<T extends keyof AccommodationParamList> = CompositeScreenProps<
  StackScreenProps<AccommodationParamList, T>,
  RestProps
>;
