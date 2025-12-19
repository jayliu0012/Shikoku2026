
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 確保編譯後的路徑是相對的，這對 GitHub Pages 尤其重要
  build: {
    outDir: 'dist',
  }
});
