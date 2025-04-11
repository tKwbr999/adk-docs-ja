/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true, // describe, it, expect などをグローバルに利用可能にする
      environment: 'jsdom', // テスト環境として jsdom を使用
      setupFiles: './src/setupTests.ts', // テスト実行前のセットアップファイル
      coverage: {
        provider: 'istanbul', // カバレッジプロバイダーを istanbul に変更
        reporter: ['text', 'json', 'html'], // レポート形式
        include: ['src/**/*.{ts,tsx}'], // カバレッジ対象
        exclude: [ // カバレッジ除外
          'src/main.tsx',
          'src/vite-env.d.ts',
          'src/components/ui/**', // shadcn/ui が生成するコンポーネントは除外
          'src/setupTests.ts',
          '**/*.config.{js,ts}',
          '**/*.d.ts',
        ],
        all: true, // 未テストファイルもカバレッジレポートに含める
      },
    },
  }),
);
