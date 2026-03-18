import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  PoundSterling, Package, Star, Download,
  BarChart2, TrendingUp, Zap, ArrowUp, Bookmark, BookmarkCheck, ArrowRight,
} from 'lucide-react';
import type { Product, SaleLog, ChartDataPoint, RoadmapItem, ProductSuggestion } from '../types';
import { formatCurrency, formatCurrencyFull, CATEGORY_LABELS, CATEGORY_COLORS, PLATFORM_COLORS } from '../utils';
import { SUGGESTED_PRODUCTS } from '../data/suggestionsData';

interface Props {
  products: Product[];
  saleLogs: SaleLog[];
  monthlyGoal: number;
  monthlyChartData: ChartDataPoint[];
  weeklyChartData: ChartDataPoint[];
  darkMode: boolean;
  roadmapItems: RoadmapItem[];
  onSaveToRoadmap: (data: {
    sourceId?: string;
    name: string;
    category: Product['category'];
    platform: Product['platform'];
    price: number;
    description: string;
  }) => void;
  onNavigateToProducts: () => void;
}

const TAG_META: Record<string, { label: string; bg: string }> = {
  trending: { label: '🔥 Trending', bg: 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300' },
  'high-demand': { label: '⭐ High Demand', bg: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300' },
  'quick-win': { label: '⚡ Quick Win', bg: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' },
  'beginner-friendly': { label: '🌱 Beginner', bg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' },
  evergreen: { label: '🍃 Evergreen', bg: 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300' },
};

function IdeaCard({
  suggestion,
  isSaved,
  onSave,
}: {
  suggestion: ProductSuggestion;
  isSaved: boolean;
  onSave: () => void;
}) {
  const primaryTag = suggestion.tags[0];
  const tagMeta = primaryTag ? TAG_META[primaryTag] : null;

  return (
    <div className="flex-shrink-0 w-52 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-3.5 shadow-sm">
      {tagMeta && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tagMeta.bg} mb-2 inline-block`}>
          {tagMeta.label}
        </span>
      )}
      <div className="flex flex-wrap gap-1 mb-2">
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[suggestion.category]}`}>
          {CATEGORY_LABELS[suggestion.category]}
        </span>
      </div>
      <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight mb-1">{suggestion.name}</p>
      <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed mb-2 line-clamp-2">{suggestion.description}</p>
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${PLATFORM_COLORS[suggestion.platform]}`}>
          {suggestion.platform}
        </span>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(suggestion.price)}</span>
      </div>
      <button
        onClick={onSave}
        className={`w-full mt-2.5 flex items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-semibold transition-all active:scale-95 ${
          isSaved
            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
            : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
        }`}
      >
        {isSaved
          ? <><BookmarkCheck size={12} /> Saved to Roadmap</>
          : <><Bookmark size={12} /> Save to Roadmap</>}
      </button>
    </div>
  );
}

function SummaryCard({
  label, value, sub, icon: Icon, color,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 min-w-[148px] flex-shrink-0">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon size={18} />
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{value}</p>
      {sub && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-tight">{sub}</p>}
    </div>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-xl px-3 py-2 shadow-lg">
      <p className="font-medium">{label}</p>
      <p className="text-indigo-300 font-bold">{formatCurrencyFull(payload[0].value)}</p>
    </div>
  );
}

export function Dashboard({
  products, saleLogs, monthlyGoal, monthlyChartData, weeklyChartData,
  darkMode, roadmapItems, onSaveToRoadmap, onNavigateToProducts,
}: Props) {
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('monthly');

  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.unitsSold, 0);
  const liveProducts = products.filter(p => p.status === 'live').length;
  const bestSeller = [...products].sort((a, b) => b.price * b.unitsSold - a.price * a.unitsSold)[0];

  const currentMonthStr = '2026-03';
  const downloadsThisMonth = saleLogs
    .filter(log => log.date.startsWith(currentMonthStr))
    .reduce((sum, log) => sum + log.units, 0);

  const revenueThisMonth = saleLogs
    .filter(log => log.date.startsWith(currentMonthStr))
    .reduce((sum, log) => {
      const product = products.find(p => p.id === log.productId);
      return sum + (product ? product.price * log.units : 0);
    }, 0);

  const goalProgress = Math.min((revenueThisMonth / monthlyGoal) * 100, 100);
  const avgPrice = products.length ? products.reduce((s, p) => s + p.price, 0) / products.length : 0;
  const revenuePerProduct = products.length ? totalRevenue / products.length : 0;
  const chartData = chartView === 'monthly' ? monthlyChartData : weeklyChartData;

  const axisColor = darkMode ? '#6b7280' : '#9ca3af';
  const gridColor = darkMode ? '#1f2937' : '#f0f0f0';

  // Featured suggestions for "Ideas for You" — trending + high-demand
  const featuredSuggestions = SUGGESTED_PRODUCTS.filter(s =>
    s.tags.includes('trending') || s.tags.includes('high-demand')
  ).slice(0, 8);

  const isSaved = (id: string) => roadmapItems.some(r => r.sourceId === id);

  return (
    <div className="px-4 pt-4 pb-6 space-y-5">
      {/* Header */}
      <div>
        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide">March 2026</p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Creator Dashboard</h1>
      </div>

      {/* Monthly Goal Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-indigo-200 text-xs font-medium">Monthly Goal</p>
            <p className="font-bold text-lg">
              {formatCurrency(revenueThisMonth)}
              <span className="text-indigo-300 font-normal text-sm"> / {formatCurrency(monthlyGoal)}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{Math.round(goalProgress)}%</p>
            <p className="text-indigo-200 text-xs">complete</p>
          </div>
        </div>
        <div className="bg-indigo-500/40 rounded-full h-2">
          <div className="bg-white rounded-full h-2 transition-all duration-700" style={{ width: `${goalProgress}%` }} />
        </div>
      </div>

      {/* ── IDEAS FOR YOU ─────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">Ideas for You</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Trending & high-demand right now — save any to your roadmap</p>
          </div>
          <button
            onClick={onNavigateToProducts}
            className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            All ideas
            <ArrowRight size={12} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {featuredSuggestions.map(s => (
            <IdeaCard
              key={s.id}
              suggestion={s}
              isSaved={isSaved(s.id)}
              onSave={() => !isSaved(s.id) && onSaveToRoadmap({
                sourceId: s.id,
                name: s.name,
                category: s.category,
                platform: s.platform,
                price: s.price,
                description: s.description,
              })}
            />
          ))}
        </div>
      </div>

      {/* Roadmap snapshot (if has items) */}
      {roadmapItems.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <BookmarkCheck size={15} className="text-indigo-500 dark:text-indigo-400" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Your Roadmap</p>
              <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-full">
                {roadmapItems.length}
              </span>
            </div>
            <button onClick={onNavigateToProducts}
              className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1">
              View all <ArrowRight size={11} />
            </button>
          </div>
          {roadmapItems.slice(0, 3).map((item, i, arr) => (
            <div key={item.id}
              className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{CATEGORY_LABELS[item.category]} · {formatCurrency(item.price)}</p>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                item.status === 'idea' ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' :
                item.status === 'planning' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
                item.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' :
                'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
              }`}>
                {item.status === 'idea' ? '💡 Idea' :
                 item.status === 'planning' ? '📋 Planning' :
                 item.status === 'in-progress' ? '🛠 Building' : '🚀 Ready'}
              </span>
            </div>
          ))}
          {roadmapItems.length > 3 && (
            <button onClick={onNavigateToProducts}
              className="w-full py-2.5 text-xs text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border-t border-gray-50 dark:border-gray-800">
              +{roadmapItems.length - 3} more in your roadmap →
            </button>
          )}
        </div>
      )}

      {/* Summary Cards */}
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Overview</p>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          <SummaryCard label="Total Revenue" value={formatCurrency(totalRevenue)} sub="All time"
            icon={PoundSterling} color="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400" />
          <SummaryCard label="Products Listed" value={String(liveProducts)} sub={`${products.length} total`}
            icon={Package} color="bg-violet-50 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400" />
          <SummaryCard
            label="Best Seller"
            value={bestSeller ? CATEGORY_LABELS[bestSeller.category] : '—'}
            sub={bestSeller ? bestSeller.name.slice(0, 18) + (bestSeller.name.length > 18 ? '…' : '') : 'No products yet'}
            icon={Star} color="bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400" />
          <SummaryCard label="Downloads" value={String(downloadsThisMonth)} sub="This month"
            icon={Download} color="bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart2 size={16} className="text-indigo-600 dark:text-indigo-400" />
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Revenue</p>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 gap-0.5">
            {(['weekly', 'monthly'] as const).map(v => (
              <button key={v} onClick={() => setChartView(v)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                  chartView === v
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={darkMode ? 0.4 : 0.25} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false}
              tickFormatter={v => `£${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={2.5}
              fill="url(#revenueGrad)" dot={false}
              activeDot={{ r: 5, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats */}
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Stats</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-indigo-500 dark:text-indigo-400" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg. Price</p>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrencyFull(avgPrice)}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">per product</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <PoundSterling size={14} className="text-violet-500 dark:text-violet-400" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Rev / Product</p>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(revenuePerProduct)}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">average</p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-amber-500" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Conversion Trend</p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(revenueThisMonth)}</p>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                <ArrowUp size={10} />
                {Math.round(goalProgress)}%
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">logged this month towards goal</p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mt-2">
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full h-1.5 transition-all duration-700"
                style={{ width: `${goalProgress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Top Products by Revenue</p>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          {products.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <p className="text-xs text-gray-400 dark:text-gray-500">Add products to see your leaderboard here.</p>
            </div>
          ) : (
            [...products]
              .filter(p => p.status === 'live')
              .sort((a, b) => b.price * b.unitsSold - a.price * a.unitsSold)
              .slice(0, 5)
              .map((product, i, arr) => {
                const rev = product.price * product.unitsSold;
                const maxRev = arr.reduce((m, p) => Math.max(m, p.price * p.unitsSold), 1);
                return (
                  <div key={product.id}
                    className={`px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-50 dark:border-gray-800' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-bold w-4 shrink-0">#{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{product.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 flex-1">
                            <div className="bg-indigo-500 rounded-full h-1.5"
                              style={{ width: `${maxRev > 0 ? (rev / maxRev) * 100 : 0}%` }} />
                          </div>
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 shrink-0">{formatCurrency(rev)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
}
