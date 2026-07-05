// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

export default defineConfig({
  site: 'https://annidup.github.io',
  vite: {
    resolve: {
      alias: {
        '@lib': path.resolve('./src/lib'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
      },
    },
  },
});
