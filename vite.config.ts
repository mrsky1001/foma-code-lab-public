import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fomaLessonsPlugin } from './plugins/vite-plugin-lessons.ts';

export default defineConfig({
  base: './',
  plugins: [
    fomaLessonsPlugin(),
    react(),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
