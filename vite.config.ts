import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fomaLessonsPlugin } from './plugins/vite-plugin-lessons.ts';
import { execSync } from 'node:child_process';

function getGitInfo() {
  try {
    const hash = execSync('git rev-parse --short HEAD').toString().trim();
    const date = execSync('git log -1 --format=%cd --date=format:"%d.%m.%Y"').toString().trim();
    return { hash: hash || 'dev', date: date || new Date().toLocaleDateString('ru-RU') };
  } catch {
    return { hash: 'dev', date: new Date().toLocaleDateString('ru-RU') };
  }
}

const { hash: commitHash, date: commitDate } = getGitInfo();

export default defineConfig({
  base: './',
  define: {
    __APP_COMMIT_HASH__: JSON.stringify(commitHash),
    __APP_COMMIT_DATE__: JSON.stringify(commitDate),
  },
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
