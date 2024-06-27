import withNextIntl from 'next-intl/plugin';
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui', '@repo/shared-client', '@repo/shared-universal'],
  images: {
    remotePatterns: [{ protocol: 'http', hostname: 'localhost' }]
  },
  webpack: config => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil'
    });

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(process.cwd(), './src/libs/svg-icons/dist'),
            to: path.join(process.cwd(), './public/fonts'),
            noErrorOnMissing: true
          }
        ]
      })
    );

    return config;
  }
};

export default withNextIntl('./i18n.ts')(nextConfig);
