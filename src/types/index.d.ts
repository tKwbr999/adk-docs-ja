// グローバルな型定義や、複数の場所で使われる型を定義します。

/**
 * サイドバーの単一ナビゲーション項目を表す型
 */
export type SidebarNavItem = {
  title: string;
  href?: string; // href はオプショナル（セクションタイトルなど）
  disabled?: boolean;
  external?: boolean;
  icon?: React.ComponentType<{ className?: string }>; // Lucide アイコンなどを想定
  label?: string;
  items?: SidebarNavItem[]; // 子項目（アコーディオンの中身など）
};

// 他に必要な型があればここに追加
