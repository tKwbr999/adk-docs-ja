import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Vite の import.meta.glob を使って docs ディレクトリ以下の .md ファイルを動的にインポート
// query: '?raw' でファイル内容を文字列として取得し、import: 'default' でデフォルトエクスポートとして扱う
// eager: true でモジュールを即時ロード
const markdownModules = import.meta.glob('/docs/**/*.md', { query: '?raw', import: 'default', eager: true });

const ContentPage: React.FC = () => {
  const { '*': slug } = useParams<{ '*': string }>(); // '*' はワイルドカードパスパラメータを受け取る
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      setError(null);
      setMarkdown(null); // 再読み込み時にクリア

      if (!slug) {
        setError('Invalid document path.');
        setLoading(false);
        return;
      }

      // 対応する Markdown ファイルのパスを構築
      // /docs/ は import.meta.glob のパスに含まれているので不要
      // 先頭のスラッシュも不要な場合があるため除去
      const filePath = `/docs/${slug}.md`;
      console.log(`Attempting to load: ${filePath}`); // デバッグ用ログ

      // import.meta.glob の結果から該当ファイルの内容を取得
      const moduleContent = markdownModules[filePath];

      // moduleContent が存在し、かつ string 型であることを確認
      if (typeof moduleContent === 'string') {
        console.log(`Found content for: ${filePath}`); // デバッグ用ログ
        setMarkdown(moduleContent); // string 型であることが保証されている
      } else {
        console.error(`Markdown file not found at path: ${filePath}`); // デバッグ用ログ
        console.log('Available modules:', Object.keys(markdownModules)); // デバッグ用ログ
        setError(`Document not found: ${slug}`);
      }
      setLoading(false);
    };

    loadMarkdown();
  }, [slug]); // slug が変更されたら再実行

  if (loading) {
    return <div>Loading document...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!markdown) {
    // 通常は error ステートで処理されるはずだが念のため
    return <div>Document content is empty or could not be loaded.</div>;
  }

  return (
    <article className="prose lg:prose-xl max-w-none"> {/* prose スタイルを適用 */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
};

export default ContentPage;
