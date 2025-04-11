import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import matter from 'gray-matter';

// Vite の Glob Import 機能を使って Markdown ファイルのパスを取得
// キーは `/src/content/path/to/file.md` の形式
// 値は動的インポート関数 () => import('./path/to/file.md?raw')
// ?raw をつけてファイル内容を文字列として取得
const markdownModules = import.meta.glob('/src/content/**/*.md', { query: '?raw', import: 'default' });

const ContentPage: React.FC = () => {
  const params = useParams();
  const slug = params['*'] || ''; // /docs/aaa/bbb の '*' 部分を取得
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [frontMatter, setFrontMatter] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      setIsLoading(true);
      setError(null);
      // slug に対応する Markdown ファイルのパスを構築
      // 例: slug='getting-started/installation' -> '/src/content/getting-started/installation.md'
      const targetPath = `/src/content/${slug}.md`;

      // markdownModules から対応する動的インポート関数を取得
      const importFn = markdownModules[targetPath];

      if (importFn) {
        try {
          // 動的インポートを実行して Markdown 文字列を取得
          const rawContent = await importFn() as string;
          // gray-matter で Front Matter と本文をパース
          const { data, content } = matter(rawContent);
          setFrontMatter(data);
          setMarkdownContent(content);
        } catch (e) {
          console.error('Failed to load markdown content:', e);
          setError(e instanceof Error ? e : new Error('Unknown error loading content'));
        }
      } else {
        // 対応するファイルが見つからない場合
        setError(new Error(`Content not found for slug: ${slug}`));
      }
      setIsLoading(false);
    };

    loadMarkdown();
  }, [slug]); // slug が変更されたら再実行

  if (isLoading) {
    return <div>Loading...</div>; // ローディング表示
  }

  if (error) {
    // エラー発生時、またはファイルが見つからない場合
    // ここではシンプルに Not Found ページへリダイレクトする (App.tsx の設定に依存)
    // より丁寧なエラー表示も可能
    console.error(error.message);
    return <Navigate to="/" replace />; // ホームへリダイレクト
  }

  return (
    <article className="prose dark:prose-invert max-w-none"> {/* Tailwind Typography を適用 */}
      {frontMatter.title && <h1>{frontMatter.title}</h1>} {/* Front Matter のタイトルを表示 */}
      {markdownContent && (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]} // GFM (テーブルなど) を有効化
          rehypePlugins={[rehypeRaw]} // HTML タグを有効化 (注意: サニタイズが必要な場合あり)
        >
          {markdownContent}
        </ReactMarkdown>
      )}
    </article>
  );
};

export default ContentPage;
