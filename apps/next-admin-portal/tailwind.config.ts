import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/config-tailwindcss/tailwind.config';

const customConfig: Pick<Config, 'content' | 'presets'> = {
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/react-web-ui-shadcn/src/**/*.{ts,tsx}',
    '../../packages/shared-web/src/**/*.{ts,tsx}'
  ],
  presets: [sharedConfig]
};

export default customConfig;
