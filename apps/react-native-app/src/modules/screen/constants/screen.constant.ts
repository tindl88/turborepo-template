interface IScreenProps {
  spacing?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
}

export const Screen: {[key: string]: IScreenProps} = {
  Preload: {},
  Login: {},
  Register: {},
  Home: {}
};
