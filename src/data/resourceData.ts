import type { PlatformInfo } from '../types';

export const PLATFORMS: PlatformInfo[] = [
  {
    name: 'Etsy',
    emoji: '🛍️',
    tagline: 'Built-in marketplace traffic',
    pros: [
      'Massive built-in audience of buyers',
      'Great for printables, templates & art',
      'SEO-driven discovery (no following needed)',
      'Easy setup — live in under an hour',
    ],
    cons: [
      '6.5% transaction fee + listing fees',
      'Competitive — you must nail SEO',
      'Limited branding and customisation',
      'Algorithm can shift and hurt visibility',
    ],
    fees: '$0.20 listing fee + 6.5% transaction fee',
    bestFor: 'Printables, templates, digital art, fonts',
    color: 'orange',
  },
  {
    name: 'Gumroad',
    emoji: '💚',
    tagline: 'Creator-first simplicity',
    pros: [
      'No monthly fee (10% flat on free plan)',
      'Beautiful product pages out of the box',
      'Supports subscriptions and memberships',
      'Built-in email list for buyers',
    ],
    cons: [
      '10% fee on free plan (drops with volume)',
      'No built-in search traffic — you drive it',
      'Less polished storefront than competitors',
    ],
    fees: '10% fee (free plan) or from $10/mo for lower fees',
    bestFor: 'Ebooks, courses, software, presets, templates',
    color: 'green',
  },
  {
    name: 'Payhip',
    emoji: '💙',
    tagline: 'Low fees, powerful features',
    pros: [
      'Free plan with just 5% transaction fee',
      'Built-in affiliate programme',
      'Sell courses, memberships & coaching too',
      'Coupon codes and upsells included',
    ],
    cons: [
      'Smaller community than Gumroad',
      'No built-in discovery/search',
      'UI can feel dated',
    ],
    fees: 'Free plan: 5% fee. Plus plan: $29/mo, 2% fee',
    bestFor: 'Ebooks, courses, memberships, digital bundles',
    color: 'blue',
  },
  {
    name: 'Lemonsqueezy',
    emoji: '🍋',
    tagline: 'Modern checkout experience',
    pros: [
      'Beautiful, conversion-optimised checkout',
      'Handles VAT/taxes globally',
      'Great for SaaS and software licences',
      'Upsells and order bumps built in',
    ],
    cons: [
      '5% + $0.50 transaction fee',
      'Newer platform — smaller community',
      'Not ideal for low-priced products',
    ],
    fees: '5% + $0.50 per transaction',
    bestFor: 'Software, SaaS, premium digital products',
    color: 'yellow',
  },
  {
    name: 'Creative Market',
    emoji: '🎨',
    tagline: 'Premium creative marketplace',
    pros: [
      'Marketplace with design-savvy buyers',
      'Higher price points accepted',
      'Great for fonts, brushes, templates',
      'Built-in audience of designers',
    ],
    cons: [
      'Curated — requires approval to sell',
      '40% commission taken by platform',
      'Slower approval process',
    ],
    fees: '40% platform commission',
    bestFor: 'Fonts, brushes, Procreate assets, UI kits',
    color: 'purple',
  },
  {
    name: 'Shopify',
    emoji: '🟢',
    tagline: 'Full control e-commerce',
    pros: [
      'Complete branding control',
      'Powerful for scaling a product business',
      'Supports physical + digital products',
      'Huge app ecosystem',
    ],
    cons: [
      'Monthly fee from $39/mo',
      'Requires the Digital Downloads app',
      'More complex setup',
      'You drive all your own traffic',
    ],
    fees: 'From $39/mo + 2.9% + $0.30 per transaction',
    bestFor: 'Established businesses with multiple products',
    color: 'green',
  },
  {
    name: 'Personal Site',
    emoji: '🌐',
    tagline: 'Your brand, your rules',
    pros: [
      'Zero platform fees (just hosting)',
      'Full creative control',
      'Build your own audience & SEO',
      'No risk of account deactivation',
    ],
    cons: [
      'Requires technical setup',
      'You handle all payment integration',
      'No built-in traffic or discovery',
    ],
    fees: 'Hosting cost only (~$5–20/mo)',
    bestFor: 'Established creators with their own audience',
    color: 'gray',
  },
];

export const PRICING_TIPS = [
  {
    title: 'Start higher than you think',
    body: 'Most new creators underprice. If you spend 6 hours making a template pack, $7 is not fair. Start at $15–25 and see what converts.',
  },
  {
    title: 'Use charm pricing',
    body: '$9, $17, $27, $47 convert better than round numbers. The psychological effect is real.',
  },
  {
    title: 'Bundle for higher AOV',
    body: 'A single template at $9 vs a "5-pack bundle" at $27. Bundles increase average order value dramatically.',
  },
  {
    title: 'Increase price as reviews grow',
    body: 'Launch at a slightly lower price, collect 10+ reviews, then raise the price. Social proof justifies a premium.',
  },
  {
    title: 'Test with a limited-time launch discount',
    body: 'Offer 30% off for the first week to drive early sales and reviews, then revert to your full price.',
  },
];

export const MOCKUP_TIPS = [
  {
    title: 'Use Smartmockups or Placeit',
    body: 'These tools let you drop your design onto tablets, laptops, phone screens, or frames in seconds. No Photoshop needed.',
  },
  {
    title: 'Show it in context',
    body: 'A planner printed on a desk next to a coffee, or an Instagram template displayed on a phone. Context sells better than white backgrounds.',
  },
  {
    title: 'Show all slides or pages',
    body: 'Use a carousel or collage image to show every page of your product — don\'t just show the cover.',
  },
  {
    title: 'Match the aesthetic to your niche',
    body: 'A luxury brand template pack should have a luxury-looking mockup. Align the mood of your images to the product.',
  },
];

export const SEO_TIPS = [
  {
    title: 'Lead with keywords in your title',
    body: 'On Etsy, put your most important keywords first. e.g. "Printable Budget Planner | A4 + Letter | Instant Download" beats "The Budget Buddy".',
  },
  {
    title: 'Use all 13 Etsy tags',
    body: 'Each tag is a separate keyword opportunity. Use long-tail phrases customers actually search for.',
  },
  {
    title: 'Write a full description',
    body: 'Search engines index your listing description. Include keywords naturally, list what\'s included, and answer common buyer questions.',
  },
  {
    title: 'Renew listings strategically',
    body: 'Renewing a listing gives it a temporary boost in Etsy search. Renew your top products every few weeks.',
  },
];

export const AUDIENCE_TIPS = [
  {
    title: 'Pinterest for evergreen traffic',
    body: 'Pinterest drives traffic for months or years after posting. Create keyword-rich pins linking to your listings.',
  },
  {
    title: 'TikTok and Reels for viral potential',
    body: 'Show your product being made or used. "Watch me make this Notion template in 60 seconds" routinely goes viral.',
  },
  {
    title: 'Build an email list from day one',
    body: 'Offer a free mini-product or sample page in exchange for an email. Your list is the only audience you truly own.',
  },
  {
    title: 'Leverage communities',
    body: 'Reddit, Facebook Groups, and Discord communities around your niche are goldmines for early customers. Be helpful first, promote second.',
  },
];

export const LAUNCH_CHECKLIST = [
  { id: 'lc1', step: 'Create the product', detail: 'Finish your digital product to a quality you\'d be proud to sell' },
  { id: 'lc2', step: 'Create a mockup', detail: 'Use Smartmockups or Canva to place your design in a realistic scene' },
  { id: 'lc3', step: 'Write your listing', detail: 'Craft an SEO-rich title, description, and select relevant tags/categories' },
  { id: 'lc4', step: 'Set your price', detail: 'Research competitors, then price based on value — not just your time' },
  { id: 'lc5', step: 'Publish the listing', detail: 'Upload to your chosen platform and mark as active/live' },
  { id: 'lc6', step: 'Share on socials', detail: 'Post on Instagram, TikTok, Pinterest, and relevant communities' },
  { id: 'lc7', step: 'Collect your first review', detail: 'Ask early buyers for honest feedback to build social proof' },
  { id: 'lc8', step: 'Analyse and iterate', detail: 'After 30 days, check views vs. sales conversion and optimise your listing' },
];
