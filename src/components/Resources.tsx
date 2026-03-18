import { useState } from 'react';
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp, ChevronLeft,
  ExternalLink, PoundSterling, Lightbulb, Search,
  Users, Image, Copy, Check, Zap, Calendar, Hash, MessageSquare,
  Calculator, Tag, ArrowRight,
} from 'lucide-react';
import type { PlatformInfo } from '../types';
import {
  PLATFORMS, PRICING_TIPS, MOCKUP_TIPS, SEO_TIPS,
  AUDIENCE_TIPS, LAUNCH_CHECKLIST,
} from '../data/resourceData';
import {
  HOOK_BANK, CAPTION_TEMPLATES, CONTENT_CALENDAR, HASHTAG_SETS,
} from '../data/contentData';
import {
  POD_PLATFORMS, POD_CHECKLIST, POD_MARGIN_TIPS,
  DROPSHIP_SELLING_PLATFORMS, DROPSHIP_SUPPLIERS, DROPSHIP_NICHES, DROPSHIP_CHECKLIST,
  AFFILIATE_PROGRAMS, AFFILIATE_CONTENT_IDEAS, AFFILIATE_CHECKLIST,
} from '../data/incomeStreamData';
import { PRODUCT_WORKFLOWS } from '../data/contentWorkflowData';
import type { ProductWorkflow, WorkflowPlatform, IncomeStreamType } from '../data/contentWorkflowData';

type ResourceTab = 'earn' | 'guide';
type EarnStream = 'digital' | 'pod' | 'dropship' | 'affiliate' | 'workflows' | null;
type GuideSection = 'tips' | 'content' | 'checklist';

const PLATFORM_ACCENT: Record<string, string> = {
  Etsy: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-100 dark:border-orange-800/50',
  Gumroad: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-100 dark:border-green-800/50',
  Payhip: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/50',
  Lemonsqueezy: 'from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-100 dark:border-yellow-800/50',
  'Creative Market': 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-100 dark:border-purple-800/50',
  Shopify: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-100 dark:border-emerald-800/50',
  'Personal Site': 'from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-100 dark:border-gray-800',
};

const PLATFORM_DOT: Record<string, string> = {
  Etsy: 'bg-orange-500', Gumroad: 'bg-emerald-500', Payhip: 'bg-blue-500',
  Lemonsqueezy: 'bg-yellow-400', 'Creative Market': 'bg-purple-500',
  Shopify: 'bg-emerald-600', 'Personal Site': 'bg-gray-500',
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1.5 rounded-lg transition-all active:scale-95 ${
        copied
          ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
      }`}
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function PlatformCard({ platform }: { platform: PlatformInfo }) {
  const [expanded, setExpanded] = useState(false);
  const accent = PLATFORM_ACCENT[platform.name] ?? 'from-gray-50 to-slate-50 border-gray-100';
  const dot = PLATFORM_DOT[platform.name] ?? 'bg-gray-400';

  return (
    <div className={`bg-gradient-to-br ${accent} rounded-2xl border p-4 shadow-sm`}>
      <div className="cursor-pointer select-none" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
            <span className="text-base font-bold text-gray-900 dark:text-white">{platform.emoji} {platform.name}</span>
          </div>
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 ml-[18px]">{platform.tagline}</p>
        <div className="mt-2 ml-[18px]">
          <span className="text-[11px] bg-white/80 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-0.5 text-gray-600 dark:text-gray-400 font-medium">
            {platform.fees}
          </span>
        </div>
      </div>
      {expanded && (
        <div className="mt-4 space-y-3 border-t border-white/50 dark:border-gray-700/50 pt-3">
          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1.5">✅ Pros</p>
            <ul className="space-y-1">
              {platform.pros.map((p, i) => (
                <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                  <span className="text-emerald-500 mt-0.5">•</span>{p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1.5">⚠️ Cons</p>
            <ul className="space-y-1">
              {platform.cons.map((c, i) => (
                <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                  <span className="text-red-400 mt-0.5">•</span>{c}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/70 dark:bg-gray-900/60 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-0.5">Best for</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{platform.bestFor}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TipSection({ title, icon: Icon, tips, defaultOpen = false }: {
  title: string;
  icon: React.FC<{ size?: number; className?: string }>;
  tips: { title: string; body: string }[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3.5">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-indigo-600 dark:text-indigo-400" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && (
        <div className="border-t border-gray-50 dark:border-gray-800 px-4 pb-4 pt-3 space-y-3">
          {tips.map((tip, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-1">{tip.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{tip.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LaunchChecklistSection() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setChecked(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const progress = (checked.size / LAUNCH_CHECKLIST.length) * 100;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-gray-50 dark:border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">🚀 Launch Checklist</p>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{checked.size}/{LAUNCH_CHECKLIST.length}</span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full transition-all duration-500 ${progress >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
            style={{ width: `${progress}%` }} />
        </div>
        {progress >= 100 && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">🎉 All done — time to publish and promote!</p>
        )}
      </div>
      <div className="divide-y divide-gray-50 dark:divide-gray-800">
        {LAUNCH_CHECKLIST.map((item) => {
          const done = checked.has(item.id);
          return (
            <button key={item.id} onClick={() => toggle(item.id)}
              className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 transition-colors">
              {done
                ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                : <Circle size={18} className="text-gray-300 dark:text-gray-600 shrink-0 mt-0.5" />}
              <div>
                <p className={`text-sm font-medium leading-tight ${done ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-800 dark:text-gray-200'}`}>
                  {item.step}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed">{item.detail}</p>
              </div>
            </button>
          );
        })}
      </div>
      {checked.size > 0 && checked.size < LAUNCH_CHECKLIST.length && (
        <div className="px-4 py-3 border-t border-gray-50 dark:border-gray-800">
          <button onClick={() => setChecked(new Set())} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            Reset checklist
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- CONTENT TAB ----------

function HookBank() {
  const categories = [...new Set(HOOK_BANK.map(h => h.category))];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const visible = HOOK_BANK.filter(h => h.category === activeCategory);

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}>
            {cat}
          </button>
        ))}
      </div>
      {visible.map(hook => (
        <div key={hook.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded-md">
                {hook.platform}
              </span>
              <p className="text-sm text-gray-800 dark:text-gray-200 mt-1.5 leading-relaxed">"{hook.text}"</p>
            </div>
            <CopyButton text={hook.text} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CaptionTemplates() {
  const platforms = ['Instagram', 'TikTok', 'Pinterest', 'Email'] as const;
  const [activePlatform, setActivePlatform] = useState<typeof platforms[number]>('Instagram');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const visible = CAPTION_TEMPLATES.filter(c => c.platform === activePlatform);

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {platforms.map(p => (
          <button key={p} onClick={() => setActivePlatform(p)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              activePlatform === p
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
            {p}
          </button>
        ))}
      </div>
      {visible.map(cap => {
        const isOpen = expandedId === cap.id;
        const fullText = cap.subject ? `Subject: ${cap.subject}\n\n${cap.body}` : cap.body;
        return (
          <div key={cap.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
            <button onClick={() => setExpandedId(isOpen ? null : cap.id)}
              className="w-full flex items-center justify-between px-3 py-3 text-left">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{cap.type}</p>
                {cap.subject && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Subject: {cap.subject}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <CopyButton text={fullText} />
                {isOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
              </div>
            </button>
            {isOpen && (
              <div className="border-t border-gray-200 dark:border-gray-700 px-3 py-3">
                <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">{cap.body}</pre>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ContentCalendar() {
  return (
    <div className="space-y-3">
      {CONTENT_CALENDAR.map(week => (
        <div key={week.week} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 px-4 py-3 border-b border-indigo-100 dark:border-indigo-800/50">
            <div className="flex items-center gap-2">
              <span className="text-lg">{week.emoji}</span>
              <div>
                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide">Week {week.week}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{week.theme}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-8">{week.focus}</p>
          </div>
          <ul className="divide-y divide-gray-50 dark:divide-gray-800">
            {week.tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-2.5 px-4 py-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{task}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function HashtagSets() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activePlatform, setActivePlatform] = useState<'Instagram' | 'TikTok' | 'all'>('all');
  const categories = ['all', ...new Set(HASHTAG_SETS.map(h => h.category))];
  const visible = HASHTAG_SETS.filter(h => {
    if (activeCategory !== 'all' && h.category !== activeCategory) return false;
    if (activePlatform !== 'all' && h.platform !== activePlatform) return false;
    return true;
  });

  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {(['all', 'Instagram', 'TikTok'] as const).map(p => (
          <button key={p} onClick={() => setActivePlatform(p)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              activePlatform === p
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
            {p === 'all' ? 'All Platforms' : p}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              activeCategory === cat
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
            {cat === 'all' ? 'All Categories' : cat}
          </button>
        ))}
      </div>
      {visible.map(set => (
        <div key={set.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{set.category}</p>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                set.platform === 'Instagram'
                  ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300'
                  : 'bg-black/10 dark:bg-white/10 text-gray-700 dark:text-gray-300'
              }`}>
                {set.platform}
              </span>
            </div>
            <CopyButton text={set.tags.join(' ')} />
          </div>
          <div className="flex flex-wrap gap-1">
            {set.tags.map(tag => (
              <span key={tag} className="text-[10px] bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded-md font-medium">
                {tag}
              </span>
            ))}
          </div>
          {set.etsyKeywords && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[10px] font-semibold text-amber-700 dark:text-amber-400">Etsy SEO Keywords</p>
                <CopyButton text={set.etsyKeywords.join(', ')} />
              </div>
              <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">
                {set.etsyKeywords.join(' · ')}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ContentTab() {
  const [activeSection, setActiveSection] = useState<'hooks' | 'captions' | 'calendar' | 'hashtags'>('hooks');

  const sections = [
    { id: 'hooks' as const, label: 'Hook Bank', icon: Zap },
    { id: 'captions' as const, label: 'Captions', icon: MessageSquare },
    { id: 'calendar' as const, label: '4-Week Plan', icon: Calendar },
    { id: 'hashtags' as const, label: 'Hashtags', icon: Hash },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {sections.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveSection(id)}
            className={`flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl font-medium transition-all ${
              activeSection === id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-700'
            }`}>
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>

      {activeSection === 'hooks' && (
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Copy any hook to use as your video or post opening. Personalise with your product and numbers.
          </p>
          <HookBank />
        </div>
      )}
      {activeSection === 'captions' && (
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Ready-made captions for every platform. Tap to expand, fill in the brackets, and copy.
          </p>
          <CaptionTemplates />
        </div>
      )}
      {activeSection === 'calendar' && (
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            A 4-week content plan for launching or promoting a digital product — from tease to repurpose.
          </p>
          <ContentCalendar />
        </div>
      )}
      {activeSection === 'hashtags' && (
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Curated hashtag sets by category and platform. Tap Copy to grab a full set in one tap.
          </p>
          <HashtagSets />
        </div>
      )}
    </div>
  );
}

// ── GENERIC CHECKLIST (reusable for POD / Dropship / Affiliate) ──────────────

function InteractiveChecklist({ items }: {
  items: { id: string; step: string; detail: string }[];
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setChecked(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const progress = (checked.size / items.length) * 100;
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-gray-50 dark:border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Quick-Start Checklist</p>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{checked.size}/{items.length}</span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
          <div className={`h-1.5 rounded-full transition-all duration-500 ${progress >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
            style={{ width: `${progress}%` }} />
        </div>
        {progress >= 100 && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">🎉 You're ready to launch!</p>
        )}
      </div>
      <div className="divide-y divide-gray-50 dark:divide-gray-800">
        {items.map(item => {
          const done = checked.has(item.id);
          return (
            <button key={item.id} onClick={() => toggle(item.id)}
              className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              {done
                ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                : <Circle size={18} className="text-gray-300 dark:text-gray-600 shrink-0 mt-0.5" />}
              <div>
                <p className={`text-sm font-medium leading-tight ${done ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-800 dark:text-gray-200'}`}>
                  {item.step}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-relaxed">{item.detail}</p>
              </div>
            </button>
          );
        })}
      </div>
      {checked.size > 0 && checked.size < items.length && (
        <div className="px-4 py-3 border-t border-gray-50 dark:border-gray-800">
          <button onClick={() => setChecked(new Set())} className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            Reset checklist
          </button>
        </div>
      )}
    </div>
  );
}

// ── PRINT-ON-DEMAND TAB ───────────────────────────────────────────────────────

function PodPlatformCard({ platform }: { platform: typeof POD_PLATFORMS[number] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-4 cursor-pointer select-none" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-base font-bold text-gray-900 dark:text-white">{platform.emoji} {platform.name}</span>
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{platform.tagline}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg px-2 py-0.5 font-medium">{platform.fees}</span>
          <span className="text-[11px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg px-2 py-0.5 font-medium">⏱ {platform.fulfillmentTime}</span>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 pb-4 pt-3 space-y-3">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3">
            <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 mb-0.5 uppercase tracking-wide">🇬🇧 UK Shipping</p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">{platform.ukShipping}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">✅ Pros</p>
            <ul className="space-y-1">{platform.pros.map((p, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5"><span className="text-emerald-500 mt-0.5">•</span>{p}</li>
            ))}</ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">⚠️ Cons</p>
            <ul className="space-y-1">{platform.cons.map((c, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5"><span className="text-red-400 mt-0.5">•</span>{c}</li>
            ))}</ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Best for</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{platform.bestFor}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Products</p>
            <div className="flex flex-wrap gap-1">
              {platform.productTypes.map(t => (
                <span key={t} className="text-[10px] bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">Integrates with: {platform.integration}</p>
        </div>
      )}
    </div>
  );
}

function PodMarginCalculator() {
  const [baseCost, setBaseCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [platformFee, setPlatformFee] = useState('6.5');

  const base = parseFloat(baseCost) || 0;
  const price = parseFloat(sellingPrice) || 0;
  const fee = parseFloat(platformFee) || 0;
  const feeAmount = price * (fee / 100);
  const profit = price - base - feeAmount;
  const margin = price > 0 ? (profit / price) * 100 : 0;
  const healthy = margin >= 30;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Calculator size={15} className="text-indigo-600 dark:text-indigo-400" />
        <p className="text-sm font-semibold text-gray-900 dark:text-white">Margin Calculator</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Base Cost (£)</label>
          <input type="number" value={baseCost} onChange={e => setBaseCost(e.target.value)} placeholder="e.g. 8"
            className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400" />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Sell Price (£)</label>
          <input type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} placeholder="e.g. 24"
            className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400" />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Platform Fee %</label>
          <input type="number" value={platformFee} onChange={e => setPlatformFee(e.target.value)} placeholder="e.g. 6.5"
            className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400" />
        </div>
      </div>
      {price > 0 && base > 0 && (
        <div className={`rounded-xl p-3 ${healthy ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-semibold mb-0.5 ${healthy ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                {healthy ? '✅ Healthy margin' : '⚠️ Margin too low'}
              </p>
              <p className={`text-2xl font-bold ${healthy ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-400'}`}>
                {margin.toFixed(0)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Profit per sale</p>
              <p className={`text-lg font-bold ${healthy ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-400'}`}>
                £{profit.toFixed(2)}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500">after £{feeAmount.toFixed(2)} fee</p>
            </div>
          </div>
          {!healthy && profit > 0 && (
            <p className="text-[11px] text-red-600 dark:text-red-400 mt-1.5">
              Aim for 30%+ margin. Try raising price or using a cheaper print provider.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function PrintOnDemandTab() {
  const [section, setSection] = useState<'platforms' | 'calculator' | 'checklist'>('platforms');
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-2xl border border-violet-100 dark:border-violet-800/50 p-4">
        <p className="text-sm font-bold text-violet-900 dark:text-violet-200 mb-1">🖨️ Print-on-Demand</p>
        <p className="text-xs text-violet-700 dark:text-violet-300 leading-relaxed">
          Design once, sell forever — no stock, no upfront costs. Your designs are printed and shipped automatically when a customer orders.
        </p>
      </div>
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {([
          { id: 'platforms', label: 'Platforms' },
          { id: 'calculator', label: 'Margin Calc' },
          { id: 'checklist', label: 'Checklist' },
        ] as const).map(({ id, label }) => (
          <button key={id} onClick={() => setSection(id)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              section === id ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
            {label}
          </button>
        ))}
      </div>
      {section === 'platforms' && (
        <div className="space-y-3">
          {POD_PLATFORMS.map(p => <PodPlatformCard key={p.id} platform={p} />)}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/50 p-4 space-y-2">
            <p className="text-xs font-bold text-amber-800 dark:text-amber-300">💡 Margin Tips</p>
            {POD_MARGIN_TIPS.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <ArrowRight size={12} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {section === 'calculator' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Enter your costs to see your profit margin instantly. Aim for 30%+ to run a sustainable POD business.</p>
          <PodMarginCalculator />
        </div>
      )}
      {section === 'checklist' && <InteractiveChecklist items={POD_CHECKLIST}  />}
    </div>
  );
}

// ── DROPSHIPPING TAB ─────────────────────────────────────────────────────────

function DropshipPlatformCard({ platform }: { platform: typeof DROPSHIP_SELLING_PLATFORMS[number] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-4 cursor-pointer select-none" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-base font-bold text-gray-900 dark:text-white">{platform.emoji} {platform.name}</span>
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{platform.tagline}</p>
        <span className="mt-1.5 inline-block text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg px-2 py-0.5 font-medium">{platform.fees}</span>
      </div>
      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 pb-4 pt-3 space-y-3">
          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">✅ Pros</p>
            <ul className="space-y-1">{platform.pros.map((p, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5"><span className="text-emerald-500 mt-0.5">•</span>{p}</li>
            ))}</ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">⚠️ Cons</p>
            <ul className="space-y-1">{platform.cons.map((c, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5"><span className="text-red-400 mt-0.5">•</span>{c}</li>
            ))}</ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-0.5">Best for</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{platform.bestFor}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function DropshipSupplierCard({ supplier }: { supplier: typeof DROPSHIP_SUPPLIERS[number] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="p-4 cursor-pointer select-none" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900 dark:text-white">{supplier.emoji} {supplier.name}</span>
            {supplier.ukStock && (
              <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-md">UK Stock</span>
            )}
          </div>
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{supplier.origin}</p>
        <div className="mt-1.5 flex gap-1.5 flex-wrap">
          <span className="text-[11px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg px-2 py-0.5 font-medium">🚚 {supplier.avgShippingToUK}</span>
          <span className="text-[11px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg px-2 py-0.5 font-medium">{supplier.minOrder}</span>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 pb-4 pt-3 space-y-3">
          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">✅ Pros</p>
            <ul className="space-y-1">{supplier.pros.map((p, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5"><span className="text-emerald-500 mt-0.5">•</span>{p}</li>
            ))}</ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">⚠️ Cons</p>
            <ul className="space-y-1">{supplier.cons.map((c, i) => (
              <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5"><span className="text-red-400 mt-0.5">•</span>{c}</li>
            ))}</ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-0.5">Best for</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{supplier.bestFor}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Categories</p>
            <div className="flex flex-wrap gap-1">
              {supplier.categories.map(c => (
                <span key={c} className="text-[10px] bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full">{c}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DropshipProfitCalculator() {
  const [supplierCost, setSupplierCost] = useState('');
  const [shipping, setShipping] = useState('');
  const [platformFee, setPlatformFee] = useState('12.8');
  const [sellPrice, setSellPrice] = useState('');

  const cost = parseFloat(supplierCost) || 0;
  const ship = parseFloat(shipping) || 0;
  const fee = parseFloat(platformFee) || 0;
  const price = parseFloat(sellPrice) || 0;
  const feeAmount = price * (fee / 100);
  const profit = price - cost - ship - feeAmount;
  const margin = price > 0 ? (profit / price) * 100 : 0;
  const healthy = margin >= 25;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Calculator size={15} className="text-indigo-600 dark:text-indigo-400" />
        <p className="text-sm font-semibold text-gray-900 dark:text-white">Profit Calculator</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Supplier Cost (£)</label>
          <input type="number" value={supplierCost} onChange={e => setSupplierCost(e.target.value)} placeholder="e.g. 5"
            className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400" />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Shipping (£)</label>
          <input type="number" value={shipping} onChange={e => setShipping(e.target.value)} placeholder="e.g. 2.50"
            className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400" />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Platform Fee %</label>
          <input type="number" value={platformFee} onChange={e => setPlatformFee(e.target.value)} placeholder="e.g. 12.8"
            className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400" />
        </div>
        <div>
          <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Sell Price (£)</label>
          <input type="number" value={sellPrice} onChange={e => setSellPrice(e.target.value)} placeholder="e.g. 19.99"
            className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400" />
        </div>
      </div>
      {price > 0 && cost > 0 && (
        <div className={`rounded-xl p-3 ${healthy ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs font-semibold mb-0.5 ${healthy ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                {healthy ? '✅ Viable margin' : '⚠️ Margin too low'}
              </p>
              <p className={`text-2xl font-bold ${healthy ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-400'}`}>
                {margin.toFixed(0)}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Profit per sale</p>
              <p className={`text-lg font-bold ${profit > 0 ? (healthy ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-600 dark:text-amber-400') : 'text-red-600 dark:text-red-400'}`}>
                £{profit.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DropshippingTab() {
  const [section, setSection] = useState<'platforms' | 'suppliers' | 'calculator' | 'niches' | 'checklist'>('platforms');
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 p-4">
        <p className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">🛒 Dropshipping</p>
        <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
          Sell physical products without holding stock. When a customer orders, your supplier ships directly to them. You keep the margin.
        </p>
      </div>
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {([
          { id: 'platforms', label: 'Where to Sell' },
          { id: 'suppliers', label: 'UK Suppliers' },
          { id: 'calculator', label: 'Profit Calc' },
          { id: 'niches', label: 'Niche Ideas' },
          { id: 'checklist', label: 'Checklist' },
        ] as const).map(({ id, label }) => (
          <button key={id} onClick={() => setSection(id)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              section === id ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
            {label}
          </button>
        ))}
      </div>
      {section === 'platforms' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Choose where you'll sell your products. Each platform has different fees, audiences, and traffic levels.</p>
          {DROPSHIP_SELLING_PLATFORMS.map(p => <DropshipPlatformCard key={p.id} platform={p} />)}
        </div>
      )}
      {section === 'suppliers' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">UK-friendly suppliers — tap to compare. Always order a sample before listing. 🇬🇧 = UK stock available.</p>
          {DROPSHIP_SUPPLIERS.map(s => <DropshipSupplierCard key={s.id} supplier={s} />)}
        </div>
      )}
      {section === 'calculator' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Calculate your real profit after supplier cost, shipping, and platform fees. Aim for 25–35%+ margin.</p>
          <DropshipProfitCalculator />
        </div>
      )}
      {section === 'niches' && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Strong dropshipping niches right now. Pick one and go deep — niche stores consistently outperform general stores.</p>
          <div className="flex flex-wrap gap-2">
            {DROPSHIP_NICHES.map(niche => (
              <span key={niche} className="flex items-center gap-1 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full shadow-sm">
                <Tag size={11} className="text-indigo-400" />
                {niche}
              </span>
            ))}
          </div>
        </div>
      )}
      {section === 'checklist' && <InteractiveChecklist items={DROPSHIP_CHECKLIST}  />}
    </div>
  );
}

// ── AFFILIATE TAB ─────────────────────────────────────────────────────────────

function AffiliateTab() {
  const [section, setSection] = useState<'programs' | 'estimator' | 'content' | 'checklist'>('programs');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [monthlyAudience, setMonthlyAudience] = useState('');
  const [conversionRate, setConversionRate] = useState('1');
  const [avgCommission, setAvgCommission] = useState('15');

  const categories = ['all', 'software', 'physical', 'digital', 'education'];
  const categoryLabels: Record<string, string> = {
    all: 'All', software: 'Software', physical: 'Physical', digital: 'Digital', education: 'Education',
  };

  const filteredPrograms = AFFILIATE_PROGRAMS.filter(p => categoryFilter === 'all' || p.category === categoryFilter);

  const audience = parseFloat(monthlyAudience) || 0;
  const cvr = parseFloat(conversionRate) || 0;
  const commission = parseFloat(avgCommission) || 0;
  const monthlyClicks = audience * 0.03;
  const sales = monthlyClicks * (cvr / 100);
  const lowIncome = sales * commission * 0.5;
  const highIncome = sales * commission * 1.5;

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50 p-4">
        <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200 mb-1">🔗 Affiliate Marketing</p>
        <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
          Recommend tools and products you already use. Earn a commission every time someone signs up or buys through your link — no product creation needed.
        </p>
      </div>
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {([
          { id: 'programs', label: 'Programs' },
          { id: 'estimator', label: 'Income Est.' },
          { id: 'content', label: 'Content Ideas' },
          { id: 'checklist', label: 'Checklist' },
        ] as const).map(({ id, label }) => (
          <button key={id} onClick={() => setSection(id)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              section === id ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}>
            {label}
          </button>
        ))}
      </div>

      {section === 'programs' && (
        <div className="space-y-3">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                  categoryFilter === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}>
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filteredPrograms.map(prog => (
              <div key={prog.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{prog.emoji} {prog.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-md">
                        {prog.categoryLabel}
                      </span>
                      {prog.recurring && (
                        <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-md">
                          🔄 Recurring
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{prog.commissionRate}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">{prog.cookieDays}d cookie</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                  <span>Min payout: <span className="font-medium text-gray-700 dark:text-gray-300">{prog.paymentThreshold}</span></span>
                  <span>Via: <span className="font-medium text-gray-700 dark:text-gray-300">{prog.network}</span></span>
                </div>
                <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">Best for: {prog.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === 'estimator' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">Estimate your monthly affiliate income based on your audience size. These are indicative ranges — actual results vary by niche and content quality.</p>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Calculator size={15} className="text-indigo-600 dark:text-indigo-400" />
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Income Estimator</p>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Monthly audience / followers</label>
                <input type="number" value={monthlyAudience} onChange={e => setMonthlyAudience(e.target.value)} placeholder="e.g. 5000"
                  className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Estimated click-to-sale conversion rate (%)</label>
                <input type="number" value={conversionRate} onChange={e => setConversionRate(e.target.value)} placeholder="e.g. 1"
                  className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400" />
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Typical range: 0.5–3%. Software tends to convert higher.</p>
              </div>
              <div>
                <label className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 mb-1 block">Average commission per sale (£)</label>
                <input type="number" value={avgCommission} onChange={e => setAvgCommission(e.target.value)} placeholder="e.g. 15"
                  className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2.5 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400" />
              </div>
            </div>
            {audience > 0 && (
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
                <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-3">Estimated Monthly Income</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">£{lowIncome.toFixed(0)} – £{highIncome.toFixed(0)}</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">per month (estimated range)</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-800/50 space-y-1 text-[11px] text-indigo-600 dark:text-indigo-400">
                  <p>~{Math.round(monthlyClicks)} clicks/mo (assuming 3% link click rate)</p>
                  <p>~{sales.toFixed(1)} sales/mo at {cvr}% conversion</p>
                  <p className="text-[10px] text-indigo-500 dark:text-indigo-500 mt-1">Scale by promoting multiple programs and growing your audience.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {section === 'content' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">Content ideas that naturally incorporate affiliate links. These formats consistently outperform direct promotion.</p>
          {AFFILIATE_CONTENT_IDEAS.map(group => (
            <div key={group.category} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-4">
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">{group.category}</p>
              <div className="space-y-2">
                {group.hooks.map((hook, i) => (
                  <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 flex items-start justify-between gap-2">
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed flex-1">{hook}</p>
                    <CopyButton text={hook} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {section === 'checklist' && <InteractiveChecklist items={AFFILIATE_CHECKLIST}  />}
    </div>
  );
}

// ── WORKFLOWS TAB ──────────────────────────────────────────────────────────────
const STREAM_LABELS: Record<IncomeStreamType, string> = {
  digital: '💻 Digital',
  pod: '🖨 Print-on-Demand',
  dropship: '📦 Dropshipping',
  affiliate: '🔗 Affiliate',
};

const PLATFORM_ICONS: Record<WorkflowPlatform, string> = {
  TikTok: '🎵',
  Instagram: '📸',
  Pinterest: '📌',
  Email: '📧',
};

function WorkflowCard({ wf }: { wf: ProductWorkflow }) {
  const [stepsOpen, setStepsOpen] = useState(false);
  const [platform, setPlatform] = useState<WorkflowPlatform>('TikTok');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const platforms: WorkflowPlatform[] = ['TikTok', 'Instagram', 'Pinterest', 'Email'];
  const content = wf.content.find(c => c.platform === platform);

  const copy = (key: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-50 dark:border-gray-800">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
            {STREAM_LABELS[wf.incomeStream]}
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{wf.priceExample}</span>
        </div>
        <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{wf.productExample}</p>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Sell on: {wf.sellOn}</p>
      </div>

      {/* Setup steps */}
      <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800">
        <button
          onClick={() => setStepsOpen(o => !o)}
          className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 w-full"
        >
          {stepsOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          Setup steps ({wf.setupSteps.length})
        </button>
        {stepsOpen && (
          <ol className="mt-2.5 space-y-2">
            {wf.setupSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Platform content tabs */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {platforms.map(p => (
            <button key={p} onClick={() => setPlatform(p)}
              className={`flex-shrink-0 flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg font-semibold transition-all ${
                platform === p
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>
              {PLATFORM_ICONS[p]} {p}
            </button>
          ))}
        </div>
      </div>

      {content && (
        <div className="px-4 pb-4 space-y-3">
          {/* Hook */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                {platform === 'Email' ? 'Subject line' : 'Opening hook'}
              </p>
              <button onClick={() => copy('hook', content.hook)}
                className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                {copiedKey === 'hook' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-200 font-medium leading-relaxed italic">"{content.hook}"</p>
          </div>

          {/* Script (TikTok/Reels only) */}
          {content.script && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wide">Video script outline</p>
                <button onClick={() => copy('script', content.script!)}
                  className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                  {copiedKey === 'script' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed whitespace-pre-line">{content.script}</p>
            </div>
          )}

          {/* Caption */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                {platform === 'Email' ? 'Email body' : 'Caption'}
              </p>
              <button onClick={() => copy('caption', content.caption)}
                className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                {copiedKey === 'caption' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{content.caption}</p>
          </div>

          {/* Hashtags */}
          {content.hashtags.length > 0 && (
            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-3">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px] font-bold text-violet-700 dark:text-violet-400 uppercase tracking-wide">Hashtags</p>
                <button onClick={() => copy('hashtags', content.hashtags.join(' '))}
                  className="text-[10px] text-violet-600 dark:text-violet-400 font-medium">
                  {copiedKey === 'hashtags' ? '✓ Copied' : 'Copy all'}
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {content.hashtags.map(h => (
                  <span key={h} className="text-[10px] bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded-full font-medium">{h}</span>
                ))}
              </div>
            </div>
          )}

          {/* Image prompt */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">AI image prompt</p>
              <button onClick={() => copy('image', content.imagePrompt)}
                className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                {copiedKey === 'image' ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">{content.imagePrompt}</p>
            <p className="text-[10px] text-emerald-600 dark:text-emerald-500 mt-1.5 font-medium">↑ Paste into Midjourney or DALL-E 3 to generate your image</p>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkflowsTab() {
  const [streamFilter, setStreamFilter] = useState<IncomeStreamType | 'all'>('all');
  const streams: { value: IncomeStreamType | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'digital', label: '💻 Digital' },
    { value: 'pod', label: '🖨 POD' },
    { value: 'dropship', label: '📦 Dropship' },
    { value: 'affiliate', label: '🔗 Affiliate' },
  ];

  const filtered = streamFilter === 'all'
    ? PRODUCT_WORKFLOWS
    : PRODUCT_WORKFLOWS.filter(w => w.incomeStream === streamFilter);

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 p-4">
        <p className="text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-1">Full Workflow Examples</p>
        <p className="text-xs text-indigo-700 dark:text-indigo-400 leading-relaxed">
          Each example includes a real product, setup steps, and ready-to-post content for TikTok, Instagram, Pinterest and Email — including an AI image prompt you can use in Midjourney or DALL-E.
        </p>
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {streams.map(s => (
          <button key={s.value} onClick={() => setStreamFilter(s.value)}
            className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              streamFilter === s.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
            }`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(wf => <WorkflowCard key={wf.id} wf={wf} />)}
      </div>
    </div>
  );
}

// ── INCOME STREAM CARD ────────────────────────────────────────────────────────

function IncomeStreamCard({ emoji, title, description, gradientFrom, gradientTo, borderColor, onClick }: {
  emoji: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
  onClick: () => void;
}) {
  return (
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl border ${borderColor} overflow-hidden shadow-sm`}>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-900 dark:text-white">{emoji} {title}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{description}</p>
          </div>
        </div>
        <button
          onClick={onClick}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 text-sm font-semibold transition-all active:scale-[0.98]"
        >
          Explore <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function DigitalProductsContent() {
  return (
    <div className="space-y-3">
      {PLATFORMS.map(platform => <PlatformCard key={platform.name} platform={platform} />)}
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={16} className="text-indigo-600 dark:text-indigo-400" />
          <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">Quick Resources</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Smartmockups', sub: 'Free mockup tool' },
            { label: 'Canva', sub: 'Design tool' },
            { label: 'EverBee', sub: 'Etsy research' },
            { label: 'Marmalead', sub: 'Etsy SEO' },
          ].map(link => (
            <div key={link.label} className="bg-white dark:bg-gray-900 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{link.label}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500">{link.sub}</p>
              </div>
              <ExternalLink size={12} className="text-indigo-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const EARN_STREAMS: {
  id: Exclude<EarnStream, null>;
  emoji: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
}[] = [
  {
    id: 'digital',
    emoji: '💻',
    title: 'Digital Products',
    description: 'Sell templates, ebooks, presets & more — zero stock, instant delivery.',
    gradientFrom: 'from-indigo-50 dark:from-indigo-900/20',
    gradientTo: 'to-violet-50 dark:to-violet-900/20',
    borderColor: 'border-indigo-100 dark:border-indigo-800/50',
  },
  {
    id: 'pod',
    emoji: '🖨️',
    title: 'Print-on-Demand',
    description: 'Design once, sell forever — no stock, no upfront costs. Printed and shipped on order.',
    gradientFrom: 'from-violet-50 dark:from-violet-900/20',
    gradientTo: 'to-purple-50 dark:to-purple-900/20',
    borderColor: 'border-violet-100 dark:border-violet-800/50',
  },
  {
    id: 'dropship',
    emoji: '📦',
    title: 'Dropshipping',
    description: 'Sell physical products without holding stock — suppliers ship directly to customers.',
    gradientFrom: 'from-emerald-50 dark:from-emerald-900/20',
    gradientTo: 'to-teal-50 dark:to-teal-900/20',
    borderColor: 'border-emerald-100 dark:border-emerald-800/50',
  },
  {
    id: 'affiliate',
    emoji: '🔗',
    title: 'Affiliate Marketing',
    description: 'Recommend tools you use and earn a commission every time someone signs up or buys.',
    gradientFrom: 'from-teal-50 dark:from-teal-900/20',
    gradientTo: 'to-cyan-50 dark:to-cyan-900/20',
    borderColor: 'border-teal-100 dark:border-teal-800/50',
  },
  {
    id: 'workflows',
    emoji: '📋',
    title: 'Content Workflows',
    description: 'Full launch playbooks with ready-to-post social copy, hooks, captions and AI image prompts.',
    gradientFrom: 'from-amber-50 dark:from-amber-900/20',
    gradientTo: 'to-orange-50 dark:to-orange-900/20',
    borderColor: 'border-amber-100 dark:border-amber-800/50',
  },
];

const STREAM_TITLES: Record<Exclude<EarnStream, null>, string> = {
  digital: '💻 Digital Products',
  pod: '🖨️ Print-on-Demand',
  dropship: '📦 Dropshipping',
  affiliate: '🔗 Affiliate Marketing',
  workflows: '📋 Content Workflows',
};

export function Resources() {
  const [activeTab, setActiveTab] = useState<ResourceTab>('earn');
  const [earnStream, setEarnStream] = useState<EarnStream>(null);
  const [guideSection, setGuideSection] = useState<GuideSection>('tips');

  const guideSections: { id: GuideSection; label: string }[] = [
    { id: 'tips', label: 'Tips' },
    { id: 'content', label: 'Content' },
    { id: 'checklist', label: 'Checklist' },
  ];

  return (
    <div className="px-4 pt-5 pb-6 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ways to Earn</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Pick an income stream or browse the guide</p>
      </div>

      {/* Top toggle: Earn / Guide */}
      {earnStream === null && (
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('earn')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'earn'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            💰 Earn
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'guide'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            📚 Guide
          </button>
        </div>
      )}

      {/* ── EARN TAB ── */}
      {activeTab === 'earn' && earnStream === null && (
        <div className="space-y-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">Choose how you want to make money as a creator.</p>
          {EARN_STREAMS.map(s => (
            <IncomeStreamCard
              key={s.id}
              emoji={s.emoji}
              title={s.title}
              description={s.description}
              gradientFrom={s.gradientFrom}
              gradientTo={s.gradientTo}
              borderColor={s.borderColor}
              onClick={() => setEarnStream(s.id)}
            />
          ))}
        </div>
      )}

      {/* ── EARN STREAM DETAIL ── */}
      {activeTab === 'earn' && earnStream !== null && (
        <div className="space-y-4">
          <button
            onClick={() => setEarnStream(null)}
            className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 font-medium"
          >
            <ChevronLeft size={16} /> Back to income streams
          </button>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{STREAM_TITLES[earnStream]}</h2>
          {earnStream === 'digital' && <DigitalProductsContent />}
          {earnStream === 'pod' && <PrintOnDemandTab />}
          {earnStream === 'dropship' && <DropshippingTab />}
          {earnStream === 'affiliate' && <AffiliateTab />}
          {earnStream === 'workflows' && <WorkflowsTab />}
        </div>
      )}

      {/* ── GUIDE TAB ── */}
      {activeTab === 'guide' && (
        <div className="space-y-4">
          <div className="flex gap-1.5">
            {guideSections.map(({ id, label }) => (
              <button key={id} onClick={() => setGuideSection(id)}
                className={`flex-1 text-xs px-3 py-2.5 rounded-xl font-semibold transition-all ${
                  guideSection === id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                {label}
              </button>
            ))}
          </div>
          {guideSection === 'tips' && (
            <div className="space-y-3">
              <TipSection title="Pricing Strategy" icon={PoundSterling} tips={PRICING_TIPS} defaultOpen />
              <TipSection title="Product Mockups" icon={Image} tips={MOCKUP_TIPS} />
              <TipSection title="SEO for Listings" icon={Search} tips={SEO_TIPS} />
              <TipSection title="Growing Your Audience" icon={Users} tips={AUDIENCE_TIPS} />
            </div>
          )}
          {guideSection === 'content' && <ContentTab />}
          {guideSection === 'checklist' && <LaunchChecklistSection />}
        </div>
      )}
    </div>
  );
}
