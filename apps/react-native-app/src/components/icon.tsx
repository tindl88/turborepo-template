import React from 'react';
import { icons } from 'lucide-react-native';

import { useThemeState } from '@/modules/theme/states/theme.state';

type IconProps = {
  name: keyof typeof icons;
  color?: string;
  size?: number;
};

const Icon: React.FC<IconProps> = ({ name, color, size = 24 }) => {
  const { configs } = useThemeState();

  const LucideIcon = icons[name];

  return <LucideIcon color={color ?? configs.foreground} size={size} />;
};

export default Icon;
