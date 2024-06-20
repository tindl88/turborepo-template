import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/config-tailwindcss/tailwind.config';

const customConfig: Pick<Config, 'content' | 'presets'> = {
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/shared-client/src/**/*.{ts,tsx}'
  ],
  presets: [sharedConfig]
};

export default customConfig;
