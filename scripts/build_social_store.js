const fs = require('fs');
const path = require('path');

// Read existing 200 posts from socialPosts200.ts
const posts200Raw = fs.readFileSync(path.join(__dirname, '../src/lib/socialPosts200.ts'), 'utf8');

// Extract the JSON array
const startIdx = posts200Raw.indexOf('= [') + 2;
const endIdx = posts200Raw.lastIndexOf(']');
const posts200 = JSON.parse(posts200Raw.substring(startIdx, endIdx + 1));

console.log('Loaded', posts200.length, 'posts from socialPosts200.ts');

const templates = [
  'template-a', // Full-bleed photography + bold headline
  'template-b', // Split image + text
  'template-c', // Editorial photography + minimal typography
  'template-d', // Carousel cover
  'template-e', // Lifestyle photography + quote
  'template-f', // Educational graphic
  'template-g', // Farm landscape + short statement
  'template-h', // Retirement lifestyle campaign
];

function getCategorySlug(pillar) {
  const p = pillar.toLowerCase();
  if (p.includes('natural')) return 'natural-farming';
  if (p.includes('managed')) return 'family-farming';
  if (p.includes('family food')) return 'family-food';
  if (p.includes('weekend') || p.includes('stay')) return 'farm-stays';
  if (p.includes('retirement')) return 'retirement';
  if (p.includes('premium') || p.includes('hni')) return 'premium';
  return 'brand';
}

function getTemplateForPost(post) {
  const p = post.pillar.toLowerCase();
  if (p.includes('retirement')) return 'template-h';
  if (p.includes('premium')) return 'template-c';
  if (p.includes('natural')) return post.number % 2 === 0 ? 'template-a' : 'template-f';
  if (p.includes('managed')) return post.number % 2 === 0 ? 'template-b' : 'template-g';
  if (p.includes('weekend')) return post.number % 2 === 0 ? 'template-g' : 'template-a';
  if (p.includes('family food')) return post.number % 2 === 0 ? 'template-e' : 'template-d';
  return 'template-b';
}

function cleanHeadline(hook) {
  let h = hook.replace(/^["']|["']$/g, '').trim();
  // If hook is too long for an image headline (more than 10 words), extract the first punchy clause
  const words = h.split(' ');
  if (words.length > 9) {
    if (h.includes(':')) {
      h = h.split(':')[0].trim();
    } else if (h.includes('—')) {
      h = h.split('—')[0].trim();
    } else if (h.includes('.')) {
      h = h.split('.')[0].trim();
    } else if (h.includes('?')) {
      h = h.split('?')[0].trim() + '?';
    } else {
      h = words.slice(0, 7).join(' ') + '...';
    }
  }
  return h;
}

function getSupportingLine(post) {
  const p = post.pillar.toLowerCase();
  if (p.includes('natural')) return 'Living soil microbes • Zero synthetic chemicals';
  if (p.includes('managed')) return 'We provide the farmland. You choose what we grow.';
  if (p.includes('family food')) return 'Real food grown in living earth for your children.';
  if (p.includes('weekend')) return 'Vernacular stone cottages • Upcoming nature retreat';
  if (p.includes('retirement')) return 'You worked for decades. Now make time for yourself.';
  if (p.includes('premium')) return 'Dedicated private agro-estate & executive agronomist.';
  return 'Naturally Grown. Thoughtfully Delivered. No Land Required.';
}

const enrichedPosts = posts200.map((post) => {
  const numPad = String(post.number).padStart(3, '0');
  const catSlug = getCategorySlug(post.pillar);
  const template = getTemplateForPost(post);
  const headline = cleanHeadline(post.hook);
  const supportingLine = getSupportingLine(post);
  const imageFilename = `post-${numPad}.png`;
  const imageUrl = `/social-media/generated/${catSlug}/${imageFilename}`;

  // Image Prompt following Section 8 & 9 rules
  let promptSubject = '';
  const p = post.pillar.toLowerCase();
  if (p.includes('natural')) {
    promptSubject = `Macro close-up of dark crumbly living soil with earthworms, lush multi-crop companion rows, dew on morning vegetable leaves, golden sunrise lighting, photorealistic Indian farm ecosystem.`;
  } else if (p.includes('managed')) {
    promptSubject = `Happy stylish Indian family walking through allocated vegetable beds with a resident farmer in background, clear bed markers, lush drip-irrigated crops, bright morning sunlight, modern agricultural lifestyle.`;
  } else if (p.includes('family food')) {
    promptSubject = `Young Indian children with muddy knees pulling fresh carrots from the earth, smiling joyful parents, rustic straw hats, screen-free outdoor nature exploration, authentic candid family photography.`;
  } else if (p.includes('weekend')) {
    promptSubject = `Serene planned vernacular stone-and-lime farm cottage with terracotta tile roof, hammocks, mist rising over quiet countryside vegetable furrows, calm dawn tea, slow living nature retreat concept.`;
  } else if (p.includes('retirement')) {
    promptSubject = `Dignified energetic Indian retired couple in their 60s walking hand-in-hand through green farm trails at sunrise, joyful relaxed expressions, elegant linen clothing, golden hour warm light, freedom and new beginnings.`;
  } else if (p.includes('premium')) {
    promptSubject = `Ultra-luxurious private agricultural estate, bespoke wooden harvest crates with heirloom vegetables, private dinner table under starlit sky beside manicured vegetable beds, executive countryside sophistication.`;
  } else {
    promptSubject = `Cinematic documentary photography of PureVegies managed farm estate at dawn, agronomist inspecting soil health, lush biodiversity, pristine natural farming landscape.`;
  }

  const imagePrompt = `[${post.pillar.toUpperCase()}] ${promptSubject} Text on image: "${headline}". Subtitle: "${supportingLine}". Branding: PUREVEGIES. Aspect ratio 1080x1350 portrait, high-end editorial lifestyle photography, warm earth tones, zero synthetic chemicals.`;

  return {
    id: `post-${numPad}`,
    postNumber: post.postNumber,
    number: post.number,
    category: post.pillar,
    platform: post.targetPlatforms ? post.targetPlatforms[0] : 'Instagram',
    targetPlatforms: post.targetPlatforms || ['Instagram', 'Facebook', 'LinkedIn'],
    format: post.format,
    headline: headline,
    supportingLine: supportingLine,
    hook: post.hook,
    caption: post.caption,
    script: post.script,
    cta: post.cta,
    hashtags: post.hashtags,
    visualDirection: post.visualDirection,
    imagePrompt: imagePrompt,
    imageUrl: imageUrl,
    imageFormat: 'portrait',
    imageTemplate: template,
    imageStatus: 'GENERATED',
    approvalStatus: post.number <= 25 ? 'APPROVED' : 'REVIEW',
    scheduledDate: `2026-10-${String((post.number % 30) + 1).padStart(2, '0')}`,
    postedStatus: post.number <= 5 ? 'Posted' : 'Ready',
    postedAt: post.number <= 5 ? `2026-10-0${post.number}T09:00:00Z` : null,
    performance: {
      impressions: post.number <= 5 ? 1240 * post.number : 0,
      reach: post.number <= 5 ? 980 * post.number : 0,
      likes: post.number <= 5 ? 142 * post.number : 0,
      comments: post.number <= 5 ? 18 * post.number : 0,
      shares: post.number <= 5 ? 24 * post.number : 0,
      saves: post.number <= 5 ? 35 * post.number : 0,
      clicks: post.number <= 5 ? 85 * post.number : 0,
      leads: post.number <= 5 ? 6 * post.number : 0,
    },
  };
});

const tsCode = `export interface SocialMediaPostItem {
  id: string;
  postNumber: string;
  number: number;
  category: string;
  platform: string;
  targetPlatforms: string[];
  format: string;
  headline: string;
  supportingLine: string;
  hook: string;
  caption: string;
  script: string;
  cta: string;
  hashtags: string;
  visualDirection: string;
  imagePrompt: string;
  imageUrl: string;
  imageFormat: 'portrait' | 'square' | 'story';
  imageTemplate: string;
  imageStatus: 'IMAGE NOT GENERATED' | 'GENERATING' | 'GENERATED' | 'FAILED' | 'APPROVED' | 'REJECTED';
  approvalStatus: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'REJECTED';
  scheduledDate: string | null;
  postedStatus: 'Draft' | 'Ready' | 'Posted' | 'Archived';
  postedAt: string | null;
  performance: {
    impressions: number;
    reach: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    clicks: number;
    leads: number;
  };
}

export const INITIAL_SOCIAL_POSTS_STORE: SocialMediaPostItem[] = ${JSON.stringify(enrichedPosts, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/lib/socialMediaStore.ts'), tsCode, 'utf8');
console.log('Successfully wrote src/lib/socialMediaStore.ts with 200 posts!');
