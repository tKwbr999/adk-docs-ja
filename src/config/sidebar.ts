// サイドバーのナビゲーション構造を定義します
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface SidebarNavItem {
  title: string;
  items: NavItem[];
}

export const sidebarNav: SidebarNavItem[] = [
  {
    title: 'はじめに',
    items: [
      { title: '概要', href: '/overview' }, // TODO: 対応する Markdown パスを確認・修正
      { title: 'インストール', href: '/getting-started/installation' },
      { title: '基本的な使い方', href: '/getting-started/basic-usage' }, // TODO: 対応する Markdown パスを確認・修正
    ],
  },
  {
    title: 'ガイド',
    items: [
      { title: 'エージェントの作成', href: '/guides/creating-agents' }, // TODO: 対応する Markdown パスを確認・修正
      { title: 'ツールの使用', href: '/guides/using-tools' }, // TODO: 対応する Markdown パスを確認・修正
      // 他のガイドページを追加
    ],
  },
  // 他のセクションを追加
];
