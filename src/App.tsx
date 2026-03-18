import { useState, useCallback } from 'react';
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
    <div className="min-h-screen bg-gray-50">
      {/* Tab content — padded at bottom for fixed nav */}
      <main className="max-w-2xl mx-auto pb-20">
        <div
          className="transition-opacity duration-150"
          key={activeTab}
        >
          {activeTab === 'dashboard' && (
            <Dashboard
              products={products}
              saleLogs={saleLogs}
              monthlyGoal={monthlyGoal}
              monthlyChartData={MONTHLY_CHART_DATA}
              weeklyChartData={WEEKLY_CHART_DATA}
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
