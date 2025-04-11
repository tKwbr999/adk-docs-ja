import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
// GitHub Actions環境かどうかを判定
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const base = isGitHubActions ? '/adk-docs-ja/' : '/'; // 環境変数に応じてbaseパスを決定

// https://vite.dev/config/
export default defineConfig({
  base: base, // 動的に設定されたbaseパスを使用
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
