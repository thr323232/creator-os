import { useState, useMemo, useEffect } from 'react';
import {
  Plus, Edit2, Trash2, Target, Filter, Package,
  ChevronDown, ChevronUp, X, Check, Copy, PlusCircle, ArrowRight, Sparkles,
  Bookmark, BookmarkCheck, MapPin, ChevronRight, CheckCircle2, Circle,
  Star, MessageSquare, Lightbulb,
} from 'lucide-react';
import type {
  Product, SaleLog, Category, PlatformName, ProductStatus,
  ProductSuggestion, RoadmapItem, RoadmapStatus,
} from '../types';
import {
  formatCurrency, CATEGORY_LABELS, CATEGORY_COLORS,
  PLATFORM_COLORS, STATUS_COLORS, ALL_CATEGORIES,
  ALL_PLATFORMS, ALL_STATUSES, getSeoTitleSuggestions,
} from '../utils';
import { SUGGESTED_PRODUCTS } from '../data/suggestionsData';
import { HOOK_BANK, HASHTAG_SETS } from '../data/contentData';
import { PRICING_TIPS, SEO_TIPS } from '../data/resourceData';

interface NewRoadmapData {
  sourceId?: string;
  name: string;
  category: Category;
  platform: PlatformName;
  price: number;
  description: string;
  checklist?: { id: string; text: string; done: boolean }[];
}

interface Props {
  products: Product[];
  saleLogs: SaleLog[];
  monthlyGoal: number;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onLogSale: (productId: string, units: number, date: string) => void;
  onSetGoal: (goal: number) => void;
  roadmapItems: RoadmapItem[];
  onSaveToRoadmap: (data: NewRoadmapData) => void;
  onRemoveFromRoadmap: (id: string) => void;
  onUpdateRoadmapStatus: (id: string, status: RoadmapStatus) => void;
  onStartBuilding: (item: RoadmapItem) => void;
  onToggleChecklistItem: (roadmapId: string, checklistItemId: string) => void;
  onAddReview: (productId: string, data: { rating: number; quote?: string }) => void;
  onDeleteReview: (productId: string, reviewId: string) => void;
  pendingTemplate: Partial<Omit<Product, 'id'>> | null;
  onClearPendingTemplate: () => void;
}

const SORT_OPTIONS = [
  { value: 'revenue-desc', label: 'Revenue: High → Low' },
  { value: 'revenue-asc', label: 'Revenue: Low → High' },
  { value: 'units-desc', label: 'Units Sold: Most' },
  { value: 'price-desc', label: 'Price: Highest' },
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
];

const ROADMAP_STATUSES: { value: RoadmapStatus; label: string; emoji: string; color: string }[] = [
  { value: 'idea', label: 'Idea', emoji: '💡', color: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' },
  { value: 'planning', label: 'Planning', emoji: '📋', color: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' },
  { value: 'in-progress', label: 'Building', emoji: '🛠', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' },
  { value: 'ready-to-launch', label: 'Ready', emoji: '🚀', color: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' },
];

const TAG_LABELS: Record<string, string> = {
  'all': 'All',
  'trending': '🔥 Trending',
  'high-demand': '⭐ High Demand',
  'quick-win': '⚡ Quick Win',
  'beginner-friendly': '🌱 Beginner',
  'evergreen': '🍃 Evergreen',
};

const EMPTY_FORM: Omit<Product, 'id'> = {
  name: '',
  category: 'template',
  platform: 'Etsy',
  price: 0,
  unitsSold: 0,
  launchDate: new Date().toISOString().slice(0, 10),
  status: 'draft',
};

const SUGGESTION_CATEGORIES = ['all', ...new Set(SUGGESTED_PRODUCTS.map(s => s.category))] as (Category | 'all')[];

function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}

function GoalProgress({ goal, currentRevenue, onSetGoal }: {
  goal: number; currentRevenue: number; onSetGoal: (g: number) => void;
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
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target size={16} className="text-indigo-600 dark:text-indigo-400" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">March Goal</p>
        </div>
        {editing ? (
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">£</span>
              <input type="number" value={tempGoal} onChange={e => setTempGoal(e.target.value)}
                className="w-24 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg pl-5 pr-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" autoFocus />
            </div>
            <button onClick={handleSave} className="bg-indigo-600 text-white rounded-lg p-1"><Check size={14} /></button>
            <button onClick={() => setEditing(false)} className="text-gray-400 rounded-lg p-1"><X size={14} /></button>
          </div>
        ) : (
          <button onClick={() => { setTempGoal(String(goal)); setEditing(true); }}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700">Edit goal</button>
        )}
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(currentRevenue)}</span>
        <span className="text-sm text-gray-400 dark:text-gray-500">/ {formatCurrency(goal)}</span>
        <span className="ml-auto text-sm font-bold text-indigo-600 dark:text-indigo-400">{Math.round(progress)}%</span>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full transition-all duration-700 ${progress >= 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-violet-500'}`}
          style={{ width: `${progress}%` }} />
      </div>
      {progress >= 100 && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">🎉 Goal reached! Time to raise the bar.</p>
      )}
    </div>
  );
}

// ── ROADMAP ITEM CHECKLIST ──────────────────────────────────────────────────────
function RoadmapChecklist({ item, onToggle }: {
  item: RoadmapItem;
  onToggle: (checklistItemId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const checklist = item.checklist;

  if (!checklist || checklist.length === 0) {
    return (
      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500">
        <Lightbulb size={11} />
        <span>Save this idea via the Guide tab to get a step-by-step launch plan.</span>
      </div>
    );
  }

  const doneCount = checklist.filter(c => c.done).length;
  const total = checklist.length;
  const pct = Math.round((doneCount / total) * 100);

  return (
    <div className="mt-2.5">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
      >
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        Steps ({doneCount}/{total})
        <span className="text-gray-400 dark:text-gray-500 font-normal">{pct}% done</span>
      </button>

      {open && (
        <div className="mt-2 space-y-1">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-2">
            <div className="bg-indigo-500 rounded-full h-1.5 transition-all duration-500"
              style={{ width: `${pct}%` }} />
          </div>
          {checklist.map(ci => (
            <button
              key={ci.id}
              onClick={() => onToggle(ci.id)}
              className="w-full flex items-start gap-2 text-left py-1 group"
            >
              {ci.done
                ? <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                : <Circle size={14} className="text-gray-300 dark:text-gray-600 flex-shrink-0 mt-0.5 group-hover:text-indigo-400" />}
              <span className={`text-xs leading-relaxed ${ci.done ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                {ci.text}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── STATUS PROGRESS BAR ─────────────────────────────────────────────────────────
function StatusProgressBar({ status }: { status: RoadmapStatus }) {
  const steps = ROADMAP_STATUSES;
  const currentIdx = steps.findIndex(s => s.value === status);
  return (
    <div className="flex items-center gap-1 mt-2">
      {steps.map((s, i) => (
        <div key={s.value} className="flex items-center gap-1 flex-1">
          <div className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-semibold flex-1 justify-center transition-all ${
            i === currentIdx
              ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
              : i < currentIdx
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
          }`}>
            <span>{s.emoji}</span>
            <span className="hidden xs:inline ml-0.5">{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-0.5 w-2 flex-shrink-0 rounded-full ${i < currentIdx ? 'bg-emerald-400' : 'bg-gray-200 dark:bg-gray-700'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── ROADMAP SECTION ────────────────────────────────────────────────────────────
function RoadmapSection({ items, onRemove, onUpdateStatus, onStartBuilding, onToggleChecklistItem }: {
  items: RoadmapItem[];
  onRemove: (id: string) => void;
  onUpdateStatus: (id: string, status: RoadmapStatus) => void;
  onStartBuilding: (item: RoadmapItem) => void;
  onToggleChecklistItem: (roadmapId: string, checklistItemId: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const [filter, setFilter] = useState<RoadmapStatus | 'all'>('all');
  const [statusMenuOpen, setStatusMenuOpen] = useState<string | null>(null);

  const filtered = filter === 'all' ? items : items.filter(i => i.status === filter);

  const statusMeta = (status: RoadmapStatus) =>
    ROADMAP_STATUSES.find(s => s.value === status)!;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-800/50 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-indigo-600 dark:text-indigo-400" />
          <p className="text-sm font-bold text-gray-900 dark:text-white">My Roadmap</p>
          <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-full">
            {items.length}
          </span>
        </div>
        {open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
      </button>

      {open && (
        <div className="border-t border-indigo-50 dark:border-indigo-800/50">
          {/* Journey banner */}
          <div className="px-4 pt-3 pb-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              {[{ emoji: '💡', label: 'Idea' }, { emoji: '📋', label: 'Plan' }, { emoji: '🛠', label: 'Build' }, { emoji: '🚀', label: 'Live' }].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-1">
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{step.emoji} {step.label}</span>
                  {i < arr.length - 1 && <span className="text-gray-300 dark:text-gray-600 text-[10px]">→</span>}
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">Ideas you're planning to build. Tap "Start Building" to create the product listing.</p>
          </div>

          {/* Status filter tabs */}
          <div className="flex gap-1.5 px-4 py-2.5 overflow-x-auto scrollbar-hide">
            <button onClick={() => setFilter('all')}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              All ({items.length})
            </button>
            {ROADMAP_STATUSES.map(s => {
              const count = items.filter(i => i.status === s.value).length;
              if (count === 0) return null;
              return (
                <button key={s.value} onClick={() => setFilter(s.value)}
                  className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filter === s.value ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                  {s.emoji} {s.label} ({count})
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <p className="px-4 pb-4 text-xs text-gray-400 dark:text-gray-500">No items with this status.</p>
          ) : (
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map(item => {
                const meta = statusMeta(item.status);
                const doneCount = item.checklist?.filter(c => c.done).length ?? 0;
                const totalSteps = item.checklist?.length ?? 0;
                return (
                  <div key={item.id} className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <Badge label={CATEGORY_LABELS[item.category]} className={CATEGORY_COLORS[item.category]} />
                          <Badge label={item.platform} className={PLATFORM_COLORS[item.platform]} />
                          {totalSteps > 0 && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-full">
                              {doneCount}/{totalSteps} steps
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{item.name}</p>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">{formatCurrency(item.price)}</p>
                      </div>
                      <button onClick={() => onRemove(item.id)}
                        className="flex-shrink-0 text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors p-0.5">
                        <X size={14} />
                      </button>
                    </div>

                    {/* 4-step status progress bar */}
                    <StatusProgressBar status={item.status} />

                    {/* Status + Start Building */}
                    <div className="flex items-center gap-2 mt-2.5">
                      <div className="relative">
                        <button onClick={() => setStatusMenuOpen(statusMenuOpen === item.id ? null : item.id)}
                          className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all ${meta.color}`}>
                          {meta.emoji} {meta.label}
                          <ChevronDown size={10} />
                        </button>
                        {statusMenuOpen === item.id && (
                          <div className="absolute top-full left-0 mt-1 z-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden min-w-[140px]">
                            {ROADMAP_STATUSES.map(s => (
                              <button key={s.value}
                                onClick={() => { onUpdateStatus(item.id, s.value); setStatusMenuOpen(null); }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${item.status === s.value ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                                {s.emoji} {s.label}
                                {item.status === s.value && <Check size={10} className="ml-auto" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <button onClick={() => onStartBuilding(item)}
                        className="flex flex-col items-center gap-0 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 px-3 py-2 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 active:scale-95 transition-all">
                        <span className="flex items-center gap-1 text-[11px] font-semibold">Start Building <ArrowRight size={10} /></span>
                        <span className="text-[9px] text-indigo-400 dark:text-indigo-500 font-normal">Opens product form</span>
                      </button>
                    </div>

                    {/* Per-item checklist */}
                    <RoadmapChecklist
                      item={item}
                      onToggle={checklistItemId => onToggleChecklistItem(item.id, checklistItemId)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── INSPIRATION BOARD ──────────────────────────────────────────────────────────
function InspirationBoard({ roadmapItems, onSaveToRoadmap, onUseTemplate, defaultOpen }: {
  roadmapItems: RoadmapItem[];
  onSaveToRoadmap: (data: NewRoadmapData) => void;
  onUseTemplate: (s: ProductSuggestion) => void;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return SUGGESTED_PRODUCTS.filter(s => {
      if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
      if (tagFilter !== 'all' && !s.tags.includes(tagFilter as ProductSuggestion['tags'][number])) return false;
      return true;
    });
  }, [categoryFilter, tagFilter]);

  const isSaved = (id: string) => roadmapItems.some(r => r.sourceId === id);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-amber-500" />
          <p className="text-sm font-bold text-gray-900 dark:text-white">Inspiration Board</p>
          <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded-full">
            {SUGGESTED_PRODUCTS.length} ideas
          </span>
        </div>
        {open ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
      </button>

      {open && (
        <div className="border-t border-gray-50 dark:border-gray-800">
          <div className="px-4 pt-3 pb-1">
            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Category</p>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
              {SUGGESTION_CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategoryFilter(cat)}
                  className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  {cat === 'all' ? `All (${SUGGESTED_PRODUCTS.length})` : CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 pt-1 pb-3">
            <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Filter by</p>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
              {Object.entries(TAG_LABELS).map(([key, label]) => (
                <button key={key} onClick={() => setTagFilter(key)}
                  className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                    tagFilter === key
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="px-3 pb-1">
            <p className="text-xs text-gray-400 dark:text-gray-500 px-1 mb-2">
              {filtered.length} idea{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="px-3 pb-4 space-y-2.5">
            {filtered.map(s => {
              const saved = isSaved(s.id);
              return (
                <div key={s.id}
                  className="border border-dashed border-indigo-200 dark:border-indigo-800 rounded-xl p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1 mb-1.5">
                        <Badge label={CATEGORY_LABELS[s.category]} className={CATEGORY_COLORS[s.category]} />
                        <Badge label={s.platform} className={PLATFORM_COLORS[s.platform]} />
                        {s.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded-full">
                            {TAG_LABELS[tag]}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{s.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{s.description}</p>
                      <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1.5">Suggested: {formatCurrency(s.price)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => !saved && onSaveToRoadmap({ sourceId: s.id, name: s.name, category: s.category, platform: s.platform, price: s.price, description: s.description })}
                      className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-semibold transition-all active:scale-95 ${
                        saved
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
                      }`}
                    >
                      {saved ? <><BookmarkCheck size={11} /> Saved to plan</> : <><Bookmark size={11} /> Plan for later</>}
                    </button>
                    <button onClick={() => onUseTemplate(s)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 text-white rounded-xl py-3 text-xs font-semibold hover:bg-indigo-700 active:scale-95 transition-all">
                      Start building now <ChevronRight size={11} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── SEO TITLE SUGGESTIONS ───────────────────────────────────────────────────────
function SeoSuggestions({ name, category, platform, onUseTitle }: {
  name: string; category: Category; platform: PlatformName; onUseTitle: (t: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const suggestions = getSeoTitleSuggestions(name, category, platform);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="mt-1">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
      >
        <Sparkles size={12} />
        SEO title ideas
        {open ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          {suggestions.map((s, i) => (
            <div key={i} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-2.5 flex items-start gap-2">
              <p className="flex-1 text-xs text-indigo-800 dark:text-indigo-200 leading-relaxed">{s}</p>
              <div className="flex gap-1 flex-shrink-0">
                <button type="button" onClick={() => handleCopy(s)}
                  className="text-[10px] bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded-lg font-medium">
                  {copied === s ? '✓' : 'Copy'}
                </button>
                <button type="button" onClick={() => onUseTitle(s)}
                  className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.5 rounded-lg font-medium">
                  Use
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── PRODUCT FORM ───────────────────────────────────────────────────────────────
function ProductForm({
  initial, onSave, onClose, title,
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

  const inputClass = 'w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 dark:placeholder:text-gray-500';
  const selectClass = `${inputClass} appearance-none`;
  const labelClass = 'block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4 pt-4 pb-20 sm:pb-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh] p-5 space-y-4">
          <div>
            <label className={labelClass}>Product Name *</label>
            <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
              placeholder="e.g. Canva Social Media Bundle" required className={inputClass} />
            <SeoSuggestions
              name={form.name}
              category={form.category}
              platform={form.platform}
              onUseTitle={t => set('name', t)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value as Category)} className={selectClass}>
                {ALL_CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Platform</label>
              <select value={form.platform} onChange={e => set('platform', e.target.value as PlatformName)} className={selectClass}>
                {ALL_PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Price (£)</label>
              <input type="number" min={0} step={0.01} value={form.price}
                onChange={e => set('price', parseFloat(e.target.value) || 0)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Units Sold</label>
              <input type="number" min={0} value={form.unitsSold}
                onChange={e => set('unitsSold', parseInt(e.target.value) || 0)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Launch Date</label>
              <input type="date" value={form.launchDate}
                onChange={e => set('launchDate', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value as ProductStatus)} className={selectClass}>
                {ALL_STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <button type="submit"
            className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold text-sm hover:bg-indigo-700 active:scale-[0.98] transition-all">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}

function LogSaleModal({ product, onLog, onClose }: {
  product: Product; onLog: (units: number, date: string) => void; onClose: () => void;
}) {
  const [units, setUnits] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const inputClass = 'w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4 pt-4 pb-20 sm:pb-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Log a Sale</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X size={20} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">Product</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.name}</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{formatCurrency(product.price)} each</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Units Sold</label>
            <input type="number" min={1} value={units} onChange={e => setUnits(parseInt(e.target.value) || 1)} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputClass} />
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">Revenue from this sale</span>
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{formatCurrency(units * product.price)}</span>
          </div>
          <button onClick={() => { onLog(units, date); onClose(); }}
            className="w-full bg-indigo-600 text-white rounded-xl py-3 font-semibold text-sm hover:bg-indigo-700 active:scale-[0.98] transition-all">
            Log Sale
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PRODUCT MARKETING GUIDE ─────────────────────────────────────────────────────
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
      className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg transition-all ${copied ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'}`}
    >
      {copied ? <Check size={9} /> : <Copy size={9} />} {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function ProductGuide({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  // Find matching hooks (by category label match in the hook's category text)
  const categoryLabel = CATEGORY_LABELS[product.category].toLowerCase();
  const matchingHooks = HOOK_BANK.filter(h => h.category.toLowerCase().includes(categoryLabel)).slice(0, 2);
  const fallbackHooks = HOOK_BANK.slice(0, 2);
  const hooks = matchingHooks.length > 0 ? matchingHooks : fallbackHooks;

  // Find matching hashtag set
  const hashtagSet = HASHTAG_SETS.find(h => h.category.toLowerCase().includes(categoryLabel));

  // Pick 2 quick tips — alternate between pricing and SEO tips
  const quickTips = [PRICING_TIPS[0], SEO_TIPS[0]];

  return (
    <div className="mt-3 border-t border-gray-50 dark:border-gray-800 pt-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
      >
        <Lightbulb size={13} />
        How to promote this
        {open ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {/* Hooks */}
          <div>
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Hook ideas</p>
            <div className="space-y-1.5">
              {hooks.map(hook => (
                <div key={hook.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 flex items-start justify-between gap-2">
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed flex-1">"{hook.text}"</p>
                  <CopyBtn text={hook.text} />
                </div>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          {hashtagSet && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Hashtags ({hashtagSet.platform})</p>
                <CopyBtn text={hashtagSet.tags.join(' ')} />
              </div>
              <div className="flex flex-wrap gap-1">
                {hashtagSet.tags.slice(0, 10).map(tag => (
                  <span key={tag} className="text-[10px] bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded-full font-medium">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Quick tips */}
          <div>
            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Quick tips</p>
            <div className="space-y-1.5">
              {quickTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5 flex-shrink-0">→</span>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed"><span className="font-semibold text-gray-700 dark:text-gray-300">{tip.title}:</span> {tip.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── REVIEW SECTION ─────────────────────────────────────────────────────────────
function ReviewSection({ product, onAdd, onDelete }: {
  product: Product;
  onAdd: (data: { rating: number; quote?: string }) => void;
  onDelete: (reviewId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [addingReview, setAddingReview] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newQuote, setNewQuote] = useState('');

  const reviews = product.reviews || [];
  const avgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const handleSave = () => {
    onAdd({ rating: newRating, quote: newQuote.trim() || undefined });
    setNewQuote('');
    setNewRating(5);
    setAddingReview(false);
  };

  return (
    <div className="border-t border-gray-50 dark:border-gray-800 pt-3 mt-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      >
        <MessageSquare size={13} />
        Reviews
        {reviews.length > 0 && (
          <span className="flex items-center gap-0.5">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-amber-600 dark:text-amber-400">{avgRating.toFixed(1)}</span>
            <span className="text-gray-400 dark:text-gray-500">({reviews.length})</span>
          </span>
        )}
        {open ? <ChevronUp size={11} className="ml-auto" /> : <ChevronDown size={11} className="ml-auto" />}
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {reviews.map(r => (
            <div key={r.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={11}
                      className={i <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-700 fill-gray-200 dark:fill-gray-700'} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">{r.date}</span>
                  <button onClick={() => onDelete(r.id)}
                    className="text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors">
                    <X size={12} />
                  </button>
                </div>
              </div>
              {r.quote && <p className="text-xs text-gray-600 dark:text-gray-400 italic leading-relaxed">"{r.quote}"</p>}
            </div>
          ))}

          {addingReview ? (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 space-y-2.5">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Add review</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <button key={i} type="button" onClick={() => setNewRating(i)}>
                    <Star size={18}
                      className={i <= newRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600 fill-gray-300 dark:fill-gray-600'} />
                  </button>
                ))}
              </div>
              <textarea
                value={newQuote}
                onChange={e => setNewQuote(e.target.value)}
                placeholder="Quote or note (optional)"
                rows={2}
                className="w-full border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
              />
              <div className="flex gap-2">
                <button onClick={handleSave}
                  className="flex-1 bg-indigo-600 text-white rounded-lg py-1.5 text-xs font-semibold">
                  Save Review
                </button>
                <button onClick={() => setAddingReview(false)}
                  className="text-gray-400 rounded-lg px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setAddingReview(true)}
              className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700">
              <PlusCircle size={13} /> Add a review
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export function Products({
  products, saleLogs, monthlyGoal,
  onAddProduct, onEditProduct, onDeleteProduct, onLogSale, onSetGoal,
  roadmapItems, onSaveToRoadmap, onRemoveFromRoadmap, onUpdateRoadmapStatus, onStartBuilding,
  onToggleChecklistItem, onAddReview, onDeleteReview,
  pendingTemplate, onClearPendingTemplate,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [formInitial, setFormInitial] = useState<Omit<Product, 'id'>>(EMPTY_FORM);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loggingProduct, setLoggingProduct] = useState<Product | null>(null);
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [filterPlatform, setFilterPlatform] = useState<PlatformName | 'all'>('all');
  const [sortBy, setSortBy] = useState('revenue-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (pendingTemplate) {
      setFormInitial({ ...EMPTY_FORM, ...pendingTemplate });
      setShowForm(true);
      onClearPendingTemplate();
    }
  }, [pendingTemplate, onClearPendingTemplate]);

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

  const handleUseSuggestion = (s: ProductSuggestion) => {
    setFormInitial({
      name: s.name, category: s.category, platform: s.platform, price: s.price,
      unitsSold: 0, launchDate: new Date().toISOString().slice(0, 10), status: 'draft',
    });
    setShowForm(true);
  };

  const openNewForm = () => {
    setFormInitial(EMPTY_FORM);
    setShowForm(true);
  };

  const cardClass = 'bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800';

  return (
    <div className="px-4 pt-5 pb-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {products.length} total · {products.filter(p => p.status === 'live').length} live
          </p>
        </div>
        <button onClick={openNewForm}
          className="flex items-center gap-1.5 bg-indigo-600 text-white rounded-xl px-4 py-3 text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-sm shadow-indigo-200 dark:shadow-indigo-900">
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Monthly Goal */}
      <GoalProgress goal={monthlyGoal} currentRevenue={revenueThisMonth} onSetGoal={onSetGoal} />

      {/* ── ROADMAP ── */}
      {roadmapItems.length > 0 && (
        <RoadmapSection
          items={roadmapItems}
          onRemove={onRemoveFromRoadmap}
          onUpdateStatus={onUpdateRoadmapStatus}
          onStartBuilding={onStartBuilding}
          onToggleChecklistItem={onToggleChecklistItem}
        />
      )}

      {/* ── INSPIRATION BOARD ── */}
      <InspirationBoard
        roadmapItems={roadmapItems}
        onSaveToRoadmap={onSaveToRoadmap}
        onUseTemplate={handleUseSuggestion}
        defaultOpen={products.length === 0}
      />

      {/* ── PRODUCT LIST ── */}
      {products.length > 0 && (
        <>
          <div className="flex items-center justify-between pt-1">
            <p className="text-sm font-bold text-gray-900 dark:text-white">Your Products</p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                activeFilters > 0
                  ? 'border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400'
              }`}>
              <Filter size={13} />
              Filters
              {activeFilters > 0 && (
                <span className="bg-indigo-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {activeFilters}
                </span>
              )}
            </button>
            <div className="relative flex-1">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-xl pl-3 pr-7 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {showFilters && (
            <div className={`${cardClass} p-4 space-y-3`}>
              <div>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</p>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setFilterCategory('all')}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${filterCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>All</button>
                  {ALL_CATEGORIES.map(c => (
                    <button key={c} onClick={() => setFilterCategory(c)}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${filterCategory === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                      {CATEGORY_LABELS[c]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Platform</p>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setFilterPlatform('all')}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${filterPlatform === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>All</button>
                  {ALL_PLATFORMS.map(p => (
                    <button key={p} onClick={() => setFilterPlatform(p)}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${filterPlatform === p ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              {activeFilters > 0 && (
                <button onClick={() => { setFilterCategory('all'); setFilterPlatform('all'); }}
                  className="text-xs text-red-500 font-medium hover:text-red-700">Clear all filters</button>
              )}
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-500">
            Showing {filteredSorted.length} of {products.length} products
          </p>

          <div className="space-y-3">
            {filteredSorted.length === 0 && (
              <div className={`${cardClass} border-dashed border-gray-200 dark:border-gray-700 p-8 text-center`}>
                <Package size={32} className="text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-400 dark:text-gray-500">No products match these filters.</p>
              </div>
            )}
            {filteredSorted.map(product => {
              const revenue = product.price * product.unitsSold;
              const isDeleting = deletingId === product.id;
              return (
                <div key={product.id} className={cardClass + ' p-4'}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{product.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        Launched {new Date(product.launchDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <Badge label={product.status.charAt(0).toUpperCase() + product.status.slice(1)} className={STATUS_COLORS[product.status]} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <Badge label={CATEGORY_LABELS[product.category]} className={CATEGORY_COLORS[product.category]} />
                    <Badge label={product.platform} className={PLATFORM_COLORS[product.platform]} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Sold</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{product.unitsSold.toLocaleString()}</p>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-2.5 text-center">
                      <p className="text-xs text-indigo-500 dark:text-indigo-400">Revenue</p>
                      <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{formatCurrency(revenue)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setLoggingProduct(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-xl py-2 text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 active:scale-95 transition-all">
                      <PlusCircle size={13} />
                      Log Sale
                    </button>
                    <button onClick={() => setEditingProduct(product)}
                      className="flex items-center justify-center w-9 h-9 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all">
                      <Edit2 size={14} />
                    </button>
                    {isDeleting ? (
                      <div className="flex gap-1">
                        <button onClick={() => { onDeleteProduct(product.id); setDeletingId(null); }}
                          className="flex items-center justify-center w-9 h-9 bg-red-500 text-white rounded-xl hover:bg-red-600 active:scale-95 transition-all">
                          <Check size={14} />
                        </button>
                        <button onClick={() => setDeletingId(null)}
                          className="flex items-center justify-center w-9 h-9 border border-gray-200 dark:border-gray-700 text-gray-400 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeletingId(product.id)}
                        className="flex items-center justify-center w-9 h-9 border border-gray-200 dark:border-gray-700 text-gray-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 hover:border-red-200 dark:hover:border-red-800 active:scale-95 transition-all">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  {/* Marketing guide */}
                  <ProductGuide product={product} />

                  {/* Review section */}
                  <ReviewSection
                    product={product}
                    onAdd={data => onAddReview(product.id, data)}
                    onDelete={reviewId => onDeleteReview(product.id, reviewId)}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}

      {showForm && (
        <ProductForm initial={formInitial} onSave={onAddProduct} onClose={() => setShowForm(false)} title="Add New Product" />
      )}
      {editingProduct && (
        <ProductForm initial={editingProduct} onSave={data => onEditProduct({ ...data, id: editingProduct.id })} onClose={() => setEditingProduct(null)} title="Edit Product" />
      )}
      {loggingProduct && (
        <LogSaleModal product={loggingProduct} onLog={(u, d) => onLogSale(loggingProduct.id, u, d)} onClose={() => setLoggingProduct(null)} />
      )}
    </div>
  );
}
