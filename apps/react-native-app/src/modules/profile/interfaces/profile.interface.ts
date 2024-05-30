import { LucideProps } from 'lucide-react-native';

export type ProfileAction = {
  icon?: React.ComponentType<LucideProps>;
  name: string;
  action: () => void;
  type: 'sub' | 'inline';
};
