import { LucideProps } from 'lucide-react-native';

export type ProfileAction = {
  icon?: React.ComponentType<LucideProps>;
  name: string;
  type: 'sub' | 'inline';
  value?: string | boolean;
  action: () => void;
};
