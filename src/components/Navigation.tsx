import { LayoutDashboard, Package, Lightbulb, BookOpen } from 'lucide-react';
import type { TabName } from '../types';

interface Props {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

const TABS: { id: TabName; label: string; Icon: React.FC<{ size?: number; className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'products', label: 'Products', Icon: Package },
  { id: 'guide', label: 'Guide', Icon: Lightbulb },
  { id: 'resources', label: 'Resources', Icon: BookOpen },
];

export function Navigation({ activeTab, onTabChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-2xl mx-auto flex">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 px-1 transition-all duration-200 ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <Icon
                size={22}
                className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
              />
              <span className={`text-[10px] font-medium leading-tight ${isActive ? 'font-semibold' : ''}`}>
                {label}
              </span>
              {isActive && (
                <span className="w-4 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
