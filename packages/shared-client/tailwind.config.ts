import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwindcss-config/tailwind.config';

const config: Pick<Config, 'presets' | 'content'> = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [sharedConfig]
};

export default config;
