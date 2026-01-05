
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 必須與您的 GitHub 儲存庫名稱完全一致
  base: '/Shikoku2026/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 關閉 source map 以加快編譯並減少體積
    sourcemap: false,
  }
});
