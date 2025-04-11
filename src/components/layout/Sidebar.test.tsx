import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest'; // beforeEach をインポート
import { MemoryRouter, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'; // デフォルトインポート
import { type SidebarNavItem } from '../../types'; // 正しい相対パスに変更

// --- モックデータ ---
const mockNavItems: SidebarNavItem[] = [
  {
    title: '入門ガイド',
    items: [
      { title: 'インストール', href: '/getting-started/installation' },
      { title: '使い方', href: '/getting-started/usage' },
    ],
  },
  {
    title: 'API リファレンス',
    items: [
      { title: '概要', href: '/api/overview' },
      { title: 'メソッド', href: '/api/methods' },
    ],
  },
  // Sidebar.tsx の実装に合わせて単一リンクのセクションは削除 (Accordion の中にしかリンクがないため)
  // {
  //   title: '単一リンク',
  //   href: '/single-link',
  //   items: [],
  // },
];

// --- モジュールのモック (ファイルの先頭近くに移動) ---
// useLocation と sidebarNav をモック
// vi.mock はトップレベルで呼び出す必要がある
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...original,
    useLocation: vi.fn(), // モック関数自体は beforeEach で設定
  };
});
// モック対象のパスを相対パスに変更
vi.mock('../../config/sidebar', () => ({
  sidebarNav: mockNavItems,
}));

// --- テスト用ラッパーコンポーネント ---
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

// --- テストスイート ---
describe('Sidebar Component', () => {
  beforeEach(() => {
    // 各テスト前に useLocation のモックをリセット・設定
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    });
    // 他のモックも必要に応じてリセット
    // vi.restoreAllMocks(); // Vitest v1+ 推奨
  });

  it('should render navigation items correctly based on mocked config', () => {
    render(
      <TestWrapper>
        <Sidebar /> {/* items props を削除 */}
      </TestWrapper>
    );

    // アコーディオンのトリガーが表示されるか
    expect(screen.getByRole('button', { name: '入門ガイド' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'API リファレンス' })).toBeInTheDocument();

    // デフォルトで最初のセクションが開いているか (Sidebar.tsx のロジックに基づく)
    expect(screen.getByRole('link', { name: 'インストール' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '使い方' })).toBeInTheDocument();
    // 他のセクションは閉じているか
    expect(screen.queryByRole('link', { name: '概要' })).not.toBeInTheDocument();
  });

  it('should expand/collapse accordion when section title is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Sidebar /> {/* items props を削除 */}
      </TestWrapper>
    );

    const gettingStartedButton = screen.getByRole('button', { name: '入門ガイド' });
    const apiReferenceButton = screen.getByRole('button', { name: 'API リファレンス' });

    // 初期状態: 入門ガイドは開いている、APIリファレンスは閉じている
    expect(screen.getByRole('link', { name: 'インストール' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: '概要' })).not.toBeInTheDocument();

    // APIリファレンスをクリックして開く (入門ガイドは閉じるはず)
    await user.click(apiReferenceButton);
    expect(await screen.findByRole('link', { name: '概要' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'メソッド' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'インストール' })).not.toBeInTheDocument(); // 閉じたか確認

    // 再度APIリファレンスをクリックして閉じる
    await user.click(apiReferenceButton);
    expect(screen.queryByRole('link', { name: '概要' })).not.toBeInTheDocument();
  });

  it('should highlight the active link based on current pathname', () => {
    // 現在のパスを設定 (Sidebar.tsx の Link to に合わせる)
    const activePath = '/docs/getting-started/installation';
    vi.mocked(useLocation).mockReturnValue({
      pathname: activePath,
      search: '', hash: '', state: null, key: 'test',
    });

    render(
      <TestWrapper>
        <Sidebar /> {/* items props を削除 */}
      </TestWrapper>
    );

    // アクティブなセクションはデフォルトで開く
    const installationLink = screen.getByRole('link', { name: 'インストール' });
    // Sidebar.tsx で定義されたアクティブクラスを確認
    expect(installationLink).toHaveClass('bg-muted text-primary');

    const usageLink = screen.getByRole('link', { name: '使い方' });
    expect(usageLink).not.toHaveClass('bg-muted text-primary');
  });

  // アクティブセクションのテストは削除
});
