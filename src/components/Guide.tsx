import { useState, useMemo } from 'react';
import { Flame, ChevronDown, ChevronUp, Star, Clock, DollarSign, Wrench, X } from 'lucide-react';
import type { GuideIdea, Category, Difficulty } from '../types';
import {
  CATEGORY_LABELS, CATEGORY_COLORS, DIFFICULTY_COLORS,
  ALL_CATEGORIES, DIFFICULTY_LEVELS, TOOL_OPTIONS,
} from '../utils';

interface Props {
  ideas: GuideIdea[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={11}
          className={i <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
  );
}

function IdeaCard({ idea }: { idea: GuideIdea }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        className="p-4 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {idea.trending && (
                <span className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 border border-orange-200">
                  <Flame size={9} />
                  Trending
                </span>
              )}
              {idea.demandRating >= 5 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">
                  High Demand
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold text-gray-900 leading-tight">{idea.type}</h3>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[idea.category]}`}>
              {CATEGORY_LABELS[idea.category]}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[idea.difficulty]}`}>
              {idea.difficulty.charAt(0).toUpperCase() + idea.difficulty.slice(1)}
            </span>
          </div>
        </div>

        {/* Quick info row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <StarRating rating={idea.demandRating} />
            <span className="text-[10px] text-gray-400">demand</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-700">
            <DollarSign size={11} />
            <span className="text-xs font-semibold">${idea.pricingMin}–${idea.pricingMax}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Clock size={11} />
            <span className="text-xs">{idea.timeToCreate}</span>
          </div>
        </div>

        {/* Tools chips */}
        <div className="flex flex-wrap gap-1 mt-2">
          {idea.tools.map(tool => (
            <span key={tool} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Wrench size={8} />
              {tool}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
          <span className="text-xs text-indigo-600 font-medium">
            {expanded ? 'Hide details' : 'View details & launch checklist'}
          </span>
          {expanded ? <ChevronUp size={14} className="text-indigo-400" /> : <ChevronDown size={14} className="text-indigo-400" />}
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4 space-y-4">
          {/* Description */}
          <div className="pt-3">
            <p className="text-xs text-gray-600 leading-relaxed">{idea.description}</p>
          </div>

          {/* Niches */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-1.5">Works for these niches</p>
            <div className="flex flex-wrap gap-1.5">
              {idea.niches.map(n => (
                <span key={n} className="text-[11px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-medium">
                  {n}
                </span>
              ))}
            </div>
          </div>

          {/* Pricing sweet spot */}
          <div className="bg-emerald-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-emerald-800 mb-0.5">Pricing Sweet Spot</p>
            <p className="text-sm font-bold text-emerald-700">${idea.pricingMin} – ${idea.pricingMax}</p>
            <p className="text-[11px] text-emerald-600 mt-0.5">
              Aim for the mid-to-upper range once you have reviews.
            </p>
          </div>

          {/* Launch Checklist */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">How to Launch — Step by Step</p>
            <ol className="space-y-2">
              {idea.launchChecklist.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export function Guide({ ideas }: Props) {
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');
  const [filterTool, setFilterTool] = useState<string | 'all'>('all');
  const [showTrending, setShowTrending] = useState(false);

  const filtered = useMemo(() => {
    return ideas.filter(idea => {
      if (filterCategory !== 'all' && idea.category !== filterCategory) return false;
      if (filterDifficulty !== 'all' && idea.difficulty !== filterDifficulty) return false;
      if (filterTool !== 'all' && !idea.tools.includes(filterTool)) return false;
      if (showTrending && !idea.trending) return false;
      return true;
    });
  }, [ideas, filterCategory, filterDifficulty, filterTool, showTrending]);

  const trendingCount = ideas.filter(i => i.trending).length;

  const clearAll = () => {
    setFilterCategory('all');
    setFilterDifficulty('all');
    setFilterTool('all');
    setShowTrending(false);
  };

  const hasFilters = filterCategory !== 'all' || filterDifficulty !== 'all' || filterTool !== 'all' || showTrending;

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Product Ideas</h1>
        <p className="text-xs text-gray-400 mt-0.5">{ideas.length} digital product ideas to explore</p>
      </div>

      {/* Trending pill */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
        <button
          onClick={() => setShowTrending(!showTrending)}
          className={`flex-shrink-0 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
            showTrending
              ? 'bg-orange-500 text-white border-orange-500'
              : 'border-gray-200 text-gray-600 bg-white hover:border-orange-300'
          }`}
        >
          <Flame size={12} />
          Trending Only ({trendingCount})
        </button>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex-shrink-0 flex items-center gap-1 rounded-full border border-red-200 text-red-500 bg-red-50 px-3 py-1.5 text-xs font-semibold"
          >
            <X size={11} />
            Clear filters
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="space-y-3">
        {/* Category filter */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1.5">Category</p>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
            <button
              onClick={() => setFilterCategory('all')}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filterCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300'}`}
            >All</button>
            {ALL_CATEGORIES.filter(c => ideas.some(i => i.category === c)).map(c => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filterCategory === c ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300'}`}
              >{CATEGORY_LABELS[c]}</button>
            ))}
          </div>
        </div>

        {/* Difficulty filter */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1.5">Difficulty</p>
          <div className="flex gap-1.5">
            <button
              onClick={() => setFilterDifficulty('all')}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filterDifficulty === 'all' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
            >All</button>
            {DIFFICULTY_LEVELS.map(d => (
              <button
                key={d}
                onClick={() => setFilterDifficulty(d)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filterDifficulty === d ? 'bg-indigo-600 text-white' : `bg-white border border-gray-200 text-gray-600 hover:border-indigo-300`}`}
              >{d.charAt(0).toUpperCase() + d.slice(1)}</button>
            ))}
          </div>
        </div>

        {/* Tool filter */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1.5">Tool needed</p>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
            <button
              onClick={() => setFilterTool('all')}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filterTool === 'all' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300'}`}
            >Any tool</button>
            {TOOL_OPTIONS.filter(t => ideas.some(i => i.tools.includes(t))).map(t => (
              <button
                key={t}
                onClick={() => setFilterTool(t)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filterTool === t ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300'}`}
              >{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500">
        Showing <span className="font-semibold text-gray-700">{filtered.length}</span> ideas
      </p>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
            <p className="text-sm text-gray-400">No ideas match these filters.</p>
            <button onClick={clearAll} className="mt-2 text-sm text-indigo-600 font-medium">
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map(idea => <IdeaCard key={idea.id} idea={idea} />)
        )}
      </div>
    </div>
  );
}
