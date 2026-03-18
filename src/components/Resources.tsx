import { useState } from 'react';
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp,
  ExternalLink, DollarSign, Lightbulb, Search,
  Users, Image,
} from 'lucide-react';
import type { PlatformInfo } from '../types';
import {
  PLATFORMS, PRICING_TIPS, MOCKUP_TIPS, SEO_TIPS,
  AUDIENCE_TIPS, LAUNCH_CHECKLIST,
} from '../data/resourceData';

const PLATFORM_ACCENT: Record<string, string> = {
  Etsy: 'from-orange-50 to-amber-50 border-orange-100',
  Gumroad: 'from-green-50 to-emerald-50 border-green-100',
  Payhip: 'from-blue-50 to-indigo-50 border-blue-100',
  Lemonsqueezy: 'from-yellow-50 to-amber-50 border-yellow-100',
  'Creative Market': 'from-purple-50 to-violet-50 border-purple-100',
  Shopify: 'from-emerald-50 to-teal-50 border-emerald-100',
  'Personal Site': 'from-gray-50 to-slate-50 border-gray-100',
};

const PLATFORM_DOT: Record<string, string> = {
  Etsy: 'bg-orange-500',
  Gumroad: 'bg-emerald-500',
  Payhip: 'bg-blue-500',
  Lemonsqueezy: 'bg-yellow-400',
  'Creative Market': 'bg-purple-500',
  Shopify: 'bg-emerald-600',
  'Personal Site': 'bg-gray-500',
};

function PlatformCard({ platform }: { platform: PlatformInfo }) {
  const [expanded, setExpanded] = useState(false);
  const accent = PLATFORM_ACCENT[platform.name] ?? 'from-gray-50 to-slate-50 border-gray-100';
  const dot = PLATFORM_DOT[platform.name] ?? 'bg-gray-400';

  return (
    <div className={`bg-gradient-to-br ${accent} rounded-2xl border p-4 shadow-sm`}>
      <div
        className="cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${dot}`} />
            <span className="text-base font-bold text-gray-900">{platform.emoji} {platform.name}</span>
          </div>
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
        <p className="text-xs text-gray-500 ml-[18px]">{platform.tagline}</p>
        <div className="mt-2 ml-[18px]">
          <span className="text-[11px] bg-white/80 border border-gray-200 rounded-lg px-2 py-0.5 text-gray-600 font-medium">
            {platform.fees}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-3 border-t border-white/50 pt-3">
          <div>
            <p className="text-xs font-semibold text-emerald-700 mb-1.5">✅ Pros</p>
            <ul className="space-y-1">
              {platform.pros.map((p, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-600 mb-1.5">⚠️ Cons</p>
            <ul className="space-y-1">
              {platform.cons.map((c, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span className="text-red-400 mt-0.5">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/70 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-700 mb-0.5">Best for</p>
            <p className="text-xs text-gray-600">{platform.bestFor}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TipSection({
  title,
  icon: Icon,
  tips,
  defaultOpen = false,
}: {
  title: string;
  icon: React.FC<{ size?: number; className?: string }>;
  tips: { title: string; body: string }[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5"
      >
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-indigo-600" />
          <p className="text-sm font-semibold text-gray-900">{title}</p>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && (
        <div className="border-t border-gray-50 px-4 pb-4 pt-3 space-y-3">
          {tips.map((tip, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs font-semibold text-gray-800 mb-1">{tip.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{tip.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LaunchChecklistSection() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setChecked(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const progress = (checked.size / LAUNCH_CHECKLIST.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-gray-50">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-900">🚀 Launch Checklist</p>
          <span className="text-xs font-bold text-indigo-600">{checked.size}/{LAUNCH_CHECKLIST.length}</span>
        </div>
        <div className="bg-gray-100 rounded-full h-1.5">
          <div
            className={`h-1.5 rounded-full transition-all duration-500 ${progress >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress >= 100 && (
          <p className="text-xs text-emerald-600 font-semibold mt-1.5">🎉 All done — time to publish and promote!</p>
        )}
      </div>
      <div className="divide-y divide-gray-50">
        {LAUNCH_CHECKLIST.map((item) => {
          const done = checked.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className="w-full flex items-start gap-3 px-4 py-3.5 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              {done
                ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                : <Circle size={18} className="text-gray-300 shrink-0 mt-0.5" />}
              <div>
                <p className={`text-sm font-medium leading-tight ${done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {item.step}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{item.detail}</p>
              </div>
            </button>
          );
        })}
      </div>
      {checked.size > 0 && checked.size < LAUNCH_CHECKLIST.length && (
        <div className="px-4 py-3 border-t border-gray-50">
          <button
            onClick={() => setChecked(new Set())}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Reset checklist
          </button>
        </div>
      )}
    </div>
  );
}

export function Resources() {
  const [platformsExpanded, setPlatformsExpanded] = useState(true);

  return (
    <div className="px-4 pt-4 pb-6 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
        <p className="text-xs text-gray-400 mt-0.5">Platforms, tips & your launch checklist</p>
      </div>

      {/* Platforms Section */}
      <div>
        <button
          onClick={() => setPlatformsExpanded(!platformsExpanded)}
          className="flex items-center justify-between w-full mb-3"
        >
          <p className="text-sm font-semibold text-gray-700">Platforms to Sell On</p>
          {platformsExpanded
            ? <ChevronUp size={16} className="text-gray-400" />
            : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {platformsExpanded && (
          <div className="space-y-3">
            {PLATFORMS.map(platform => (
              <PlatformCard key={platform.name} platform={platform} />
            ))}
          </div>
        )}
      </div>

      {/* Tips Sections */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-gray-700">Creator Tips</p>
        <TipSection
          title="Pricing Strategy"
          icon={DollarSign}
          tips={PRICING_TIPS}
          defaultOpen
        />
        <TipSection
          title="Product Mockups"
          icon={Image}
          tips={MOCKUP_TIPS}
        />
        <TipSection
          title="SEO for Listings"
          icon={Search}
          tips={SEO_TIPS}
        />
        <TipSection
          title="Growing Your Audience"
          icon={Users}
          tips={AUDIENCE_TIPS}
        />
      </div>

      {/* Launch Checklist */}
      <LaunchChecklistSection />

      {/* Quick links */}
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={16} className="text-indigo-600" />
          <p className="text-sm font-semibold text-indigo-900">Quick Resources</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Smartmockups', sub: 'Free mockup tool' },
            { label: 'Canva', sub: 'Design tool' },
            { label: 'EverBee', sub: 'Etsy research' },
            { label: 'Marmalead', sub: 'Etsy SEO' },
          ].map(link => (
            <div
              key={link.label}
              className="bg-white rounded-xl p-3 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-gray-800">{link.label}</p>
                <p className="text-[10px] text-gray-400">{link.sub}</p>
              </div>
              <ExternalLink size={12} className="text-indigo-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
