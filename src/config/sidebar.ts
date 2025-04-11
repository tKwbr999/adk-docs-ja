import { type SidebarNavItem } from '../types'; // 型定義をインポート

// 参照元サイトのサイドバー構造に基づき定義
export const sidebarNav: SidebarNavItem[] = [
  {
    title: 'Overview',
    items: [
      { title: 'Introduction', href: '/introduction' },
      { title: 'Key Concepts', href: '/key-concepts' },
    ],
  },
  {
    title: 'Getting Started',
    items: [
      { title: 'Installation', href: '/getting-started/installation' }, // 既存のパス
      { title: 'Quick Start', href: '/getting-started/quick-start' },
      { title: 'Examples', href: '/getting-started/examples' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Creating Agents', href: '/guides/creating-agents' },
      { title: 'Using Tools', href: '/guides/using-tools' },
      { title: 'Managing State', href: '/guides/managing-state' },
      { title: 'Debugging', href: '/guides/debugging' },
      { title: 'Deployment', href: '/guides/deployment' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'Core API', href: '/api-reference/core-api' },
      { title: 'Tool API', href: '/api-reference/tool-api' },
      { title: 'Agent API', href: '/api-reference/agent-api' },
    ],
  },
  {
    title: 'Community',
    items: [
      { title: 'Contributing', href: '/community/contributing' },
      { title: 'Support', href: '/community/support' },
    ],
  },
];
