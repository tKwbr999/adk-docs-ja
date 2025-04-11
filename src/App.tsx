import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ContentPage from './pages/ContentPage';
import './App.css'; // 必要に応じてグローバル CSS をインポート

function App() {
  // GitHub Pages のサブディレクトリに対応するためのベースパス取得
  // vite.config.ts で設定した base を利用する想定だが、
  // BrowserRouter では basename プロパティで設定する
  // process.env.BASE_URL は Vite 固有の環境変数
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} /> {/* ルートパス */}
          <Route path="docs/:slug" element={<ContentPage />} /> {/* コンテンツページ */}
          {/* 他のルートもここに追加可能 */}
          <Route path="*" element={<div>404 Not Found</div>} /> {/* 404 ページ */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
