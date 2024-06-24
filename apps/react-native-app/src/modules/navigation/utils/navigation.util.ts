export function getHeaderTitle(routeName: string) {
  switch (routeName) {
    case 'Profile':
      return 'screen_profile';
    case 'ProfileEdit':
      return 'screen_profile_edit';
    default:
      return routeName;
  }
}
