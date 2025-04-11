import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarNav } from '@/config/sidebar'; // 設定ファイルをインポート
import { cn } from '@/lib/utils'; // shadcn/ui のユーティリティ関数
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // shadcn/ui の Accordion
import { buttonVariants } from '@/components/ui/button'; // shadcn/ui の Button スタイル

const Sidebar: React.FC = () => {
  const location = useLocation();

  // 現在のパスに基づいてデフォルトで開くアコーディオン項目を決定
  const getDefaultAccordionValue = () => {
    for (const section of sidebarNav) {
      if (section.items.some(item => location.pathname.startsWith('/docs' + item.href))) {
        return section.title;
      }
    }
    // マッチしない場合は最初のセクションを開く（または開かない場合は undefined）
    return sidebarNav.length > 0 ? sidebarNav[0].title : undefined;
  };

  return (
    <aside className="w-64 bg-background p-4 border-r flex flex-col">
      <nav className="flex-1 space-y-1">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue={getDefaultAccordionValue()} // デフォルトで開く項目
        >
          {sidebarNav.map((section) => (
            <AccordionItem value={section.title} key={section.title} className="border-b-0">
              <AccordionTrigger className="text-sm font-medium hover:no-underline px-2 py-1.5">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="pb-1">
                <div className="ml-4 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      to={`/docs${item.href}`} // ルートパスに /docs を追加
                      className={cn(
                        buttonVariants({ variant: 'ghost', size: 'sm' }),
                        'w-full justify-start text-muted-foreground',
                        location.pathname === `/docs${item.href}` && 'bg-muted text-primary hover:bg-muted hover:text-primary' // アクティブなリンクのスタイル
                      )}
                      aria-disabled={item.disabled}
                      tabIndex={item.disabled ? -1 : undefined}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
    </aside>
  );
};

export default Sidebar;
