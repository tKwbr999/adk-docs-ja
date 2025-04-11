import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* サイドバー (仮) */}
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
        {/* ナビゲーションリンクなどをここに追加 */}
      </aside>

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col">
        {/* ヘッダー (仮) */}
        <header className="bg-white shadow p-4">
          <h1 className="text-xl font-bold">Header</h1>
        </header>

        {/* ページコンテンツ */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* ここに各ページのコンテンツが表示される */}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
