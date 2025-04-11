import React from 'react';
import { useParams } from 'react-router-dom';

const ContentPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // URL パラメータから slug を取得 (例)

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Content Page: {slug || 'Default'}</h1>
      <p>This is where the translated content for "{slug || 'default'}" will be displayed.</p>
      {/* Markdown レンダリングコンポーネントをここに追加 */}
    </div>
  );
};

export default ContentPage;
