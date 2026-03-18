import { LayoutDashboard, Package, TrendingUp, Compass } from 'lucide-react';
import type { TabName } from '../types';

interface Props {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

const TABS: { id: TabName; label: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: 'dashboard', label: 'Home', Icon: LayoutDashboard },
  { id: 'resources', label: 'Earn', Icon: TrendingUp },
  { id: 'products', label: 'Products', Icon: Package },
  { id: 'guide', label: 'Guide', Icon: Compass },
];

export function Navigation({ activeTab, onTabChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/80 dark:border-gray-800/80 shadow-xl shadow-black/5">
      <div className="max-w-2xl mx-auto flex px-2">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 px-1 transition-all duration-200 relative`}
            >
              {/* Active pill background */}
              {isActive && (
                <span className="absolute inset-x-2 top-1.5 bottom-1.5 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30" />
              )}
              <Icon
                size={20}
                className={`relative z-10 transition-all duration-200 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
              <span className={`relative z-10 text-[10px] font-semibold leading-tight transition-all duration-200 ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
