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
  template: 'bg-indigo-100 text-indigo-700',
  printable: 'bg-pink-100 text-pink-700',
  ebook: 'bg-amber-100 text-amber-700',
  preset: 'bg-emerald-100 text-emerald-700',
  font: 'bg-purple-100 text-purple-700',
  course: 'bg-orange-100 text-orange-700',
  'notion-template': 'bg-blue-100 text-blue-700',
  'digital-art': 'bg-rose-100 text-rose-700',
  audio: 'bg-teal-100 text-teal-700',
  other: 'bg-gray-100 text-gray-600',
};

export const PLATFORM_COLORS: Record<PlatformName, string> = {
  Gumroad: 'bg-green-100 text-green-700',
  Etsy: 'bg-orange-100 text-orange-700',
  Shopify: 'bg-emerald-100 text-emerald-700',
  Payhip: 'bg-blue-100 text-blue-700',
  Lemonsqueezy: 'bg-yellow-100 text-yellow-700',
  'Creative Market': 'bg-purple-100 text-purple-700',
  'Personal Site': 'bg-gray-100 text-gray-600',
};

export const STATUS_COLORS: Record<ProductStatus, string> = {
  live: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-amber-100 text-amber-700',
  retired: 'bg-gray-100 text-gray-500',
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-rose-100 text-rose-700',
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

export const TOOL_OPTIONS = [
  'Canva', 'Figma', 'Notion', 'Adobe Illustrator', 'Adobe InDesign',
  'Adobe Lightroom', 'Procreate', 'Google Sheets', 'GarageBand',
  'DaVinci Resolve', 'Loom', 'Glyphs App',
];
