import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
// import Header from './Header'; // 必要に応じてヘッダーをインポート

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* <Header /> */} {/* ヘッダーが必要な場合はここに追加 */}
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6"> {/* メインコンテンツエリア */}
        <Outlet /> {/* ここに各ページのコンポーネントが描画される */}
      </main>
    </div>
  );
};

export default MainLayout;
