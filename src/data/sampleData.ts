import type { Product, SaleLog, ChartDataPoint } from '../types';

// Start empty — add your own products or use the suggestions in the Products tab
export const INITIAL_PRODUCTS: Product[] = [];

// No current-month sales pre-loaded — log your first sale to get started
export const INITIAL_SALE_LOGS: SaleLog[] = [];

export const MONTHLY_CHART_DATA: ChartDataPoint[] = [
  { label: 'Apr', revenue: 0 },
  { label: 'May', revenue: 0 },
  { label: 'Jun', revenue: 0 },
  { label: 'Jul', revenue: 0 },
  { label: 'Aug', revenue: 0 },
  { label: 'Sep', revenue: 0 },
  { label: 'Oct', revenue: 0 },
  { label: 'Nov', revenue: 0 },
  { label: 'Dec', revenue: 0 },
  { label: 'Jan', revenue: 0 },
  { label: 'Feb', revenue: 0 },
  { label: 'Mar', revenue: 0 },
];

export const WEEKLY_CHART_DATA: ChartDataPoint[] = [
  { label: 'Wk 1', revenue: 0 },
  { label: 'Wk 2', revenue: 0 },
  { label: 'Wk 3', revenue: 0 },
  { label: 'Wk 4', revenue: 0 },
  { label: 'Wk 5', revenue: 0 },
  { label: 'Wk 6', revenue: 0 },
  { label: 'Wk 7', revenue: 0 },
  { label: 'Wk 8', revenue: 0 },
];

export const DEFAULT_MONTHLY_GOAL = 300;
