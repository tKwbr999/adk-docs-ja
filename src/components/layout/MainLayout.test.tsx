import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import { describe, it, expect } from 'vitest';

// Outlet のテスト用ダミーコンポーネント
const DummyChildComponent = () => <div>Child Content</div>;

describe('MainLayout', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={ui}>
            {/* Outlet に表示するダミーコンポーネントへのルート */}
            <Route index element={<DummyChildComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders sidebar', () => {
    renderWithRouter(<MainLayout />);
    // 'aside' タグまたは 'Sidebar' というテキストでサイドバーの存在を確認
    // getByRole('complementary') は <aside> タグを検索
    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
  });

  it('renders header', () => {
    renderWithRouter(<MainLayout />);
    // 'header' タグまたは 'Header' というテキストでヘッダーの存在を確認
    // getByRole('banner') は <header> タグを検索
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('renders main content area', () => {
    renderWithRouter(<MainLayout />);
    // 'main' タグでメインコンテンツエリアの存在を確認
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders Outlet content', () => {
    renderWithRouter(<MainLayout />);
    // Outlet に渡したダミーコンポーネントの内容が表示されることを確認
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
