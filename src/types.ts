export type Category =
  | 'template'
  | 'printable'
  | 'ebook'
  | 'preset'
  | 'font'
  | 'course'
  | 'notion-template'
  | 'digital-art'
  | 'audio'
  | 'other';

export type PlatformName =
  | 'Gumroad'
  | 'Etsy'
  | 'Shopify'
  | 'Payhip'
  | 'Lemonsqueezy'
  | 'Creative Market'
  | 'Personal Site';

export type ProductStatus = 'live' | 'draft' | 'retired';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type TabName = 'dashboard' | 'products' | 'guide' | 'resources';
export type RoadmapStatus = 'idea' | 'planning' | 'in-progress' | 'ready-to-launch';
export type SuggestionTag = 'trending' | 'high-demand' | 'beginner-friendly' | 'quick-win' | 'evergreen';

export interface Product {
  id: string;
  name: string;
  category: Category;
  platform: PlatformName;
  price: number;
  unitsSold: number;
  launchDate: string;
  status: ProductStatus;
}

export interface SaleLog {
  id: string;
  productId: string;
  units: number;
  date: string;
}

export interface RoadmapItem {
  id: string;
  sourceId?: string;
  name: string;
  category: Category;
  platform: PlatformName;
  price: number;
  description: string;
  status: RoadmapStatus;
  savedAt: string;
}

export interface GuideIdea {
  id: string;
  type: string;
  category: Category;
  description: string;
  niches: string[];
  tools: string[];
  timeToCreate: string;
  pricingMin: number;
  pricingMax: number;
  difficulty: Difficulty;
  demandRating: number;
  trending: boolean;
  launchChecklist: string[];
}

export interface PlatformInfo {
  name: PlatformName;
  emoji: string;
  tagline: string;
  pros: string[];
  cons: string[];
  fees: string;
  bestFor: string;
  color: string;
}

export interface ChartDataPoint {
  label: string;
  revenue: number;
}

export interface ProductSuggestion {
  id: string;
  name: string;
  category: Category;
  platform: PlatformName;
  price: number;
  description: string;
  tags: SuggestionTag[];
}
