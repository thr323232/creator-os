import type { Category, PlatformName, ProductStatus, Difficulty } from './types';

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(amount);

export const formatCurrencyFull = (amount: number): string =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);

export const CATEGORY_LABELS: Record<Category, string> = {
  template: 'Template',
  printable: 'Printable',
  ebook: 'Ebook',
  preset: 'Preset',
  font: 'Font',
  course: 'Course',
  'notion-template': 'Notion',
  'digital-art': 'Digital Art',
  audio: 'Audio',
  other: 'Other',
};

export const CATEGORY_COLORS: Record<Category, string> = {
  template: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  printable: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  ebook: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  preset: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  font: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  course: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'notion-template': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'digital-art': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  audio: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  other: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export const PLATFORM_COLORS: Record<PlatformName, string> = {
  Gumroad: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Etsy: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  Shopify: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Payhip: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Lemonsqueezy: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  'Creative Market': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'Personal Site': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export const STATUS_COLORS: Record<ProductStatus, string> = {
  live: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  draft: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  retired: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500',
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  advanced: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
};

export const ALL_CATEGORIES: Category[] = [
  'template', 'printable', 'ebook', 'preset', 'font',
  'course', 'notion-template', 'digital-art', 'audio', 'other',
];

export const ALL_PLATFORMS: PlatformName[] = [
  'Gumroad', 'Etsy', 'Shopify', 'Payhip',
  'Lemonsqueezy', 'Creative Market', 'Personal Site',
];

export const ALL_STATUSES: ProductStatus[] = ['live', 'draft', 'retired'];

export const DIFFICULTY_LEVELS: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

// SEO title suggestions per category + platform
const SEO_PATTERNS: Partial<Record<Category, string[]>> = {
  template: [
    '{name} | Editable Canva Template | Instant Digital Download',
    '{name} Template Pack | Canva | Social Media Bundle | Commercial Use',
    'Editable {name} Canva Template | Instant Access | Digital File',
  ],
  'notion-template': [
    '{name} | Notion Template | Instant Digital Download',
    '{name} Notion Dashboard | Productivity Template | Digital Planner',
    'Aesthetic {name} | Notion Template | Life OS | Instant Download',
  ],
  printable: [
    '{name} | Printable | Instant Download | Letter + A4',
    '{name} Printable Set | Digital Print at Home | Instant PDF Download',
    'Editable {name} | Printable Digital Download | Commercial Use',
  ],
  preset: [
    '{name} | Lightroom Preset Pack | Mobile + Desktop DNG | Instant Download',
    '{name} Preset Bundle | 10 Lightroom Presets | Photo Editing | Instant Download',
    '{name} Mobile Presets | Lightroom DNG | Instagram Aesthetic | Instant Download',
  ],
  ebook: [
    '{name} | Digital Ebook | Instant Download | Beginner Friendly Guide',
    '{name} Ebook | Step-by-Step Guide | PDF Instant Download',
    'The {name} Guide | Digital Ebook | Instant Access | PDF Download',
  ],
  course: [
    '{name} | Digital Course | Instant Access | Video + PDF Included',
    '{name} Online Course | Step-by-Step | Instant Digital Download',
    'Learn {name} | Digital Course Bundle | Lifetime Access | Instant Download',
  ],
  font: [
    '{name} Font | Commercial Use | OTF + TTF | Instant Download',
    '{name} Font Duo | Hand Lettered | Commercial License | Instant Download',
    '{name} Display Font | OTF TTF | Commercial Use | Instant Digital Download',
  ],
  'digital-art': [
    '{name} | Digital Art Print | Instant Download | Printable Wall Art',
    '{name} Printable Art | Instant Digital Download | Multiple Sizes',
    '{name} Art Print | Digital Illustration | Instant Download | Wall Decor',
  ],
  audio: [
    '{name} | Royalty-Free Audio | Instant Download | Commercial Use',
    '{name} Sound Pack | Royalty Free | Instant Digital Download',
    '{name} Music | Royalty-Free License | Instant Download | Commercial Use',
  ],
  other: [
    '{name} | Digital Product | Instant Download',
    '{name} Bundle | Digital File | Instant Access',
    'The {name} | Digital Download | Instant Access',
  ],
};

const PLATFORM_SUFFIX: Partial<Record<PlatformName, string>> = {
  Etsy: ' | Etsy Digital Download',
  'Creative Market': ' | Creative Market',
  Gumroad: '',
  Payhip: '',
  Lemonsqueezy: '',
  Shopify: '',
  'Personal Site': '',
};

export function getSeoTitleSuggestions(name: string, category: Category, platform: PlatformName): string[] {
  const base = name.trim() || 'Your Product';
  const patterns = SEO_PATTERNS[category] || SEO_PATTERNS.other!;
  const suffix = PLATFORM_SUFFIX[platform] ?? '';
  return patterns.map(p => p.replace('{name}', base) + suffix);
}

export const TOOL_OPTIONS = [
  'Canva', 'Figma', 'Notion', 'Adobe Illustrator', 'Adobe InDesign',
  'Adobe Lightroom', 'Procreate', 'Google Sheets', 'GarageBand',
  'DaVinci Resolve', 'Loom', 'Glyphs App',
];
