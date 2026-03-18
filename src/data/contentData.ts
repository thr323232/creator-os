export interface ContentHook {
  id: string;
  category: string;
  text: string;
  platform: string;
}

export interface CaptionTemplate {
  id: string;
  platform: 'Instagram' | 'TikTok' | 'Pinterest' | 'Email';
  type: string;
  subject?: string;
  body: string;
}

export interface CalendarWeek {
  week: number;
  theme: string;
  emoji: string;
  focus: string;
  tasks: string[];
}

export interface HashtagSet {
  id: string;
  category: string;
  platform: 'Instagram' | 'TikTok';
  tags: string[];
  etsyKeywords?: string[];
}

export const HOOK_BANK: ContentHook[] = [
  // Awareness hooks
  {
    id: 'h1',
    category: 'Awareness',
    platform: 'TikTok / Reels',
    text: 'Watch me create a digital product in 4 hours that earns money while I sleep 🌙',
  },
  {
    id: 'h2',
    category: 'Awareness',
    platform: 'TikTok / Reels',
    text: 'The digital products making the most money right now (and how to make them)',
  },
  {
    id: 'h3',
    category: 'Awareness',
    platform: 'Any',
    text: 'If you have Canva and a few hours, you could start earning passive income this week ✨',
  },
  {
    id: 'h4',
    category: 'Awareness',
    platform: 'TikTok / Reels',
    text: 'Save this if you want to start a digital product business in 2026 📌',
  },
  // Social proof hooks
  {
    id: 'h5',
    category: 'Social Proof',
    platform: 'TikTok / Reels',
    text: 'POV: you wake up to a sale notification and you were asleep when it happened 🎉',
  },
  {
    id: 'h6',
    category: 'Social Proof',
    platform: 'Any',
    text: 'I made £[X] this month selling [product type] on Etsy — here\'s exactly how',
  },
  {
    id: 'h7',
    category: 'Social Proof',
    platform: 'TikTok / Reels',
    text: 'My first digital product sale came in 3 days after listing — here\'s what I did differently',
  },
  {
    id: 'h8',
    category: 'Social Proof',
    platform: 'Any',
    text: 'Passive income check ✅ Another sale came in while I was at work',
  },
  // Behind the scenes
  {
    id: 'h9',
    category: 'Behind the Scenes',
    platform: 'TikTok / Reels',
    text: 'Come create a [template/Notion template/preset] with me ✨ start to finish',
  },
  {
    id: 'h10',
    category: 'Behind the Scenes',
    platform: 'TikTok / Reels',
    text: 'Behind the scenes: creating my latest Etsy digital download from scratch',
  },
  {
    id: 'h11',
    category: 'Behind the Scenes',
    platform: 'Any',
    text: 'The realistic process of launching a digital product — no sugarcoating',
  },
  // Educational hooks
  {
    id: 'h12',
    category: 'Educational',
    platform: 'Any',
    text: 'Things I wish I knew before selling digital products on Etsy 👇',
  },
  {
    id: 'h13',
    category: 'Educational',
    platform: 'TikTok / Reels',
    text: 'The reason most digital products don\'t sell (and the easy fix)',
  },
  {
    id: 'h14',
    category: 'Educational',
    platform: 'Any',
    text: '3 digital products that take under 6 hours to make and sell for £10–£30',
  },
  {
    id: 'h15',
    category: 'Educational',
    platform: 'TikTok / Reels',
    text: 'How I research digital product ideas before spending a single hour making them',
  },
];

export const CAPTION_TEMPLATES: CaptionTemplate[] = [
  // Instagram
  {
    id: 'c1',
    platform: 'Instagram',
    type: 'New Product Launch',
    body: `✨ It's here!

[Product name] is now live and I'm so excited to share this one with you.

[1-2 sentences about what it is and who it's for]

Whether you're [niche/use case], this is going to save you [time/effort/money] and help you [outcome].

Tap the link in my bio to grab it → it's only £[price] and it's an instant download, so you'll have it in seconds.

🔗 Link in bio
#digitaldownload #[yourniche] #[category]`,
  },
  {
    id: 'c2',
    platform: 'Instagram',
    type: 'Behind the Scenes',
    body: `Behind the scenes of creating my latest digital product 👀

I've been working on [product name] for the past [time] and I'm finally ready to show you what went into it.

Here's what the process looked like:
→ [Step 1 teaser]
→ [Step 2 teaser]
→ [Step 3 teaser]

Full launch coming [date/soon] — save this post so you don't miss it! 🔔

What type of digital products do you want to see me create next? Drop it in the comments 👇`,
  },
  {
    id: 'c3',
    platform: 'Instagram',
    type: 'Social Proof',
    body: `Real talk: I wasn't sure anyone would buy this 😅

But [product name] has now been downloaded [X] times and the messages I'm getting are making my whole week.

A customer just told me: "[paraphrase a review or DM]"

That's exactly why I made this.

If you've been thinking about grabbing it — this is your sign 🙌 Link in bio, it's only £[price].`,
  },
  {
    id: 'c4',
    platform: 'Instagram',
    type: 'Limited Time Sale',
    body: `⏳ Sale ends [date/Sunday at midnight]

[Product name] is [X]% off right now — this is the only time I'm doing this price.

Normal price: £[full price]
Sale price: £[sale price]

→ Tap the link in my bio to grab it before it goes back up.

No code needed, discount is already applied. ✨`,
  },
  // TikTok
  {
    id: 'c5',
    platform: 'TikTok',
    type: 'New Product Launch',
    body: `just dropped something I've been working on for weeks 👀

[Product name] is officially live — it's a [brief description] and it's only £[price] as an instant download.

link in bio if you want it! 🔗

#digitalproducts #[niche] #passiveincome #[category]`,
  },
  {
    id: 'c6',
    platform: 'TikTok',
    type: 'Behind the Scenes',
    body: `come make a digital product with me ✨

this is [product name] — took me about [time] to create and it's now live on [platform]

the whole process felt [feeling] but I'm so glad I did it 🙌

#digitaldownload #[niche] #sidehustle #canva`,
  },
  {
    id: 'c7',
    platform: 'TikTok',
    type: 'Educational',
    body: `3 things that actually helped my digital product sales 👇

1️⃣ [tip]
2️⃣ [tip]
3️⃣ [tip]

if you're selling on [platform] or thinking about starting — save this!

#etsyseller #digitalproducts #sidehustle #passiveincome`,
  },
  // Pinterest
  {
    id: 'c8',
    platform: 'Pinterest',
    type: 'Product Pin',
    body: `[Product name] — instant digital download

[1 sentence describing what it is and who it's for]. Editable in [tool], instant download, print at home or use digitally.

✔ [Feature 1]
✔ [Feature 2]
✔ [Feature 3]

Perfect for [niche/use case]. Available now on [platform] — find the link at [your shop/site].

Keywords: [keyword 1], [keyword 2], [keyword 3], digital download, instant download, printable`,
  },
  {
    id: 'c9',
    platform: 'Pinterest',
    type: 'Educational Pin',
    body: `How to start selling digital products on Etsy in 2026

Step 1: Choose a product idea ([link to guide])
Step 2: Create it in Canva or Notion
Step 3: Create a mockup with Smartmockups
Step 4: Write a keyword-rich listing title
Step 5: Publish and promote on Pinterest & TikTok

Save this for your side hustle journey 📌

Keywords: how to sell digital products, etsy digital downloads, passive income ideas, digital products to sell`,
  },
  // Email
  {
    id: 'c10',
    platform: 'Email',
    type: 'Launch Email',
    subject: '✨ It\'s finally here — [Product name]',
    body: `Hi [first name],

I've been hinting at this one for a while — and it's finally ready.

[Product name] is now live.

[2-3 sentences explaining what it is, who it's for, and the main benefit]

Here's what's included:
• [Feature/item 1]
• [Feature/item 2]
• [Feature/item 3]

It's only £[price] and you'll get instant access the moment you purchase.

→ [Get [Product name] here]([link])

As always, if you have any questions just reply to this email — I read every one.

[Your name]

P.S. [Optional: launch discount / limited time offer / bonus]`,
  },
  {
    id: 'c11',
    platform: 'Email',
    type: 'Last Chance / Urgency',
    subject: '⏳ Last chance — [discount/offer] ends tonight',
    body: `Hi [first name],

Quick reminder — the [launch price / discount / bonus] on [Product name] disappears at midnight tonight.

After that, it goes back to £[full price].

If you've been on the fence, this is the moment.

→ [Grab it before the price goes up]([link])

Here's a quick reminder of what you get:
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]

See you on the other side,
[Your name]`,
  },
];

export const CONTENT_CALENDAR: CalendarWeek[] = [
  {
    week: 1,
    theme: 'Build Anticipation',
    emoji: '👀',
    focus: 'Tease the product — create curiosity before you launch.',
    tasks: [
      'Post a "something\'s coming" story or reel showing a blurred preview',
      'Share a "why I\'m making this" post — tell the story behind it',
      'Run a poll: "Would you use [product]?" to validate and build anticipation',
      'Email your list with a teaser and early-bird invite',
      'Pin a "coming soon" graphic on Pinterest with your keywords',
    ],
  },
  {
    week: 2,
    theme: 'Launch Week',
    emoji: '🚀',
    focus: 'Go live and make noise across every channel.',
    tasks: [
      'Day 1: Publish the listing and announce across all platforms simultaneously',
      'Post a 60-second demo or walkthrough reel showing the product in use',
      'Share the "before and after" — what life looks like without vs. with your product',
      'Send your launch email to your list with a direct link',
      'Respond to every comment, DM, and question within 24 hours',
      'End the week with a "last chance for launch price" reminder post',
    ],
  },
  {
    week: 3,
    theme: 'Nurture & Social Proof',
    emoji: '💬',
    focus: 'Build trust with real results and community engagement.',
    tasks: [
      'Share a customer review, DM, or early feedback (ask buyers for a quick comment)',
      'Post a "how customers are using it" follow-up — real use cases convert',
      'Create an FAQ post or video answering the top 3 questions you\'ve received',
      'Go behind the scenes on how you created it — process content builds trust',
      'Email your list with a social proof update and a gentle nudge to purchase',
    ],
  },
  {
    week: 4,
    theme: 'Repurpose & Grow',
    emoji: '♻️',
    focus: 'Squeeze more out of what you\'ve already made, and plant seeds for next time.',
    tasks: [
      'Turn your best-performing post into a Pinterest pin with keywords in the description',
      'Repurpose your launch reel into a YouTube Short or Instagram Story carousel',
      'Write a longer "what I learned from launching this product" piece for your blog or email',
      'Start teasing your next product — keep momentum going',
      'Review your listing analytics: clicks, views, and conversion rate. Tweak the title or thumbnail if needed.',
    ],
  },
];

export const HASHTAG_SETS: HashtagSet[] = [
  {
    id: 'hs1',
    category: 'Templates (General)',
    platform: 'Instagram',
    tags: ['#canvatemplates', '#digitaltemplate', '#socialmediatemplates', '#contentcreator', '#smallbusiness', '#digitaldownload', '#graphicdesign', '#brandingdesign', '#templatedesign', '#creativeentrepreneur', '#passiveincome', '#etsyseller', '#digitalproducts'],
    etsyKeywords: ['canva social media template', 'instagram template bundle', 'editable canva template', 'social media template pack', 'content creator template'],
  },
  {
    id: 'hs2',
    category: 'Templates (General)',
    platform: 'TikTok',
    tags: ['#canva', '#canvatutorial', '#canvatemplate', '#digitalproducts', '#sidehustle', '#passiveincome', '#etsyseller', '#digitaldownload', '#contentcreator', '#smallbusiness'],
  },
  {
    id: 'hs3',
    category: 'Printables',
    platform: 'Instagram',
    tags: ['#printable', '#printables', '#printabledesign', '#instantdownload', '#etsyprintable', '#digitalprint', '#printableplanner', '#homeprintable', '#wallartprintable', '#bulletjournal', '#planneraddicts', '#etsyshop', '#digitaldownload'],
    etsyKeywords: ['printable planner pages', 'instant download printable', 'digital printable wall art', 'printable budget tracker', 'letter size printable'],
  },
  {
    id: 'hs4',
    category: 'Printables',
    platform: 'TikTok',
    tags: ['#printables', '#bulletjournal', '#plannergirlies', '#etsyprintable', '#digitaldownload', '#sidehustle', '#passiveincome', '#habittracker', '#planwithme'],
  },
  {
    id: 'hs5',
    category: 'Presets',
    platform: 'Instagram',
    tags: ['#lightroompresets', '#photoediting', '#presets', '#lightroomfilter', '#mobilepresets', '#photographypresets', '#editingtips', '#instagrampresets', '#aestheticpresets', '#filmpresets', '#moodypresets', '#vscopresets'],
    etsyKeywords: ['lightroom preset bundle', 'lightroom mobile presets dng', 'moody film preset', 'instagram photo preset', 'portrait lightroom preset'],
  },
  {
    id: 'hs6',
    category: 'Presets',
    platform: 'TikTok',
    tags: ['#lightroompresets', '#photoediting', '#presets', '#mobilepresets', '#editingtok', '#photographytok', '#lightroomtutorial', '#beforeandafter'],
  },
  {
    id: 'hs7',
    category: 'Notion Templates',
    platform: 'Instagram',
    tags: ['#notion', '#notiontemplate', '#notionplanner', '#notionsetup', '#productivity', '#productivityhacks', '#digitalplanner', '#secondbrain', '#notionworkspace', '#lifeOS', '#notionforbeginners'],
    etsyKeywords: ['notion template', 'notion life OS', 'notion habit tracker', 'notion planner template', 'notion second brain template'],
  },
  {
    id: 'hs8',
    category: 'Notion Templates',
    platform: 'TikTok',
    tags: ['#notion', '#notiontok', '#notiontemplate', '#productivity', '#studytok', '#planwithme', '#digitalplanner', '#notionsetup'],
  },
  {
    id: 'hs9',
    category: 'Digital Art & Brushes',
    platform: 'Instagram',
    tags: ['#procreate', '#procreatebrushes', '#digitalart', '#digitaldrawing', '#digitalillustration', '#procreateartist', '#ipadart', '#digitalbrushs', '#creativemarket', '#artistsoninstagram'],
    etsyKeywords: ['procreate brush set', 'procreate lettering brush', 'procreate watercolour brushes', 'procreate texture brush', 'ipad procreate brushes'],
  },
  {
    id: 'hs10',
    category: 'General Digital Products',
    platform: 'Instagram',
    tags: ['#digitalproducts', '#digitaldownload', '#passiveincome', '#sidehustle', '#onlinebusiness', '#digitalbusiness', '#makemoneyonline', '#creativeentrepreneur', '#etsydigital', '#sellingonline'],
    etsyKeywords: ['digital download', 'instant download', 'digital product', 'editable template', 'commercial use digital'],
  },
  {
    id: 'hs11',
    category: 'General Digital Products',
    platform: 'TikTok',
    tags: ['#digitalproducts', '#sidehustle', '#passiveincome', '#makemoneyonline', '#etsyseller', '#digitaldownload', '#onlineincome', '#sidehustleideas', '#digitalbusiness', '#earnmoney'],
  },
];
