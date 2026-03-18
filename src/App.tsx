import { useState, useCallback, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import type { TabName, Product, SaleLog, RoadmapItem, RoadmapStatus } from './types';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Products } from './components/Products';
import { Guide } from './components/Guide';
import { Resources } from './components/Resources';
import { INITIAL_PRODUCTS, INITIAL_SALE_LOGS, MONTHLY_CHART_DATA, WEEKLY_CHART_DATA, DEFAULT_MONTHLY_GOAL } from './data/sampleData';
import { GUIDE_IDEAS } from './data/guideData';

let idCounter = 1000;
const nextId = () => `gen-${++idCounter}`;

interface NewRoadmapData {
  sourceId?: string;
  name: string;
  category: Product['category'];
  platform: Product['platform'];
  price: number;
  description: string;
}

function loadRoadmap(): RoadmapItem[] {
  try {
    const stored = localStorage.getItem('roadmapItems');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRoadmap(items: RoadmapItem[]) {
  localStorage.setItem('roadmapItems', JSON.stringify(items));
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('dashboard');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [saleLogs, setSaleLogs] = useState<SaleLog[]>(INITIAL_SALE_LOGS);
  const [monthlyGoal, setMonthlyGoal] = useState(DEFAULT_MONTHLY_GOAL);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>(loadRoadmap);
  const [pendingTemplate, setPendingTemplate] = useState<Partial<Omit<Product, 'id'>> | null>(null);
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

  const handleSaveToRoadmap = useCallback((data: NewRoadmapData) => {
    setRoadmapItems(prev => {
      // Don't add duplicates
      if (data.sourceId && prev.some(r => r.sourceId === data.sourceId)) return prev;
      const newItem: RoadmapItem = {
        id: nextId(),
        ...data,
        status: 'idea',
        savedAt: new Date().toISOString().slice(0, 10),
      };
      const updated = [newItem, ...prev];
      saveRoadmap(updated);
      return updated;
    });
  }, []);

  const handleRemoveFromRoadmap = useCallback((id: string) => {
    setRoadmapItems(prev => {
      const updated = prev.filter(r => r.id !== id);
      saveRoadmap(updated);
      return updated;
    });
  }, []);

  const handleUpdateRoadmapStatus = useCallback((id: string, status: RoadmapStatus) => {
    setRoadmapItems(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, status } : r);
      saveRoadmap(updated);
      return updated;
    });
  }, []);

  const handleStartBuilding = useCallback((item: RoadmapItem) => {
    setPendingTemplate({
      name: item.name,
      category: item.category,
      platform: item.platform,
      price: item.price,
      unitsSold: 0,
      launchDate: new Date().toISOString().slice(0, 10),
      status: 'draft',
    });
    handleRemoveFromRoadmap(item.id);
    setActiveTab('products');
  }, [handleRemoveFromRoadmap]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
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
              roadmapItems={roadmapItems}
              onSaveToRoadmap={handleSaveToRoadmap}
              onNavigateToProducts={() => setActiveTab('products')}
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
              roadmapItems={roadmapItems}
              onSaveToRoadmap={handleSaveToRoadmap}
              onRemoveFromRoadmap={handleRemoveFromRoadmap}
              onUpdateRoadmapStatus={handleUpdateRoadmapStatus}
              onStartBuilding={handleStartBuilding}
              pendingTemplate={pendingTemplate}
              onClearPendingTemplate={() => setPendingTemplate(null)}
            />
          )}
          {activeTab === 'guide' && (
            <Guide
              ideas={GUIDE_IDEAS}
              roadmapItems={roadmapItems}
              onSaveToRoadmap={handleSaveToRoadmap}
              onRemoveFromRoadmap={handleRemoveFromRoadmap}
            />
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
