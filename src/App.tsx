import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ContentPage from './pages/ContentPage';
import './App.css'; // 必要に応じて App 固有のスタイル

function App() {
  // Vite の機能を使って content ディレクトリ以下の .md ファイルを取得
  // これはビルド時に静的に解決されるか、開発サーバーで動的に扱われる
  // ここではルーティング定義のためにパスのパターンのみ使用
  // 実際のファイル一覧取得やデータ読み込みは ContentPage で行う想定

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}> {/* vite.config.js の base 設定を反映 */}
      <Routes>
        <Route path="/" element={<MainLayout />}> {/* MainLayout を共通レイアウトとして使用 */}
          <Route index element={<HomePage />} /> {/* ルートパス */}
          {/*
            /docs/* ルート: ContentPage にマッチさせ、
            '*' 部分をパラメータとして渡す
            ContentPage 内で useParams() を使ってパスを取得し、
            対応する Markdown ファイルを読み込む
          */}
          <Route path="/docs/*" element={<ContentPage />} />
          {/* 他のトップレベルルートがあればここに追加 */}
          <Route path="*" element={<Navigate to="/" replace />} /> {/* Not Found -> Home へリダイレクト */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
