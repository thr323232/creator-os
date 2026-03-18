import { useState, useMemo } from 'react';
import {
  Flame, ChevronDown, ChevronUp, Star, Clock, PoundSterling, Wrench, X,
  Bookmark, BookmarkCheck,
} from 'lucide-react';
import type { GuideIdea, Category, Difficulty, RoadmapItem, PlatformName } from '../types';
import {
  CATEGORY_LABELS, CATEGORY_COLORS, DIFFICULTY_COLORS,
  ALL_CATEGORIES, DIFFICULTY_LEVELS, TOOL_OPTIONS,
} from '../utils';

interface NewRoadmapData {
  sourceId?: string;
  name: string;
  category: Category;
  platform: PlatformName;
  price: number;
  description: string;
}

interface Props {
  ideas: GuideIdea[];
  roadmapItems: RoadmapItem[];
  onSaveToRoadmap: (data: NewRoadmapData) => void;
  onRemoveFromRoadmap: (id: string) => void;
}

// Default platform per category when saving from Guide
const CATEGORY_DEFAULT_PLATFORM: Record<Category, PlatformName> = {
  template: 'Etsy',
  'notion-template': 'Gumroad',
  printable: 'Etsy',
  preset: 'Creative Market',
  'digital-art': 'Creative Market',
  ebook: 'Gumroad',
  font: 'Creative Market',
  course: 'Payhip',
  audio: 'Gumroad',
  other: 'Gumroad',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={11}
          className={i <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-700 fill-gray-200 dark:fill-gray-700'} />
      ))}
    </div>
  );
}

function IdeaCard({ idea, isSaved, onSave, onUnsave }: {
  idea: GuideIdea;
  isSaved: boolean;
  onSave: () => void;
  onUnsave: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-4 cursor-pointer select-none" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {idea.trending && (
                <span className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/40 dark:to-amber-900/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                  <Flame size={9} /> Trending
                </span>
              )}
              {idea.demandRating >= 5 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                  High Demand
                </span>
              )}
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{idea.type}</h3>
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

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <StarRating rating={idea.demandRating} />
            <span className="text-[10px] text-gray-400 dark:text-gray-500">demand</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
            <PoundSterling size={11} />
            <span className="text-xs font-semibold">£{idea.pricingMin}–£{idea.pricingMax}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Clock size={11} />
            <span className="text-xs">{idea.timeToCreate}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {idea.tools.map(tool => (
            <span key={tool} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Wrench size={8} />{tool}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50 dark:border-gray-800">
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
            {expanded ? 'Hide details' : 'View details & launch checklist'}
          </span>
          {expanded
            ? <ChevronUp size={14} className="text-indigo-400" />
            : <ChevronDown size={14} className="text-indigo-400" />}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 pb-4 space-y-4">
          <div className="pt-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{idea.description}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Works for these niches</p>
            <div className="flex flex-wrap gap-1.5">
              {idea.niches.map(n => (
                <span key={n} className="text-[11px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-full font-medium">
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3">
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-0.5">Pricing Sweet Spot</p>
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">£{idea.pricingMin} – £{idea.pricingMax}</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-500 mt-0.5">
              Aim for the mid-to-upper range once you have reviews.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">How to Launch — Step by Step</p>
            <ol className="space-y-2">
              {idea.launchChecklist.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Save to Roadmap CTA */}
          <button
            onClick={e => { e.stopPropagation(); isSaved ? onUnsave() : onSave(); }}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
              isSaved
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isSaved
              ? <><BookmarkCheck size={15} /> Saved to Roadmap — tap to remove</>
              : <><Bookmark size={15} /> Save to My Roadmap</>}
          </button>
        </div>
      )}
    </div>
  );
}

export function Guide({ ideas, roadmapItems, onSaveToRoadmap, onRemoveFromRoadmap }: Props) {
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');
  const [filterTool, setFilterTool] = useState<string | 'all'>('all');
  const [showTrending, setShowTrending] = useState(false);

  const filtered = useMemo(() => ideas.filter(idea => {
    if (filterCategory !== 'all' && idea.category !== filterCategory) return false;
    if (filterDifficulty !== 'all' && idea.difficulty !== filterDifficulty) return false;
    if (filterTool !== 'all' && !idea.tools.includes(filterTool)) return false;
    if (showTrending && !idea.trending) return false;
    return true;
  }), [ideas, filterCategory, filterDifficulty, filterTool, showTrending]);

  const trendingCount = ideas.filter(i => i.trending).length;
  const hasFilters = filterCategory !== 'all' || filterDifficulty !== 'all' || filterTool !== 'all' || showTrending;
  const clearAll = () => { setFilterCategory('all'); setFilterDifficulty('all'); setFilterTool('all'); setShowTrending(false); };

  const isSaved = (id: string) => roadmapItems.some(r => r.sourceId === id);
  const getSavedId = (sourceId: string) => roadmapItems.find(r => r.sourceId === sourceId)?.id;

  const pillBase = 'flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all';
  const pillActive = 'bg-indigo-600 text-white';
  const pillInactive = 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-700';

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Ideas</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          {ideas.length} ideas to explore · {roadmapItems.length} saved to your roadmap
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
        <button onClick={() => setShowTrending(!showTrending)}
          className={`flex-shrink-0 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
            showTrending
              ? 'bg-orange-500 text-white border-orange-500'
              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 hover:border-orange-300'
          }`}>
          <Flame size={12} /> Trending Only ({trendingCount})
        </button>
        {hasFilters && (
          <button onClick={clearAll}
            className="flex-shrink-0 flex items-center gap-1 rounded-full border border-red-200 dark:border-red-800 text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 text-xs font-semibold">
            <X size={11} /> Clear filters
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Category</p>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
            <button onClick={() => setFilterCategory('all')} className={`${pillBase} ${filterCategory === 'all' ? pillActive : pillInactive}`}>All</button>
            {ALL_CATEGORIES.filter(c => ideas.some(i => i.category === c)).map(c => (
              <button key={c} onClick={() => setFilterCategory(c)} className={`${pillBase} ${filterCategory === c ? pillActive : pillInactive}`}>
                {CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Difficulty</p>
          <div className="flex gap-1.5">
            <button onClick={() => setFilterDifficulty('all')} className={`${pillBase} ${filterDifficulty === 'all' ? pillActive : pillInactive}`}>All</button>
            {DIFFICULTY_LEVELS.map(d => (
              <button key={d} onClick={() => setFilterDifficulty(d)} className={`${pillBase} ${filterDifficulty === d ? pillActive : pillInactive}`}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Tool needed</p>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
            <button onClick={() => setFilterTool('all')} className={`${pillBase} ${filterTool === 'all' ? pillActive : pillInactive}`}>Any tool</button>
            {TOOL_OPTIONS.filter(t => ideas.some(i => i.tools.includes(t))).map(t => (
              <button key={t} onClick={() => setFilterTool(t)} className={`${pillBase} ${filterTool === t ? pillActive : pillInactive}`}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{filtered.length}</span> ideas
      </p>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-8 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">No ideas match these filters.</p>
            <button onClick={clearAll} className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">Clear filters</button>
          </div>
        ) : (
          filtered.map(idea => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              isSaved={isSaved(idea.id)}
              onSave={() => onSaveToRoadmap({
                sourceId: idea.id,
                name: idea.type,
                category: idea.category,
                platform: CATEGORY_DEFAULT_PLATFORM[idea.category],
                price: idea.pricingMin,
                description: idea.description.slice(0, 150),
              })}
              onUnsave={() => {
                const savedId = getSavedId(idea.id);
                if (savedId) onRemoveFromRoadmap(savedId);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
