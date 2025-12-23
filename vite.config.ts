
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 루트에 index.html이 있는 구조를 지원
  root: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  }
});
