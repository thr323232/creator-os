import { useState } from 'react';
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp,
  ExternalLink, DollarSign, Lightbulb, Search,
  Users, Image, Copy, Check, Zap, Calendar, Hash, MessageSquare,
} from 'lucide-react';
import type { PlatformInfo } from '../types';
import {
  PLATFORMS, PRICING_TIPS, MOCKUP_TIPS, SEO_TIPS,
  AUDIENCE_TIPS, LAUNCH_CHECKLIST,
} from '../data/resourceData';
import {
  HOOK_BANK, CAPTION_TEMPLATES, CONTENT_CALENDAR, HASHTAG_SETS,
} from '../data/contentData';

type ResourceTab = 'platforms' | 'tips' | 'content' | 'checklist';

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

export function Resources() {
  const [activeTab, setActiveTab] = useState<ResourceTab>('platforms');

  const tabs: { id: ResourceTab; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'platforms', label: 'Platforms', icon: ExternalLink },
    { id: 'tips', label: 'Tips', icon: Lightbulb },
    { id: 'content', label: 'Content', icon: Zap },
    { id: 'checklist', label: 'Checklist', icon: CheckCircle2 },
  ];

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resources</h1>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Platforms, tips, content ideas & your launch checklist</p>
      </div>

      {/* Internal tab strip */}
      <div className="flex gap-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === id
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}>
            <Icon size={12} />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Platforms */}
      {activeTab === 'platforms' && (
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
      )}

      {/* Tips */}
      {activeTab === 'tips' && (
        <div className="space-y-3">
          <TipSection title="Pricing Strategy" icon={DollarSign} tips={PRICING_TIPS} defaultOpen />
          <TipSection title="Product Mockups" icon={Image} tips={MOCKUP_TIPS} />
          <TipSection title="SEO for Listings" icon={Search} tips={SEO_TIPS} />
          <TipSection title="Growing Your Audience" icon={Users} tips={AUDIENCE_TIPS} />
        </div>
      )}

      {/* Content Ideas */}
      {activeTab === 'content' && <ContentTab />}

      {/* Launch Checklist */}
      {activeTab === 'checklist' && <LaunchChecklistSection />}
    </div>
  );
}
