import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, useLocation as actualUseLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
// 実際の sidebarNav をインポート
import { sidebarNav as actualSidebarNav } from '../../config/sidebar';
import { type SidebarNavItem } from '../../types'; // 型定義もインポート

// --- モジュールのモック ---
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

// config/sidebar はモックせず、実際の値を使用する

// --- テスト用ラッパーコンポーネント ---
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
);

// --- テストスイート ---
describe('Sidebar Component', () => {
  const useLocationMock = actualUseLocation as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    useLocationMock.mockReturnValue({
      pathname: '/',
      search: '', hash: '', state: null, key: 'default',
    });
  });

  it('should render section titles from config', () => {
    render(<TestWrapper><Sidebar /></TestWrapper>);
    actualSidebarNav.forEach(section => {
      // section.title が存在することを確認してからテスト
      if (section?.title) {
        expect(screen.getByRole('button', { name: section.title })).toBeInTheDocument();
      } else {
        // title がないデータはテストしないか、エラーにする (今回は何もしない)
      }
    });
  });

  it('should open the default section based on initial path', () => {
    render(<TestWrapper><Sidebar /></TestWrapper>);
    // actualSidebarNav が空でないことを確認
    if (actualSidebarNav.length > 0) {
      const firstSection = actualSidebarNav[0];
      // firstSection と items が存在することを確認
      if (firstSection?.items && firstSection.items.length > 0) {
        firstSection.items.forEach(item => {
          // item.title が存在することを確認
          if (item?.title) {
            expect(screen.getByRole('link', { name: item.title })).toBeInTheDocument();
          }
        });
      }
      // 他のセクションが閉じていることを確認
      if (actualSidebarNav.length > 1) {
        const secondSection = actualSidebarNav[1];
        // secondSection と items が存在することを確認
        if (secondSection?.items && secondSection.items.length > 0) {
          const firstItemTitle = secondSection.items[0]?.title;
          if (firstItemTitle) {
            expect(screen.queryByRole('link', { name: firstItemTitle })).not.toBeInTheDocument();
          }
        }
      }
    }
  });

   it('should open the corresponding section if the initial path matches a child link', () => {
     // actualSidebarNav[1] とその items[0] が存在するかチェック
     if (actualSidebarNav.length > 1 && actualSidebarNav[1]?.items && actualSidebarNav[1].items.length > 0 && actualSidebarNav[1].items[0]?.href) {
       const targetItem = actualSidebarNav[1].items[0];
       const targetPath = `/docs${targetItem.href}`;
       useLocationMock.mockReturnValue({
         pathname: targetPath,
         search: '', hash: '', state: null, key: 'test',
       });
       render(<TestWrapper><Sidebar /></TestWrapper>);

       // 2番目のセクションが開いていることを確認
       const secondSection = actualSidebarNav[1];
       secondSection.items?.forEach(item => { // items が undefined でないことを確認
         if (item?.title) {
           expect(screen.getByRole('link', { name: item.title })).toBeInTheDocument();
         }
       });

       // 最初のセクションが閉じていることを確認
       const firstSection = actualSidebarNav[0];
       if (firstSection?.items && firstSection.items.length > 0) {
         const firstItemTitle = firstSection.items[0]?.title;
         if (firstItemTitle) {
           expect(screen.queryByRole('link', { name: firstItemTitle })).not.toBeInTheDocument();
         }
       }
     } else {
       // テストの前提条件が満たされない場合はスキップまたは失敗させる
       it.skip('Skipping test because sidebarNav structure is not as expected', () => {});
     }
   });

  it('should expand/collapse accordion when section title is clicked', async () => {
    // テストの前提条件を確認
    if (actualSidebarNav.length < 2 || !actualSidebarNav[0]?.items?.[0]?.title || !actualSidebarNav[1]?.items?.[0]?.title) {
       it.skip('Skipping test because sidebarNav structure is not as expected', () => {});
       return;
    }

    const user = userEvent.setup();
    render(<TestWrapper><Sidebar /></TestWrapper>);

    const firstSectionTitle = actualSidebarNav[0].title;
    const secondSectionTitle = actualSidebarNav[1].title;
    const firstSectionFirstItem = actualSidebarNav[0].items[0].title;
    const secondSectionFirstItem = actualSidebarNav[1].items[0].title;

    const firstSectionButton = screen.getByRole('button', { name: firstSectionTitle });
    const secondSectionButton = screen.getByRole('button', { name: secondSectionTitle });

    // 初期状態
    expect(screen.getByRole('link', { name: firstSectionFirstItem })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: secondSectionFirstItem })).not.toBeInTheDocument();

    // 2番目をクリック
    await user.click(secondSectionButton);
    expect(await screen.findByRole('link', { name: secondSectionFirstItem })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: firstSectionFirstItem })).not.toBeInTheDocument();

    // 1番目をクリック
    await user.click(firstSectionButton);
    expect(await screen.findByRole('link', { name: firstSectionFirstItem })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: secondSectionFirstItem })).not.toBeInTheDocument();

     // 再度1番目をクリック
     await user.click(firstSectionButton);
     expect(screen.queryByRole('link', { name: firstSectionFirstItem })).not.toBeInTheDocument();
  });

  it('should highlight the active link based on current pathname', () => {
     // テストの前提条件を確認
    if (!actualSidebarNav[0]?.items?.[0]?.href) {
       it.skip('Skipping test because sidebarNav structure is not as expected', () => {});
       return;
    }
    const targetItem = actualSidebarNav[0].items[0];
    const activePath = `/docs${targetItem.href}`;
    useLocationMock.mockReturnValue({
      pathname: activePath,
      search: '', hash: '', state: null, key: 'test',
    });

    render(<TestWrapper><Sidebar /></TestWrapper>);

    const activeLink = screen.getByRole('link', { name: targetItem.title });
    expect(activeLink).toHaveClass('bg-muted text-primary');

    // 他のリンクがアクティブでないことを確認
    if (actualSidebarNav[0].items.length > 1 && actualSidebarNav[0].items[1]?.title) {
      const inactiveItem = actualSidebarNav[0].items[1];
      const inactiveLink = screen.getByRole('link', { name: inactiveItem.title });
      expect(inactiveLink).not.toHaveClass('bg-muted text-primary');
    }
  });
});
