import { useState, useCallback, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import type { TabName, Product, SaleLog } from './types';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Products } from './components/Products';
import { Guide } from './components/Guide';
import { Resources } from './components/Resources';
import { INITIAL_PRODUCTS, INITIAL_SALE_LOGS, MONTHLY_CHART_DATA, WEEKLY_CHART_DATA, DEFAULT_MONTHLY_GOAL } from './data/sampleData';
import { GUIDE_IDEAS } from './data/guideData';

let idCounter = 1000;
const nextId = () => `gen-${++idCounter}`;

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('dashboard');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [saleLogs, setSaleLogs] = useState<SaleLog[]>(INITIAL_SALE_LOGS);
  const [monthlyGoal, setMonthlyGoal] = useState(DEFAULT_MONTHLY_GOAL);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const handleAddProduct = useCallback((data: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...data, id: nextId() }]);
  }, []);

  const handleEditProduct = useCallback((updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  }, []);

  const handleDeleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setSaleLogs(prev => prev.filter(l => l.productId !== id));
  }, []);

  const handleLogSale = useCallback((productId: string, units: number, date: string) => {
    setSaleLogs(prev => [...prev, { id: nextId(), productId, units, date }]);
    setProducts(prev =>
      prev.map(p => p.id === productId ? { ...p, unitsSold: p.unitsSold + units } : p)
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      {/* Persistent top header with dark mode toggle */}
      <header className="sticky top-0 z-40 bg-gray-50/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-11">
          <span className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">Creator OS</span>
          <button
            onClick={() => setDarkMode(d => !d)}
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-90"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      {/* Tab content */}
      <main className="max-w-2xl mx-auto pb-20">
        <div className="transition-opacity duration-150" key={activeTab}>
          {activeTab === 'dashboard' && (
            <Dashboard
              products={products}
              saleLogs={saleLogs}
              monthlyGoal={monthlyGoal}
              monthlyChartData={MONTHLY_CHART_DATA}
              weeklyChartData={WEEKLY_CHART_DATA}
              darkMode={darkMode}
            />
          )}
          {activeTab === 'products' && (
            <Products
              products={products}
              saleLogs={saleLogs}
              monthlyGoal={monthlyGoal}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onLogSale={handleLogSale}
              onSetGoal={setMonthlyGoal}
            />
          )}
          {activeTab === 'guide' && (
            <Guide ideas={GUIDE_IDEAS} />
          )}
          {activeTab === 'resources' && (
            <Resources />
          )}
        </div>
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
