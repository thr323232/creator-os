export type WorkflowPlatform = 'TikTok' | 'Instagram' | 'Pinterest' | 'Email';
export type IncomeStreamType = 'digital' | 'pod' | 'dropship' | 'affiliate';

export interface PlatformContent {
  platform: WorkflowPlatform;
  hook: string;
  script?: string; // TikTok/Reels only
  caption: string;
  hashtags: string[];
  imagePrompt: string;
}

export interface ProductWorkflow {
  id: string;
  incomeStream: IncomeStreamType;
  label: string;
  productExample: string;
  sellOn: string;
  priceExample: string;
  setupSteps: string[];
  content: PlatformContent[];
}

export const PRODUCT_WORKFLOWS: ProductWorkflow[] = [
  {
    id: 'wf-digital',
    incomeStream: 'digital',
    label: 'Digital Products',
    productExample: 'Aesthetic Notion Life OS Template',
    sellOn: 'Gumroad',
    priceExample: '£15',
    setupSteps: [
      'Design your full template in Notion — include Goals, Habits, Finance, Journal and a Projects tracker using linked databases',
      'Duplicate the template and grab the shareable Notion link — test it opens cleanly in a fresh browser',
      'Create 3–5 mockup screenshots in Canva: show the template on a laptop, an iPhone, and a lifestyle desk photo',
      'Set up your Gumroad listing with an SEO title, a short bullet-point description and upload your mockups',
      'Price at £15 to start — raise to £20 once you have 10+ reviews',
      'Record a 30-second Loom walkthrough of the template, then post as a TikTok/Reel',
    ],
    content: [
      {
        platform: 'TikTok',
        hook: 'I made £800 last month from a Notion template I built in one afternoon 👀',
        script:
          '1. Open with income screenshot (blurred for privacy) — tease the source\n2. Screen-record opening your Notion template — show the tabs animating, the linked databases, the aesthetic cover\n3. "Here\'s everything inside…" — quick walkthrough of each section (15 secs)\n4. "I listed this on Gumroad for £15" — show the product page\n5. CTA: "Link in bio — it\'s instant download" + point at camera',
        caption:
          'Passive income from a Notion template 🤍 I built this Life OS in one weekend and it\'s been selling ever since. Goals • Habits • Finance • Journal • Projects — all in one beautiful dashboard. Grab it at the link in my bio 🔗 #notiontemplate',
        hashtags: [
          '#notiontemplate', '#digitalproducts', '#passiveincome', '#notionsetup',
          '#digitalseller', '#gumroad', '#creatoreconomy', '#sidehustle',
          '#notionlife', '#makemoneyonline', '#digitaldownload', '#aestheticnotion',
        ],
        imagePrompt:
          'Aesthetic flat lay desk setup, MacBook Pro open showing a minimal Notion dashboard with soft pastel widgets, small coffee cup in a ceramic mug, a succulent plant, warm natural window light, neutral linen background, product photography style, soft shadows, warm tones',
      },
      {
        platform: 'Instagram',
        hook: 'Your life, finally organised 🌿',
        caption:
          '✨ Introducing the Aesthetic Life OS — a Notion template that actually makes you want to plan your life.\n\nInside you\'ll find:\n📋 Goal tracker with quarterly + monthly breakdowns\n💰 Personal finance dashboard\n📓 Daily journal with mood tracking\n🧘 Habit tracker\n🗂 Projects board\n\nInstant digital download — get yours for just £15 at the link in bio 💛\n\n#notiontemplate #aestheticnotion #digitalproduct #sidehustle #notionsetup #productivitytools #gumroad #plannerlife #digitaldownload',
        hashtags: [
          '#notiontemplate', '#aestheticnotion', '#digitalproduct', '#sidehustle',
          '#notionsetup', '#productivitytools', '#gumroad', '#plannerlife',
          '#digitaldownload', '#notionlife', '#creatoreconomy', '#passiveincome',
        ],
        imagePrompt:
          'Styled flat lay of a MacBook showing a minimalist Notion dashboard with indigo and cream colour palette, alongside a journal, a matcha latte and dried flowers, soft natural light, overhead shot, Instagram aesthetic, warm minimalist vibe',
      },
      {
        platform: 'Pinterest',
        hook: 'Aesthetic Notion Life OS Template — Instant Download',
        caption:
          'Level up your productivity with this beautiful Notion Life OS template. Includes a goal tracker, finance dashboard, habit tracker, journal and projects board — all in one aesthetic setup. Instant digital download from Gumroad. Perfect for creators, students and anyone wanting to get organised in style.',
        hashtags: [
          '#NotionTemplate', '#DigitalDownload', '#ProductivityTools',
          '#NotionSetup', '#AestheticPlanner', '#PassiveIncome',
        ],
        imagePrompt:
          'Vertical Pinterest-format image showing a Notion dashboard on a laptop screen, soft pink and cream aesthetic, elegant typography overlay reading "Notion Life OS Template", clean white background, styled with a candle and flowers',
      },
      {
        platform: 'Email',
        hook: 'Your most organised year yet starts here 🗂',
        caption:
          'Subject: Your Notion Life OS is ready to download ✨\n\nHey [Name],\n\nI just launched something I\'ve been working on and I\'m obsessed with it — the Aesthetic Notion Life OS Template.\n\nThis is the exact setup I use to track my goals, manage my money, journal daily and keep on top of every project — all inside Notion.\n\nFor £15 you get:\n✅ Goal tracker (quarterly + monthly)\n✅ Personal finance dashboard\n✅ Habit tracker\n✅ Daily journal\n✅ Projects board\n\nIt\'s an instant download — you can be using it in under 5 minutes.\n\n→ Grab it here: [YOUR GUMROAD LINK]\n\nTalk soon,\n[Your name]',
        hashtags: [],
        imagePrompt:
          'Email header banner: minimal gradient from indigo to violet, clean sans-serif typography reading "Notion Life OS Template", small screenshot thumbnail of the Notion dashboard, professional and clean look',
      },
    ],
  },
  {
    id: 'wf-pod',
    incomeStream: 'pod',
    label: 'Print-on-Demand',
    productExample: 'Positive Affirmations Coffee Mug',
    sellOn: 'Etsy via Printify',
    priceExample: '£14',
    setupSteps: [
      'Create your mug design in Canva — keep text big and bold so it reads well on the curved surface (minimum 150px font at A4 scale)',
      'Export as PNG at 300dpi, then upload to Printify — choose a UK-based supplier (Textprint UK or FYBY) to keep shipping fast',
      'Connect your Printify account to your Etsy shop — Printify publishes the listing automatically',
      'Write an SEO-optimised title: "Positive Affirmations Mug | Morning Motivation Coffee Cup | Gift for Her | Mindset Mug"',
      'Price at £14 — UK base cost is roughly £4.50 + £3 shipping so you keep ~£6 margin per sale',
      'Take lifestyle photos using Printify\'s free mockup generator — download at least 5 different angle shots',
    ],
    content: [
      {
        platform: 'TikTok',
        hook: 'POD earnings from my Etsy mugs this week 👀 (this is passive)',
        script:
          '1. Flash income screenshot from Etsy seller dashboard — blur sensitive info\n2. Show the mug design on screen (Canva screenshot)\n3. "I made this in Canva in 20 minutes — Printify prints and ships it for me"\n4. Show Printify dashboard — orders automatically processing\n5. "I never touch the product — it ships direct to the customer"\n6. CTA: "Comment MUSE and I\'ll tell you exactly how to start"',
        caption:
          '£0 stock, £0 upfront costs, passive orders every day 🙌 Print-on-demand is the easiest way to start an online shop with no risk. Printify prints it, Etsy sells it, I just collect the profit. #printondemand #etsyshop #passiveincome',
        hashtags: [
          '#printondemand', '#etsyshop', '#passiveincome', '#podlife',
          '#printify', '#etsyseller', '#sidehustle', '#workfromhome',
          '#makemoneyonline', '#digitalentrepreneur', '#ecommerce', '#mugs',
        ],
        imagePrompt:
          'Close-up lifestyle photo of a white ceramic coffee mug with a bold black minimalist affirmation quote, sitting on a wooden table with morning coffee steam, cosy warm light, light background, product photography, clean and inviting',
      },
      {
        platform: 'Instagram',
        hook: 'Start the day with intention ☀️',
        caption:
          'Your morning ritual just got an upgrade ✨\n\nThis "You Are Enough" affirmation mug is the perfect reminder to start every day with intention.\n\nHighlights:\n☕ Dishwasher safe ceramic\n📦 Ships directly to your door (UK & worldwide)\n🎁 Makes a perfect thoughtful gift\n\nShop now at the link in bio — from £14 ✨\n\n#muglife #morningmotivation #affirmations #etsyshop #giftideas #coffeelovers #selfcare #printondemand',
        hashtags: [
          '#muglife', '#morningmotivation', '#affirmations', '#etsyshop',
          '#giftideas', '#coffeelovers', '#selfcare', '#printondemand',
          '#mindsetmatters', '#positivity', '#morningroutine',
        ],
        imagePrompt:
          'Aesthetic lifestyle flat lay: white ceramic mug with minimalist black affirmation text, surrounded by dried flowers, a journal and a gold pen, soft morning light, warm neutral tones, overhead shot, Instagram-ready product photography',
      },
      {
        platform: 'Pinterest',
        hook: 'Motivational Affirmation Mug | Positive Quote Mug Gift for Her',
        caption:
          'Start every morning with a dose of positivity. This beautiful affirmation mug features a bold minimalist quote that reminds you of your worth every single day. Dishwasher safe, ships UK-wide. Perfect for gifting or as a daily motivational treat. Shop on Etsy — from £14.',
        hashtags: [
          '#AffirmationMug', '#GiftForHer', '#EtsyShop', '#MorningMotivation',
          '#PrintOnDemand', '#PositiveVibes',
        ],
        imagePrompt:
          'Vertical Pinterest-style image of a white mug with a motivational quote, styled on a light marble surface with eucalyptus sprigs and a blurred journal in the background, soft natural light, elegant clean aesthetic',
      },
      {
        platform: 'Email',
        hook: 'Start every morning with a reminder of how brilliant you are ☕',
        caption:
          'Subject: The mug that sets the tone for your whole day ✨\n\nHey [Name],\n\nWe all know that first cup of coffee hits different. But imagine if your mug reminded you how capable you are before you\'ve even left the house?\n\nOur Positive Affirmations Mug does exactly that.\n\n"You Are Enough" — bold, beautiful and dishwasher safe. Perfect for yourself or as a thoughtful gift.\n\n→ Shop it on Etsy for just £14: [YOUR ETSY LINK]\n\nFree UK shipping on orders over £25 🎁\n\n[Your name]',
        hashtags: [],
        imagePrompt:
          'Email header: warm cream background, close-up of a white mug with elegant black typography, small tagline "Start every morning with intention", clean minimal design',
      },
    ],
  },
  {
    id: 'wf-dropship',
    incomeStream: 'dropship',
    label: 'Dropshipping',
    productExample: 'Portable Foldable Pet Water Bottle',
    sellOn: 'TikTok Shop',
    priceExample: '£18',
    setupSteps: [
      'Find the product on Avasam or Spocket — search "foldable pet water bottle" and sort by UK supplier to keep delivery times under 5 days',
      'Check the supplier\'s minimum price + shipping — aim for products where you can 2-3× the cost (e.g. cost £6 → sell at £16–£18)',
      'Set up a TikTok Shop account (requires a UK business registration or sole trader details)',
      'Import the product to your TikTok Shop using the supplier\'s product images and your own written description',
      'Film a 30-second UGC-style product demo video — show a dog drinking from the bottle on a walk',
      'Enable TikTok Shop affiliate so other creators can promote your listing for a commission',
    ],
    content: [
      {
        platform: 'TikTok',
        hook: 'Every dog owner needs this on every single walk 🐕',
        script:
          '1. Open on a close-up of a thirsty-looking dog on a hot day\n2. Pull out the foldable water bottle from your pocket — show how compact it is\n3. Pop the cap, squeeze water into the tray — dog drinks immediately\n4. "It folds flat, fits in any pocket, and you\'ll never hear your dog panting again"\n5. Show the price on screen: £18 — "Link in bio / shop below"\n6. Close with the dog looking satisfied and happy',
        caption:
          'My dog\'s favourite thing in my pocket 🐾 This foldable water bottle is a GAME CHANGER for dog walks. Holds 350ml, clicks shut with one hand, fits in any jacket pocket. Grab one before summer — link in bio 🔗 #dogsoftiktok #petproducts #dogwalk',
        hashtags: [
          '#dogsoftiktok', '#petproducts', '#dogwalk', '#dogmum', '#dogtok',
          '#tiktokshop', '#petcare', '#dogaccessories', '#walkies', '#sidehustle',
          '#dropshipping', '#ecommerce', '#doglife',
        ],
        imagePrompt:
          'Bright lifestyle photo of a golden retriever on a sunny park path, owner squeezing water from a compact foldable pet bottle into the tray for the dog to drink, vibrant natural colours, joyful mood, product clearly visible',
      },
      {
        platform: 'Instagram',
        hook: 'Never let your dog go thirsty on a walk again 🐾',
        caption:
          'Introducing the must-have accessory for every dog walk ✨\n\nThis foldable pet water bottle:\n💧 Holds 350ml — enough for a long walk\n🔒 One-click leak-proof seal\n👜 Fits in any pocket or bag\n♻️ Food-safe silicone — easy to clean\n\nPerfect for summer walks, hikes and travel 🌞\n\nShop now — £18 at the link in bio 🐕\n\n#dogmum #petcare #dogaccessories #doglife #walkies #petstagram #dogsofinsta',
        hashtags: [
          '#dogmum', '#petcare', '#dogaccessories', '#doglife', '#walkies',
          '#petstagram', '#dogsofinsta', '#tiktokshop', '#petproducts',
        ],
        imagePrompt:
          'Flat lay product photo: the foldable pet water bottle in a neutral sandy colour alongside a dog lead, a poo bag dispenser and sunglasses on a light textured background, clean overhead shot, Instagram product aesthetic',
      },
      {
        platform: 'Pinterest',
        hook: 'Foldable Dog Water Bottle | Best Portable Dog Walk Accessory 2026',
        caption:
          'Keep your dog hydrated on every adventure with this compact foldable water bottle. One-hand squeeze action, leak-proof cap, fits in any pocket. A must-have for dog owners who love walking, hiking or travelling with their pet. Just £18 — shop via TikTok Shop.',
        hashtags: [
          '#DogWalk', '#PetAccessories', '#DogMum', '#PetCare',
          '#FoldableWaterBottle', '#DogLife',
        ],
        imagePrompt:
          'Vertical Pinterest format: collage of 3 images — top: dog drinking from the bottle outdoors; middle: bottle folded flat in a jacket pocket; bottom: product on a clean white surface with specs text overlay, editorial style',
      },
      {
        platform: 'Email',
        hook: 'Your dog\'s next walk just got a whole lot better 🐕',
        caption:
          'Subject: Is your dog thirsty on walks? This fixes that in 2 seconds.\n\nHey [Name],\n\nQuick question — do you ever feel guilty when your dog is panting and you have nothing to give them?\n\nWe\'ve got the fix.\n\nThe Foldable Pet Water Bottle holds 350ml, fits in your coat pocket and opens with one hand — even if your lead is in the other.\n\nIt\'s dishwasher safe, food-grade silicone and your dog will absolutely love it.\n\n→ Get yours for £18: [YOUR TIKTOK SHOP LINK]\n\nFree UK delivery on orders over £25 🎁\n\n[Your name]',
        hashtags: [],
        imagePrompt:
          'Email header: warm sky-blue background, the pet water bottle centred with "Never leave home without it" headline text, clean sans-serif font, playful but trustworthy',
      },
    ],
  },
  {
    id: 'wf-affiliate',
    incomeStream: 'affiliate',
    label: 'Affiliate Marketing',
    productExample: 'Canva Pro Affiliate',
    sellOn: 'Canva Affiliate Program',
    priceExample: '$36 per referral',
    setupSteps: [
      'Sign up for the Canva Affiliate Program at canva.com/affiliates — approval usually takes 2–5 days',
      'Get your unique referral link from the Canva affiliate dashboard',
      'Create 3 pieces of content: a TikTok/Reel tutorial using Canva, an Instagram carousel of what you made with it, and a Pinterest pin',
      'Put your referral link in your bio (use Linktree or Beacons to host multiple links)',
      'Add a short disclosure at the end of each post: "This contains an affiliate link — I earn a small commission at no cost to you"',
      'Track clicks in your Canva affiliate dashboard — optimise by doubling down on whichever platform drives the most clicks',
    ],
    content: [
      {
        platform: 'TikTok',
        hook: 'I earn money every time someone signs up for Canva Pro using my link 💸',
        script:
          '1. Open on your phone screen showing Canva affiliate dashboard — show click count + earnings (blur if needed)\n2. "I\'ve been recommending Canva Pro for free to my followers for months — then I realised I could get PAID for it"\n3. Screen-record: go to canva.com/affiliates, show the sign-up page\n4. "Every time someone upgrades to Pro through my link, I get $36"\n5. Quick Canva Pro demo — show Magic Resize, Brand Kit, premium templates\n6. CTA: "My affiliate link is in my bio — sign up for free and upgrade when you\'re ready"',
        caption:
          'Passive income from recommending a tool I already use every single day 🙌 Canva Pro is genuinely worth every penny — and you can try it free. Affiliate link in bio 🔗 *This is an affiliate link — I earn a commission at no cost to you* #canvapro #affiliatemarketing #passiveincome',
        hashtags: [
          '#canvapro', '#affiliatemarketing', '#passiveincome', '#canvatutorial',
          '#sidehustle', '#makemoneyonline', '#creatoreconomy', '#canvacreator',
          '#affiliateincome', '#digitalmarketing', '#contentcreator',
        ],
        imagePrompt:
          'Screen recording aesthetic: laptop screen showing Canva editor with a beautiful social media template being designed, soft purple Canva branding visible, cosy home office background, warm light, creative workspace vibe',
      },
      {
        platform: 'Instagram',
        hook: 'I made ALL of these in Canva Pro 🎨',
        caption:
          'Swipe to see what you can create with Canva Pro →\n\n📐 Brand kits that keep everything consistent\n🖼 Resize any design to any format in one click\n✨ Thousands of premium templates\n🤖 AI image generation built in\n📅 Direct scheduling to Instagram, TikTok & more\n\nI genuinely use it every single day for content, client work and my own products.\n\nClick the link in my bio to try Canva Pro free for 30 days 🎁\n\n*Affiliate link — I earn a small commission at no cost to you*\n\n#canvapro #contentcreator #graphicdesign #canvatips #creativetools',
        hashtags: [
          '#canvapro', '#contentcreator', '#graphicdesign', '#canvatips',
          '#creativetools', '#affiliatemarketing', '#designtools', '#canva',
        ],
        imagePrompt:
          'Instagram carousel cover slide: purple and white gradient, Canva logo subtly visible, bold text reading "Everything I made with Canva Pro this week", clean professional design, grid of 4 small content thumbnails at the bottom',
      },
      {
        platform: 'Pinterest',
        hook: 'Canva Pro Review 2026 — Is It Worth It? (+ Free Trial)',
        caption:
          'Canva Pro is the design tool that changed how I create content, build products and run my business. Features: Brand Kit, Magic Resize, 600k+ premium templates, AI tools, background remover and direct social media scheduling. Try it free for 30 days via the link — affiliate link, I earn a commission.',
        hashtags: [
          '#CanvaPro', '#CanvaReview', '#ContentCreator', '#GraphicDesign',
          '#AffiliateMarketing', '#CreatorTools',
        ],
        imagePrompt:
          'Vertical Pinterest image: "Is Canva Pro Worth It?" header text on a purple gradient background, below shows a clean grid of 6 Canva design examples (social posts, logos, presentations), professional editorial style',
      },
      {
        platform: 'Email',
        hook: 'Try Canva Pro free for 30 days — my honest take 🎨',
        caption:
          'Subject: Honest review: Is Canva Pro worth it in 2026?\n\nHey [Name],\n\nI\'ve been using Canva for years — but upgrading to Canva Pro genuinely changed how fast I can create content.\n\nHere\'s what I actually use every week:\n🎨 Brand Kit — logo, fonts and colours in one place\n↔️ Magic Resize — one design, every format in two clicks\n🤖 AI image generator — no more stock photo hunting\n📅 Schedule to socials directly from Canva\n\nIs it perfect? No. But for £11/month it\'s the best value creative tool I\'ve found.\n\n→ Try it free for 30 days: [YOUR CANVA AFFILIATE LINK]\n\n*This is an affiliate link — I earn a small commission at no cost to you, and it helps me keep creating free content for you. Thank you!*\n\n[Your name]',
        hashtags: [],
        imagePrompt:
          'Email header: clean purple gradient, Canva-style design showing a before/after content example (plain text vs beautifully designed graphic), tagline "Create faster. Look more professional."',
      },
    ],
  },
];
