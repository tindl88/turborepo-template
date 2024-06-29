import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

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
  }
});
