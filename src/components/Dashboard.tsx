import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';
import {
  DollarSign, Package, TrendingUp, Download,
  BarChart2, Star, Zap, ArrowUp,
} from 'lucide-react';
import type { Product, SaleLog, ChartDataPoint } from '../types';
import { formatCurrency, formatCurrencyFull, CATEGORY_LABELS } from '../utils';

interface Props {
  products: Product[];
  saleLogs: SaleLog[];
  monthlyGoal: number;
  monthlyChartData: ChartDataPoint[];
  weeklyChartData: ChartDataPoint[];
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
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 min-w-[148px] flex-shrink-0">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon size={18} />
      </div>
      <p className="text-xs text-gray-500 font-medium mb-0.5">{label}</p>
      <p className="text-xl font-bold text-gray-900 leading-tight">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5 leading-tight">{sub}</p>}
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
    <div className="bg-gray-900 text-white text-xs rounded-xl px-3 py-2 shadow-lg">
      <p className="font-medium">{label}</p>
      <p className="text-indigo-300 font-bold">{formatCurrencyFull(payload[0].value)}</p>
    </div>
  );
}

export function Dashboard({ products, saleLogs, monthlyGoal, monthlyChartData, weeklyChartData }: Props) {
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

  const avgPrice = products.length
    ? products.reduce((s, p) => s + p.price, 0) / products.length
    : 0;

  const revenuePerProduct = products.length ? totalRevenue / products.length : 0;

  const chartData = chartView === 'monthly' ? monthlyChartData : weeklyChartData;

  return (
    <div className="px-4 pt-4 pb-6 space-y-5">
      {/* Header */}
      <div>
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">March 2026</p>
        <h1 className="text-2xl font-bold text-gray-900">Your Creator Dashboard</h1>
      </div>

      {/* Monthly Goal Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-indigo-200 text-xs font-medium">Monthly Goal</p>
            <p className="font-bold text-lg">
              {formatCurrency(revenueThisMonth)} <span className="text-indigo-300 font-normal text-sm">/ {formatCurrency(monthlyGoal)}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{Math.round(goalProgress)}%</p>
            <p className="text-indigo-200 text-xs">complete</p>
          </div>
        </div>
        <div className="bg-indigo-500/40 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-700"
            style={{ width: `${goalProgress}%` }}
          />
        </div>
      </div>

      {/* Summary Cards (horizontal scroll) */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Overview</p>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
          <SummaryCard
            label="Total Revenue"
            value={formatCurrency(totalRevenue)}
            sub="All time"
            icon={DollarSign}
            color="bg-indigo-50 text-indigo-600"
          />
          <SummaryCard
            label="Products Listed"
            value={String(liveProducts)}
            sub={`${products.length} total`}
            icon={Package}
            color="bg-violet-50 text-violet-600"
          />
          <SummaryCard
            label="Best Seller"
            value={bestSeller ? CATEGORY_LABELS[bestSeller.category] : '—'}
            sub={bestSeller ? bestSeller.name.slice(0, 18) + (bestSeller.name.length > 18 ? '…' : '') : ''}
            icon={Star}
            color="bg-amber-50 text-amber-600"
          />
          <SummaryCard
            label="Downloads"
            value={String(downloadsThisMonth)}
            sub="This month"
            icon={Download}
            color="bg-emerald-50 text-emerald-600"
          />
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart2 size={16} className="text-indigo-600" />
            <p className="text-sm font-semibold text-gray-900">Revenue</p>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
            <button
              onClick={() => setChartView('weekly')}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                chartView === 'weekly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setChartView('monthly')}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                chartView === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
              dot={false}
              activeDot={{ r: 5, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Stats */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-indigo-500" />
              <p className="text-xs text-gray-500">Avg. Price</p>
            </div>
            <p className="text-xl font-bold text-gray-900">{formatCurrencyFull(avgPrice)}</p>
            <p className="text-xs text-gray-400 mt-0.5">per product</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={14} className="text-violet-500" />
              <p className="text-xs text-gray-500">Rev / Product</p>
            </div>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(revenuePerProduct)}</p>
            <p className="text-xs text-gray-400 mt-0.5">average</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-amber-500" />
              <p className="text-xs text-gray-500">Conversion Trend</p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-gray-900">{formatCurrency(revenueThisMonth)}</p>
              <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <ArrowUp size={10} />
                {Math.round(goalProgress)}%
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">logged this month towards goal</p>
            <div className="bg-gray-100 rounded-full h-1.5 mt-2">
              <div
                className="bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full h-1.5 transition-all duration-700"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Top Products by Revenue</p>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {[...products]
            .filter(p => p.status === 'live')
            .sort((a, b) => b.price * b.unitsSold - a.price * a.unitsSold)
            .slice(0, 5)
            .map((product, i) => {
              const rev = product.price * product.unitsSold;
              const maxRev = products.reduce((m, p) => Math.max(m, p.price * p.unitsSold), 0);
              return (
                <div key={product.id} className={`px-4 py-3 ${i < 4 ? 'border-b border-gray-50' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-bold w-4 shrink-0">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="bg-gray-100 rounded-full h-1.5 flex-1">
                          <div
                            className="bg-indigo-500 rounded-full h-1.5"
                            style={{ width: `${(rev / maxRev) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-700 shrink-0">{formatCurrency(rev)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
