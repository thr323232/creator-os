// ── PRINT-ON-DEMAND ──────────────────────────────────────────────────────────

export interface PodPlatform {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  pros: string[];
  cons: string[];
  fees: string;
  fulfillmentTime: string;
  ukShipping: string;
  bestFor: string;
  productTypes: string[];
  integration: string;
}

export const POD_PLATFORMS: PodPlatform[] = [
  {
    id: 'pod-printful',
    name: 'Printful',
    emoji: '🖨️',
    tagline: 'Premium quality, global fulfilment',
    pros: [
      'No minimum order — print one item at a time',
      'UK & EU fulfilment centres (faster delivery)',
      'High print quality and wide product range',
      'Integrates with Etsy, Shopify, WooCommerce',
    ],
    cons: [
      'Higher base costs than some competitors',
      'No free plan — you pay per item printed',
      'Profit margins can be thin on lower-priced items',
    ],
    fees: 'No monthly fee — pay per item (base cost deducted from sale price)',
    fulfillmentTime: '2–5 business days',
    ukShipping: 'UK fulfilment centre available — typically 3–7 days delivery',
    bestFor: 'T-shirts, hoodies, mugs, wall art, phone cases, tote bags',
    productTypes: ['Apparel', 'Homeware', 'Accessories', 'Wall Art', 'Stationery'],
    integration: 'Etsy, Shopify, WooCommerce, Wix, Squarespace',
  },
  {
    id: 'pod-printify',
    name: 'Printify',
    emoji: '🎨',
    tagline: 'Cheapest base costs, huge product range',
    pros: [
      'Largest product catalogue of any POD platform',
      'Multiple print providers — choose cheapest/fastest',
      'Free plan available',
      'Generally lower base costs than Printful',
    ],
    cons: [
      'Quality varies by print provider — test before selling',
      'No owned fulfilment centres (uses third parties)',
      'Customer service can be slower',
    ],
    fees: 'Free plan available. Premium: $29/mo (charged in USD) for 20% discount on all products',
    fulfillmentTime: '3–7 business days (varies by provider)',
    ukShipping: 'UK-based print providers available — filter by location when selecting',
    bestFor: 'Anyone wanting the lowest possible base cost to maximise margins',
    productTypes: ['Apparel', 'Homeware', 'Accessories', 'Stationery', 'Pet Products'],
    integration: 'Etsy, Shopify, WooCommerce, eBay, TikTok Shop',
  },
  {
    id: 'pod-redbubble',
    name: 'Redbubble',
    emoji: '🫧',
    tagline: 'Built-in marketplace — no shop needed',
    pros: [
      'Built-in buyer traffic — no marketing required to start',
      'Upload once, sell on 70+ product types automatically',
      'Free to join — no upfront costs',
      'Great for artists and illustrators',
    ],
    cons: [
      'Lower margins (Redbubble takes a large cut)',
      'You control markup only — base prices are fixed',
      'Highly competitive — hard to stand out',
      'No integration with your own shop',
    ],
    fees: 'Free to join — you set your markup % on top of their base price',
    fulfillmentTime: '3–10 business days',
    ukShipping: 'Ships to UK — fulfilment from nearest facility',
    bestFor: 'Artists and illustrators wanting passive income from existing artwork',
    productTypes: ['Apparel', 'Stickers', 'Prints', 'Phone Cases', 'Homeware', 'Stationery'],
    integration: 'Standalone marketplace — no external integration',
  },
  {
    id: 'pod-merch-amazon',
    name: 'Merch by Amazon',
    emoji: '📦',
    tagline: 'Tap into Amazon\'s massive audience',
    pros: [
      'Access to millions of Amazon shoppers',
      'No upfront cost — Amazon handles everything',
      'Prime delivery available on your products',
      'Very passive once designs are uploaded',
    ],
    cons: [
      'Invite/approval required — waitlist can be long',
      'Limited to mainly apparel (T-shirts, hoodies)',
      'Lower royalties compared to running your own shop',
      'No customer relationship — Amazon owns the buyer',
    ],
    fees: 'Free — Amazon takes their cut; you earn royalties per sale',
    fulfillmentTime: '2–5 business days (Prime eligible)',
    ukShipping: 'Amazon UK fulfilment — fast Prime delivery available',
    bestFor: 'T-shirts and hoodies targeting Amazon search traffic',
    productTypes: ['T-shirts', 'Hoodies', 'Sweatshirts', 'Tank Tops', 'PopSockets'],
    integration: 'Standalone — upload designs directly to Amazon',
  },
  {
    id: 'pod-gelato',
    name: 'Gelato',
    emoji: '🌍',
    tagline: 'Local printing worldwide, lowest shipping',
    pros: [
      'Print providers in 33 countries — very low shipping costs',
      'Carbon-neutral fulfilment option',
      'Strong for wall art and photo books',
      'UK printing available for fast local delivery',
    ],
    cons: [
      'Smaller product range than Printful/Printify',
      'Less brand recognition among sellers',
      'Fewer integrations than competitors',
    ],
    fees: 'Free plan available. Gelato+ from $14/mo (charged in USD) for discounts',
    fulfillmentTime: '2–4 business days',
    ukShipping: 'UK print partner available — typically 2–4 day delivery',
    bestFor: 'Wall art, photo books, calendars, greeting cards',
    productTypes: ['Wall Art', 'Photo Books', 'Greeting Cards', 'Calendars', 'Apparel'],
    integration: 'Etsy, Shopify, WooCommerce, Squarespace',
  },
];

export const POD_CHECKLIST = [
  { id: 'poc1', step: 'Choose your platform', detail: 'Pick 1–2 POD platforms based on product type and where you want to sell (Etsy, Shopify, etc.)' },
  { id: 'poc2', step: 'Create your designs', detail: 'Use Canva, Illustrator, or Procreate. Check minimum resolution requirements (usually 300 DPI)' },
  { id: 'poc3', step: 'Order a sample', detail: 'Always order a physical sample before selling — check colour, print quality and sizing' },
  { id: 'poc4', step: 'Set up your store', detail: 'Connect your POD platform to Etsy or Shopify using their official integration' },
  { id: 'poc5', step: 'Create your mockups', detail: 'Use the platform\'s mockup generator or Smartmockups for lifestyle shots that convert' },
  { id: 'poc6', step: 'Research and price correctly', detail: 'Check competitor prices. Aim for a minimum 30–40% margin after all fees' },
  { id: 'poc7', step: 'Write SEO-optimised listings', detail: 'Use keyword-rich titles and descriptions. Research what buyers actually search for' },
  { id: 'poc8', step: 'Promote on social media', detail: 'Show your products being worn/used. Lifestyle content outperforms flat lays on TikTok' },
];

export const POD_MARGIN_TIPS = [
  'Aim for at least 30% profit margin after platform fees and fulfilment costs',
  'Bundle products (e.g. matching mug + print) to increase average order value',
  'Niche designs consistently outsell generic ones — go deep, not broad',
  'Seasonal collections (Christmas, Valentine\'s, Mother\'s Day) spike sales significantly',
];

// ── DROPSHIPPING ────────────────────────────────────────────────────────────

export interface DropshipSupplier {
  id: string;
  name: string;
  emoji: string;
  origin: string;
  ukStock: boolean;
  minOrder: string;
  avgShippingToUK: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  categories: string[];
}

export interface DropshipPlatform {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  pros: string[];
  cons: string[];
  fees: string;
  bestFor: string;
}

export const DROPSHIP_SELLING_PLATFORMS: DropshipPlatform[] = [
  {
    id: 'ds-shopify',
    name: 'Shopify',
    emoji: '🟢',
    tagline: 'Most popular dropshipping platform',
    pros: [
      'Huge ecosystem of dropshipping apps (DSers, AutoDS, Zendrop)',
      'Professional storefront — full branding control',
      'Scalable from side hustle to full business',
      'Strong analytics and inventory management',
    ],
    cons: [
      'Monthly subscription cost ($39+/mo, charged in USD)',
      'You drive all your own traffic',
      'Apps add up — budget for £30–80/mo in tools',
    ],
    fees: 'From $39/mo + 2.9% + $0.30 per transaction (charged in USD)',
    bestFor: 'Building a branded dropshipping store for long-term growth',
  },
  {
    id: 'ds-ebay',
    name: 'eBay',
    emoji: '🔵',
    tagline: 'Built-in UK buyer traffic',
    pros: [
      'Massive UK buyer base — no paid traffic needed to start',
      'Great for testing products before scaling',
      'No monthly fee on basic seller account',
      'Quick to list and start selling',
    ],
    cons: [
      '12.8% final value fee + £0.30 per order',
      'Race to the bottom on price — high competition',
      'Strict seller performance metrics',
      'Limited brand building',
    ],
    fees: '12.8% final value fee + £0.30 per order (UK rates)',
    bestFor: 'Testing new products and sourcing quick cash flow',
  },
  {
    id: 'ds-amazon',
    name: 'Amazon',
    emoji: '📦',
    tagline: 'Highest buyer trust, toughest competition',
    pros: [
      'Buyers already trust Amazon — high conversion rates',
      'FBA (Fulfilled by Amazon) option removes logistics headache',
      'Massive search volume for product discovery',
    ],
    cons: [
      'Referral fees typically 8–15% + closing fees',
      'Very competitive — difficult for new sellers',
      'Strict policies — easy to get suspended',
      'Professional account required: £25/mo',
    ],
    fees: '8–15% referral fee + £25/mo Professional account',
    bestFor: 'Established sellers wanting to scale an existing product range',
  },
  {
    id: 'ds-tiktok',
    name: 'TikTok Shop',
    emoji: '🎵',
    tagline: 'Viral potential meets instant checkout',
    pros: [
      'Content + checkout in one platform — huge impulse purchase potential',
      'Affiliate creator programme — others promote your products',
      'Growing rapidly in the UK',
      'Commission fees among the lowest (currently 5–8%)',
    ],
    cons: [
      'New platform — policies and fees changing rapidly',
      'Requires engaging short-form video content',
      'Order fulfilment and returns still maturing',
    ],
    fees: '5–8% commission per sale (UK rates, subject to change)',
    bestFor: 'Visually compelling, impulse-buy products. Ideal if you already make TikTok content',
  },
];

export const DROPSHIP_SUPPLIERS: DropshipSupplier[] = [
  {
    id: 'sup-avasam',
    name: 'Avasam',
    emoji: '🇬🇧',
    origin: 'UK',
    ukStock: true,
    minOrder: 'No minimum',
    avgShippingToUK: '1–3 business days',
    pros: [
      'UK-based — fast domestic shipping, no customs issues',
      'Automated order fulfilment',
      'Wide range of verified UK suppliers',
      'Integrates with eBay, Amazon, Shopify',
    ],
    cons: [
      'Subscription required (from £9.99/mo)',
      'Smaller catalogue than AliExpress',
    ],
    bestFor: 'UK sellers wanting fast, hassle-free domestic fulfilment',
    categories: ['Electronics', 'Home & Garden', 'Pet Supplies', 'Health & Beauty', 'Sports'],
  },
  {
    id: 'sup-spocket',
    name: 'Spocket',
    emoji: '🌍',
    origin: 'EU / US / UK',
    ukStock: true,
    minOrder: 'No minimum',
    avgShippingToUK: '3–7 business days (EU); 5–14 days (US)',
    pros: [
      'UK and EU supplier focus — faster than AliExpress',
      'High-quality, branded products available',
      'Automated fulfilment with tracking',
      'Sample orders available at discount',
    ],
    cons: [
      'Subscription required (from $39.99/mo, charged in USD)',
      'Higher product costs than AliExpress',
    ],
    bestFor: 'Premium-positioned stores wanting faster shipping and better quality',
    categories: ['Fashion', 'Beauty', 'Homeware', 'Jewellery', 'Accessories'],
  },
  {
    id: 'sup-cj',
    name: 'CJ Dropshipping',
    emoji: '🌐',
    origin: 'China (with UK/EU warehouses)',
    ukStock: true,
    minOrder: 'No minimum',
    avgShippingToUK: '5–12 days (UK warehouse); 10–20 days (China)',
    pros: [
      'Very competitive pricing — good margins',
      'UK warehouse option for faster delivery',
      'Free to use — no monthly fee',
      'Private label and custom packaging available',
    ],
    cons: [
      'Quality control can be inconsistent — always order samples',
      'Customer support can be slow',
    ],
    bestFor: 'Sellers wanting low cost base prices and custom packaging options',
    categories: ['Electronics', 'Fashion', 'Beauty', 'Toys', 'Kitchen', 'Fitness'],
  },
  {
    id: 'sup-aliexpress',
    name: 'AliExpress',
    emoji: '🏭',
    origin: 'China',
    ukStock: false,
    minOrder: 'No minimum',
    avgShippingToUK: '10–30 days (standard); 7–12 days (AliExpress Standard Shipping)',
    pros: [
      'Enormous product catalogue — nearly anything available',
      'No membership fee',
      'Great for product research and testing ideas cheaply',
    ],
    cons: [
      'Long shipping times — customer complaints likely',
      'Quality highly variable — must vet suppliers carefully',
      'Post-Brexit customs duties may apply on some orders',
    ],
    bestFor: 'Product research and testing before moving to a faster supplier',
    categories: ['Everything — widest catalogue available'],
  },
  {
    id: 'sup-modalyst',
    name: 'Modalyst',
    emoji: '👗',
    origin: 'US / EU',
    ukStock: false,
    minOrder: 'No minimum',
    avgShippingToUK: '7–14 days',
    pros: [
      'Fashion and lifestyle focus — high quality products',
      'Independent brands and designer items available',
      'Shopify and Wix integration',
    ],
    cons: [
      'More expensive than Asian suppliers',
      'Free plan limited to 25 products',
    ],
    bestFor: 'Fashion, accessories, and lifestyle stores targeting a premium buyer',
    categories: ['Fashion', 'Accessories', 'Jewellery', 'Beauty', 'Home'],
  },
];

export const DROPSHIP_NICHES = [
  'Pet accessories', 'Home organisation', 'Fitness gear', 'Phone cases & accessories',
  'Kitchen gadgets', 'Car accessories', 'Baby & kids products', 'Eco-friendly products',
  'Travel accessories', 'Gaming accessories', 'Plant & garden tools', 'Desk organisation',
  'Candles & home fragrance', 'Personalised gifts', 'Self-care & wellness',
];

export const DROPSHIP_CHECKLIST = [
  { id: 'dsc1', step: 'Pick a niche', detail: 'Choose a focused niche you can market to — avoid "general stores" when starting out' },
  { id: 'dsc2', step: 'Research winning products', detail: 'Use TikTok, Pinterest Trends, and Amazon Best Sellers to find trending products with demand' },
  { id: 'dsc3', step: 'Find a reliable supplier', detail: 'Order samples before listing — check quality, packaging, and actual shipping times to the UK' },
  { id: 'dsc4', step: 'Set up your store', detail: 'Create a Shopify store (or eBay/TikTok Shop account) with a clean, niche-focused brand' },
  { id: 'dsc5', step: 'Calculate your margins', detail: 'Target minimum 25–35% profit margin after supplier cost, platform fees, and shipping' },
  { id: 'dsc6', step: 'Write your product listings', detail: 'Use benefits-led copy. Address the customer\'s pain point — don\'t just list features' },
  { id: 'dsc7', step: 'Test with organic content first', detail: 'Post TikTok and Instagram Reels showing the product in use before spending on paid ads' },
  { id: 'dsc8', step: 'Automate order fulfilment', detail: 'Use DSers, AutoDS, or your supplier\'s app so orders go to your supplier automatically' },
];

// ── AFFILIATE MARKETING ──────────────────────────────────────────────────────

export interface AffiliateProgram {
  id: string;
  name: string;
  emoji: string;
  category: 'software' | 'physical' | 'digital' | 'finance' | 'education';
  categoryLabel: string;
  commissionRate: string;
  cookieDays: number;
  paymentThreshold: string;
  bestFor: string;
  network: string;
  recurring: boolean;
}

export const AFFILIATE_PROGRAMS: AffiliateProgram[] = [
  // Software & Tools
  {
    id: 'af-canva',
    name: 'Canva',
    emoji: '🎨',
    category: 'software',
    categoryLabel: 'Design Tool',
    commissionRate: 'Up to £36 per Pro signup',
    cookieDays: 30,
    paymentThreshold: '£50',
    bestFor: 'Creators, designers, social media managers',
    network: 'Impact / Direct',
    recurring: false,
  },
  {
    id: 'af-notion',
    name: 'Notion',
    emoji: '📋',
    category: 'software',
    categoryLabel: 'Productivity',
    commissionRate: '50% of first payment',
    cookieDays: 90,
    paymentThreshold: '$10 (paid in USD)',
    bestFor: 'Productivity creators, students, freelancers',
    network: 'Direct (Notion.so/affiliates)',
    recurring: false,
  },
  {
    id: 'af-convertkit',
    name: 'Kit (ConvertKit)',
    emoji: '📧',
    category: 'software',
    categoryLabel: 'Email Marketing',
    commissionRate: '30% recurring monthly',
    cookieDays: 60,
    paymentThreshold: '$50 (paid in USD)',
    bestFor: 'Creators and bloggers who email-market',
    network: 'Direct (kit.com/affiliates)',
    recurring: true,
  },
  {
    id: 'af-beehiiv',
    name: 'Beehiiv',
    emoji: '🐝',
    category: 'software',
    categoryLabel: 'Newsletter Platform',
    commissionRate: '50% for 12 months',
    cookieDays: 30,
    paymentThreshold: '$10 (paid in USD)',
    bestFor: 'Newsletter creators and writers',
    network: 'Direct (beehiiv.com/affiliates)',
    recurring: true,
  },
  {
    id: 'af-shopify',
    name: 'Shopify',
    emoji: '🟢',
    category: 'software',
    categoryLabel: 'E-commerce',
    commissionRate: 'Up to £150 per referral',
    cookieDays: 30,
    paymentThreshold: '£25',
    bestFor: 'Business, e-commerce, and side hustle creators',
    network: 'Impact',
    recurring: false,
  },
  {
    id: 'af-fiverr',
    name: 'Fiverr',
    emoji: '💚',
    category: 'digital',
    categoryLabel: 'Freelance Platform',
    commissionRate: '£15–150 CPA or 10% RevShare',
    cookieDays: 30,
    paymentThreshold: '$100 (paid in USD)',
    bestFor: 'Creators who talk about freelancing and side hustles',
    network: 'Direct (affiliates.fiverr.com)',
    recurring: false,
  },
  // Physical products
  {
    id: 'af-amazon',
    name: 'Amazon Associates',
    emoji: '📦',
    category: 'physical',
    categoryLabel: 'Physical Products',
    commissionRate: '1–12% (category dependent)',
    cookieDays: 1,
    paymentThreshold: '£25',
    bestFor: 'Any content that references physical products',
    network: 'Amazon Associates (UK)',
    recurring: false,
  },
  {
    id: 'af-awin',
    name: 'Awin',
    emoji: '🌐',
    category: 'physical',
    categoryLabel: 'Multi-brand Network',
    commissionRate: 'Varies by brand (typically 3–15%)',
    cookieDays: 30,
    paymentThreshold: '£20',
    bestFor: 'Bloggers and creators with broad audiences — access 25,000+ brands',
    network: 'Awin Network',
    recurring: false,
  },
  // Digital products
  {
    id: 'af-creative-market',
    name: 'Creative Market',
    emoji: '🎨',
    category: 'digital',
    categoryLabel: 'Digital Assets',
    commissionRate: '10% per referred sale',
    cookieDays: 30,
    paymentThreshold: '$20 (paid in USD)',
    bestFor: 'Design creators who review fonts, templates, and brushes',
    network: 'Direct (creativemarket.com/affiliates)',
    recurring: false,
  },
  {
    id: 'af-gumroad',
    name: 'Gumroad',
    emoji: '💚',
    category: 'digital',
    categoryLabel: 'Digital Products',
    commissionRate: 'Varies — set by the product creator',
    cookieDays: 30,
    paymentThreshold: '$10 (paid in USD)',
    bestFor: 'Promoting other creators\' products you genuinely recommend',
    network: 'Built into each Gumroad product',
    recurring: false,
  },
  // Finance / Education
  {
    id: 'af-skillshare',
    name: 'Skillshare',
    emoji: '📚',
    category: 'education',
    categoryLabel: 'Online Learning',
    commissionRate: '40% of first membership payment',
    cookieDays: 30,
    paymentThreshold: '$10 (paid in USD)',
    bestFor: 'Creators in design, art, writing, or business niches',
    network: 'Impact',
    recurring: false,
  },
];

export const AFFILIATE_CONTENT_IDEAS: {
  category: string;
  hooks: string[];
}[] = [
  {
    category: 'Product Review',
    hooks: [
      '"I\'ve been using [tool] for 6 months — here\'s my honest review"',
      '"Is [tool] worth it? I tested it so you don\'t have to"',
      '"[Tool] vs [Tool] — which one should you actually buy?"',
      '"The tools I use every single day in my business (with links)"',
    ],
  },
  {
    category: 'Tutorial',
    hooks: [
      '"How to [achieve outcome] using [tool] — step by step"',
      '"Watch me set up [tool] in 10 minutes"',
      '"The [tool] feature that changed how I work"',
      '"3 things you can do with [tool] that most people don\'t know"',
    ],
  },
  {
    category: '"Tool I Use"',
    hooks: [
      '"My full creator toolkit — everything I use to run my business"',
      '"The apps on my phone that help me make money"',
      '"What\'s in my digital product business stack"',
      '"Tools that saved me the most time this year"',
    ],
  },
  {
    category: 'Comparison',
    hooks: [
      '"Which platform should you sell on? [A] vs [B] vs [C]"',
      '"I tried every email platform — here\'s the honest truth"',
      '"Cheap vs expensive: does it actually matter for [tool category]?"',
      '"The best tools for [specific outcome] at every budget"',
    ],
  },
];

export const AFFILIATE_CHECKLIST = [
  { id: 'afc1', step: 'Choose 3–5 programs to start', detail: 'Focus on tools and products you already use and genuinely recommend — authenticity converts best' },
  { id: 'afc2', step: 'Apply and get approved', detail: 'Most programs approve within 1–3 days. Some (Amazon, Awin) approve instantly' },
  { id: 'afc3', step: 'Create a "Resources" or "Tools I Use" page', detail: 'A dedicated page on your site or Linktree with your affiliate links performs consistently well' },
  { id: 'afc4', step: 'Disclose affiliate links', detail: 'UK law (ASA) requires you to clearly disclose when you earn commission. Use "Ad" or "Affiliate link" labels' },
  { id: 'afc5', step: 'Create content that leads to the product', detail: 'Reviews, tutorials, and comparison posts convert far better than direct promotion' },
  { id: 'afc6', step: 'Track your top-performing links', detail: 'Most networks provide click and conversion data — double down on what\'s working' },
  { id: 'afc7', step: 'Build in links naturally', detail: 'Mention tools in your newsletter, videos, and posts wherever they\'re genuinely relevant' },
  { id: 'afc8', step: 'Stack recurring commissions', detail: 'Prioritise programs with recurring monthly commissions (Kit, Beehiiv) — these compound over time' },
];
