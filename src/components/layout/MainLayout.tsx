import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Sidebar コンポーネントをインポート

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* 実装した Sidebar コンポーネントを使用 */}
      <Sidebar />

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
