import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './__tests__'),
      '@mocks': path.resolve(__dirname, './__mocks__'),
      '~react-web-ui-shadcn': path.resolve(__dirname, '../../packages/react-web-ui-shadcn/src'),
      '~shared-web': path.resolve(__dirname, '../../packages/shared-web/src'),
      '~shared-universal': path.resolve(__dirname, '../../packages/shared-universal/src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/unit/setup/index.ts'],
    include: ['./src/**/*.{test,spec}.{ts,tsx}', './__tests__/unit/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/libs'],
      provider: 'v8', // 'v8', 'istanbul'
      reportsDirectory: './unit-coverage',
      extension: ['.ts', '.tsx', '.js', '.jsx'],
      reporter: ['text', 'json', 'html']
    }
  }
});
