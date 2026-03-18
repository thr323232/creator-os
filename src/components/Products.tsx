import { useState, useMemo } from 'react';
import {
  Plus, Edit2, Trash2, Target, Filter, Package,
  ChevronDown, X, Check, PlusCircle,
} from 'lucide-react';
import type { Product, SaleLog, Category, PlatformName, ProductStatus } from '../types';
import {
  formatCurrency, CATEGORY_LABELS, CATEGORY_COLORS,
  PLATFORM_COLORS, STATUS_COLORS, ALL_CATEGORIES,
  ALL_PLATFORMS, ALL_STATUSES,
} from '../utils';

interface Props {
  products: Product[];
  saleLogs: SaleLog[];
  monthlyGoal: number;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onLogSale: (productId: string, units: number, date: string) => void;
  onSetGoal: (goal: number) => void;
}

const SORT_OPTIONS = [
  { value: 'revenue-desc', label: 'Revenue: High → Low' },
  { value: 'revenue-asc', label: 'Revenue: Low → High' },
  { value: 'units-desc', label: 'Units Sold: Most' },
  { value: 'price-desc', label: 'Price: Highest' },
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
];

const EMPTY_FORM: Omit<Product, 'id'> = {
  name: '',
  category: 'template',
  platform: 'Etsy',
  price: 0,
  unitsSold: 0,
  launchDate: new Date().toISOString().slice(0, 10),
  status: 'live',
};

function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}

function GoalProgress({ goal, currentRevenue, onSetGoal }: {
  goal: number;
  currentRevenue: number;
  onSetGoal: (g: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(String(goal));
  const progress = Math.min((currentRevenue / goal) * 100, 100);

  const handleSave = () => {
    const parsed = parseFloat(tempGoal);
    if (!isNaN(parsed) && parsed > 0) onSetGoal(parsed);
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target size={16} className="text-indigo-600" />
          <p className="text-sm font-semibold text-gray-900">March Goal</p>
        </div>
        {editing ? (
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input
                type="number"
                value={tempGoal}
                onChange={e => setTempGoal(e.target.value)}
                className="w-24 border border-gray-200 rounded-lg pl-5 pr-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
            </div>
            <button onClick={handleSave} className="bg-indigo-600 text-white rounded-lg p-1">
              <Check size={14} />
            </button>
            <button onClick={() => setEditing(false)} className="text-gray-400 rounded-lg p-1">
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => { setTempGoal(String(goal)); setEditing(true); }}
            className="text-xs text-indigo-600 font-medium hover:text-indigo-700"
          >
            Edit goal
          </button>
        )}
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-xl font-bold text-gray-900">{formatCurrency(currentRevenue)}</span>
        <span className="text-sm text-gray-400">/ {formatCurrency(goal)}</span>
        <span className="ml-auto text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
      </div>
      <div className="bg-gray-100 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-700 ${progress >= 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-violet-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {progress >= 100 && (
        <p className="text-xs text-emerald-600 font-semibold mt-1.5">🎉 Goal reached! Time to raise the bar.</p>
      )}
    </div>
  );
}

function ProductForm({
  initial,
  onSave,
  onClose,
  title,
}: {
  initial: Omit<Product, 'id'> & { id?: string };
  onSave: (data: Omit<Product, 'id'>) => void;
  onClose: () => void;
  title: string;
}) {
  const [form, setForm] = useState(initial);

  const set = <K extends keyof typeof form>(key: K, val: typeof form[K]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[75vh] p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="e.g. Canva Social Media Bundle"
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value as Category)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {ALL_CATEGORIES.map(c => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Platform</label>
              <select
                value={form.platform}
                onChange={e => set('platform', e.target.value as PlatformName)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {ALL_PLATFORMS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Price ($)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.price}
                onChange={e => set('price', parseFloat(e.target.value) || 0)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Units Sold</label>
              <input
                type="number"
                min={0}
                value={form.unitsSold}
                onChange={e => set('unitsSold', parseInt(e.target.value) || 0)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Launch Date</label>
              <input
                type="date"
                value={form.launchDate}
                onChange={e => set('launchDate', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={e => set('status', e.target.value as ProductStatus)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                {ALL_STATUSES.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold text-sm hover:bg-indigo-700 active:scale-[0.98] transition-all"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}

function LogSaleModal({
  product,
  onLog,
  onClose,
}: {
  product: Product;
  onLog: (units: number, date: string) => void;
  onClose: () => void;
}) {
  const [units, setUnits] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Log a Sale</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500">Product</p>
            <p className="text-sm font-semibold text-gray-900">{product.name}</p>
            <p className="text-xs text-indigo-600 font-medium">{formatCurrency(product.price)} each</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Units Sold</label>
            <input
              type="number"
              min={1}
              value={units}
              onChange={e => setUnits(parseInt(e.target.value) || 1)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Date</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="bg-indigo-50 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs text-indigo-700 font-medium">Revenue from this sale</span>
            <span className="text-sm font-bold text-indigo-700">{formatCurrency(units * product.price)}</span>
          </div>
          <button
            onClick={() => { onLog(units, date); onClose(); }}
            className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold text-sm hover:bg-indigo-700 active:scale-[0.98] transition-all"
          >
            Log Sale
          </button>
        </div>
      </div>
    </div>
  );
}

export function Products({
  products,
  saleLogs,
  monthlyGoal,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onLogSale,
  onSetGoal,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loggingProduct, setLoggingProduct] = useState<Product | null>(null);
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [filterPlatform, setFilterPlatform] = useState<PlatformName | 'all'>('all');
  const [sortBy, setSortBy] = useState('revenue-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const currentMonthStr = '2026-03';
  const revenueThisMonth = saleLogs
    .filter(l => l.date.startsWith(currentMonthStr))
    .reduce((sum, l) => {
      const p = products.find(pr => pr.id === l.productId);
      return sum + (p ? p.price * l.units : 0);
    }, 0);

  const filteredSorted = useMemo(() => {
    let list = [...products];
    if (filterCategory !== 'all') list = list.filter(p => p.category === filterCategory);
    if (filterPlatform !== 'all') list = list.filter(p => p.platform === filterPlatform);
    list.sort((a, b) => {
      switch (sortBy) {
        case 'revenue-desc': return b.price * b.unitsSold - a.price * a.unitsSold;
        case 'revenue-asc': return a.price * a.unitsSold - b.price * b.unitsSold;
        case 'units-desc': return b.unitsSold - a.unitsSold;
        case 'price-desc': return b.price - a.price;
        case 'date-desc': return new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime();
        case 'date-asc': return new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime();
        default: return 0;
      }
    });
    return list;
  }, [products, filterCategory, filterPlatform, sortBy]);

  const activeFilters = (filterCategory !== 'all' ? 1 : 0) + (filterPlatform !== 'all' ? 1 : 0);

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-xs text-gray-400">{products.length} total · {products.filter(p => p.status === 'live').length} live</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-indigo-600 text-white rounded-xl px-3.5 py-2.5 text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-sm shadow-indigo-200"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Monthly Goal */}
      <GoalProgress goal={monthlyGoal} currentRevenue={revenueThisMonth} onSetGoal={onSetGoal} />

      {/* Filter / Sort Bar */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
            activeFilters > 0
              ? 'border-indigo-300 bg-indigo-50 text-indigo-700'
              : 'border-gray-200 bg-white text-gray-600'
          }`}
        >
          <Filter size={13} />
          Filters
          {activeFilters > 0 && (
            <span className="bg-indigo-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {activeFilters}
            </span>
          )}
        </button>
        <div className="relative flex-1">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="w-full border border-gray-200 bg-white rounded-xl pl-3 pr-7 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none text-gray-700"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3 shadow-sm">
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Category</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setFilterCategory('all')}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${filterCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >All</button>
              {ALL_CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setFilterCategory(c)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${filterCategory === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >{CATEGORY_LABELS[c]}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Platform</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setFilterPlatform('all')}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${filterPlatform === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >All</button>
              {ALL_PLATFORMS.map(p => (
                <button
                  key={p}
                  onClick={() => setFilterPlatform(p)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${filterPlatform === p ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >{p}</button>
              ))}
            </div>
          </div>
          {activeFilters > 0 && (
            <button
              onClick={() => { setFilterCategory('all'); setFilterPlatform('all'); }}
              className="text-xs text-red-500 font-medium hover:text-red-700"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Product Count */}
      <p className="text-xs text-gray-500">
        Showing {filteredSorted.length} of {products.length} products
      </p>

      {/* Product Cards */}
      <div className="space-y-3">
        {filteredSorted.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
            <Package size={32} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No products found.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 text-sm text-indigo-600 font-medium hover:text-indigo-700"
            >
              + Add your first product
            </button>
          </div>
        )}
        {filteredSorted.map(product => {
          const revenue = product.price * product.unitsSold;
          const isDeleting = deletingId === product.id;
          return (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-tight">{product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Launched {new Date(product.launchDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <Badge label={product.status.charAt(0).toUpperCase() + product.status.slice(1)} className={STATUS_COLORS[product.status]} />
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <Badge label={CATEGORY_LABELS[product.category]} className={CATEGORY_COLORS[product.category]} />
                <Badge label={product.platform} className={PLATFORM_COLORS[product.platform]} />
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-sm font-bold text-gray-900">{formatCurrency(product.price)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                  <p className="text-xs text-gray-500">Sold</p>
                  <p className="text-sm font-bold text-gray-900">{product.unitsSold.toLocaleString()}</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-2.5 text-center">
                  <p className="text-xs text-indigo-500">Revenue</p>
                  <p className="text-sm font-bold text-indigo-700">{formatCurrency(revenue)}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setLoggingProduct(product)}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-indigo-200 text-indigo-600 rounded-xl py-2 text-xs font-semibold hover:bg-indigo-50 active:scale-95 transition-all"
                >
                  <PlusCircle size={13} />
                  Log Sale
                </button>
                <button
                  onClick={() => setEditingProduct(product)}
                  className="flex items-center justify-center w-9 h-9 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
                >
                  <Edit2 size={14} />
                </button>
                {isDeleting ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => { onDeleteProduct(product.id); setDeletingId(null); }}
                      className="flex items-center justify-center w-9 h-9 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 active:scale-95 transition-all"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => setDeletingId(null)}
                      className="flex items-center justify-center w-9 h-9 border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeletingId(product.id)}
                    className="flex items-center justify-center w-9 h-9 border border-gray-200 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-200 active:scale-95 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      {showForm && (
        <ProductForm
          initial={EMPTY_FORM}
          onSave={onAddProduct}
          onClose={() => setShowForm(false)}
          title="Add New Product"
        />
      )}
      {editingProduct && (
        <ProductForm
          initial={editingProduct}
          onSave={data => onEditProduct({ ...data, id: editingProduct.id })}
          onClose={() => setEditingProduct(null)}
          title="Edit Product"
        />
      )}
      {loggingProduct && (
        <LogSaleModal
          product={loggingProduct}
          onLog={(units, date) => onLogSale(loggingProduct.id, units, date)}
          onClose={() => setLoggingProduct(null)}
        />
      )}
    </div>
  );
}
