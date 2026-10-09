const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Read posts store
const storeRaw = fs.readFileSync(path.join(__dirname, '../src/lib/socialMediaStore.ts'), 'utf8');
const startIdx = storeRaw.indexOf('= [') + 2;
const endIdx = storeRaw.lastIndexOf(']');
const posts = JSON.parse(storeRaw.substring(startIdx, endIdx + 1));

console.log(`Starting image generation for ${posts.length} posts...`);

// Helper to escape XML
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Split text into lines for SVG
function wrapText(text, maxCharsPerLine = 22) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Generate SVG string based on template
function createSvgForPost(post, width = 1080, height = 1350) {
  const headlineLines = wrapText(post.headline, 22);
  const subLines = wrapText(post.supportingLine, 36);
  const template = post.imageTemplate || 'template-a';
  const categoryEsc = escapeXml(post.category.toUpperCase());
  const postNumEsc = escapeXml(post.postNumber);
  const ctaEsc = escapeXml(post.cta || 'Build My Farm Plan');

  // SVG Header & Defs
  let svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradForest" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F2215" />
      <stop offset="45%" stop-color="#183623" />
      <stop offset="100%" stop-color="#0A180E" />
    </linearGradient>
    <linearGradient id="gradGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C48248" />
      <stop offset="100%" stop-color="#E5AD7A" />
    </linearGradient>
    <linearGradient id="gradSunrise" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D4F38" />
      <stop offset="50%" stop-color="#1B3824" />
      <stop offset="100%" stop-color="#3D2614" />
    </linearGradient>
    <linearGradient id="gradCream" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FAF8F5" />
      <stop offset="100%" stop-color="#EFEAE1" />
    </linearGradient>
    <linearGradient id="gradCharcoal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141C16" />
      <stop offset="100%" stop-color="#0B100C" />
    </linearGradient>
    <linearGradient id="gradRetirement" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A3324" />
      <stop offset="60%" stop-color="#2A4D36" />
      <stop offset="100%" stop-color="#4A341C" />
    </linearGradient>
  </defs>
`;

  // Render by template
  if (template === 'template-h') {
    // RETIREMENT TEMPLATE
    svg += `
    <rect width="${width}" height="${height}" fill="url(#gradRetirement)" />
    <!-- Sun glow & landscape rays -->
    <circle cx="850" cy="300" r="400" fill="#E2AC75" opacity="0.12" />
    <circle cx="200" cy="1100" r="350" fill="#20412B" opacity="0.4" />
    <rect x="40" y="40" width="1000" height="1270" rx="28" fill="none" stroke="#C48248" stroke-width="2" opacity="0.5" />

    <!-- Top Badge -->
    <g transform="translate(80, 100)">
      <rect width="320" height="48" rx="24" fill="#C48248" />
      <text x="160" y="30" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="15" font-weight="800" text-anchor="middle" letter-spacing="2">
        A NEW CHAPTER • FREEDOM
      </text>
    </g>
    <text x="1000" y="132" fill="#E2AC75" font-family="monospace" font-size="18" font-weight="700" text-anchor="end">
      ${postNumEsc}
    </text>

    <!-- Main Headline -->
    <g transform="translate(80, 420)">
      <text fill="#FFFFFF" font-family="Georgia, serif" font-size="64" font-weight="bold">
        ${headlineLines.map((l, i) => `<tspan x="0" y="${i * 76}">${escapeXml(l)}</tspan>`).join('')}
      </text>
    </g>

    <!-- Supporting Line -->
    <g transform="translate(80, ${440 + headlineLines.length * 76})">
      <text fill="#EADCCB" font-family="system-ui, sans-serif" font-size="28" font-weight="400">
        ${subLines.map((l, i) => `<tspan x="0" y="${i * 42}">${escapeXml(l)}</tspan>`).join('')}
      </text>
    </g>

    <!-- Lifestyle Badge -->
    <g transform="translate(80, 920)">
      <rect width="520" height="64" rx="32" fill="#1B3824" stroke="#C48248" stroke-width="1.5" />
      <text x="260" y="40" fill="#E2AC75" font-family="system-ui, sans-serif" font-size="20" font-weight="600" text-anchor="middle">
        🌾 Unhurried Mornings • Restorative Nature
      </text>
    </g>
    `;
  } else if (template === 'template-c') {
    // PREMIUM HNI MINIMAL LUXURY
    svg += `
    <rect width="${width}" height="${height}" fill="url(#gradCharcoal)" />
    <!-- Minimalist Gold Framing -->
    <rect x="50" y="50" width="980" height="1250" rx="16" fill="none" stroke="#C48248" stroke-width="1.5" opacity="0.6" />
    <rect x="65" y="65" width="950" height="1220" rx="12" fill="none" stroke="#C48248" stroke-width="0.75" opacity="0.3" />

    <g transform="translate(80, 120)">
      <text x="0" y="24" fill="#C48248" font-family="system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="4">
        MY PRIVATE FARM • BESPOKE ESTATE
      </text>
    </g>
    <text x="1000" y="144" fill="#C48248" font-family="monospace" font-size="18" font-weight="600" text-anchor="end">
      ${postNumEsc}
    </text>

    <!-- Centered Refined Serif Headline -->
    <g transform="translate(540, 480)">
      <text fill="#FFFFFF" font-family="Georgia, serif" font-size="62" font-weight="normal" text-anchor="middle">
        ${headlineLines.map((l, i) => `<tspan x="0" y="${i * 78}">${escapeXml(l)}</tspan>`).join('')}
      </text>
    </g>

    <!-- Supporting Line -->
    <g transform="translate(540, ${520 + headlineLines.length * 78})">
      <text fill="#D8D1C5" font-family="Georgia, serif" font-style="italic" font-size="26" text-anchor="middle">
        ${subLines.map((l, i) => `<tspan x="0" y="${i * 40}">${escapeXml(l)}</tspan>`).join('')}
      </text>
    </g>

    <!-- Gold Accent Line -->
    <line x1="440" y1="900" x2="640" y2="900" stroke="#C48248" stroke-width="2" />
    <text x="540" y="940" fill="#E5AD7A" font-family="system-ui, sans-serif" font-size="18" font-weight="600" text-anchor="middle" letter-spacing="2">
      FOOD SOVEREIGNTY FOR THE DISCERNING FEW
    </text>
    `;
  } else if (template === 'template-b') {
    // SPLIT IMAGE & CREAM CARD
    svg += `
    <rect width="${width}" height="${height}" fill="url(#gradForest)" />
    <!-- Farm Horizon Art Top -->
    <g transform="translate(80, 100)">
      <rect width="920" height="380" rx="24" fill="#163822" stroke="#2D5A3C" stroke-width="2" />
      <circle cx="460" cy="190" r="160" fill="#204A2E" opacity="0.6" />
      <text x="460" y="200" fill="#A1D1AF" font-family="Georgia, serif" font-style="italic" font-size="32" text-anchor="middle">
        “We manage the land. You enjoy the harvest.”
      </text>
    </g>

    <!-- Bottom Cream Editorial Card -->
    <g transform="translate(80, 520)">
      <rect width="920" height="660" rx="28" fill="url(#gradCream)" stroke="#D8D1C5" stroke-width="1.5" />
      
      <!-- Card Badge -->
      <g transform="translate(40, 50)">
        <rect width="240" height="40" rx="20" fill="#172F1F" />
        <text x="120" y="25" fill="#A1D1AF" font-family="system-ui, sans-serif" font-size="13" font-weight="700" text-anchor="middle" letter-spacing="1.5">
          ${categoryEsc}
        </text>
      </g>
      <text x="880" y="75" fill="#628A6F" font-family="monospace" font-size="16" font-weight="700" text-anchor="end">
        ${postNumEsc}
      </text>

      <!-- Headline -->
      <g transform="translate(40, 170)">
        <text fill="#102115" font-family="Georgia, serif" font-size="56" font-weight="bold">
          ${headlineLines.map((l, i) => `<tspan x="0" y="${i * 68}">${escapeXml(l)}</tspan>`).join('')}
        </text>
      </g>

      <!-- Subtitle -->
      <g transform="translate(40, ${190 + headlineLines.length * 68})">
        <text fill="#4A584E" font-family="system-ui, sans-serif" font-size="24" font-weight="400">
          ${subLines.map((l, i) => `<tspan x="0" y="${i * 38}">${escapeXml(l)}</tspan>`).join('')}
        </text>
      </g>

      <!-- Bottom Card CTA Pill -->
      <g transform="translate(40, 560)">
        <rect width="360" height="52" rx="26" fill="#172F1F" />
        <text x="180" y="32" fill="#FFFFFF" font-family="system-ui, sans-serif" font-size="18" font-weight="600" text-anchor="middle">
          👉 ${ctaEsc}
        </text>
      </g>
    </g>
    `;
  } else {
    // DEFAULT: TEMPLATE A & OTHERS (FULL-BLEED EDITORIAL)
    svg += `
    <rect width="${width}" height="${height}" fill="url(#gradForest)" />
    <!-- Organic Orbs & Patterns -->
    <circle cx="540" cy="400" r="340" fill="#20412B" opacity="0.3" />
    <circle cx="950" cy="1150" r="420" fill="#183623" opacity="0.35" />
    <rect x="40" y="40" width="1000" height="1270" rx="28" fill="none" stroke="#2D5A3C" stroke-width="2" opacity="0.5" />

    <!-- Top Badge -->
    <g transform="translate(80, 100)">
      <rect width="280" height="48" rx="24" fill="#20412B" />
      <text x="140" y="30" fill="#A1D1AF" font-family="system-ui, sans-serif" font-size="15" font-weight="700" text-anchor="middle" letter-spacing="2">
        ${categoryEsc}
      </text>
    </g>
    <text x="1000" y="132" fill="#628A6F" font-family="monospace" font-size="18" font-weight="700" text-anchor="end">
      ${postNumEsc}
    </text>

    <!-- Main Headline -->
    <g transform="translate(80, 440)">
      <text fill="#FFFFFF" font-family="Georgia, serif" font-size="64" font-weight="bold">
        ${headlineLines.map((l, i) => `<tspan x="0" y="${i * 76}">${escapeXml(l)}</tspan>`).join('')}
      </text>
    </g>

    <!-- Supporting Line -->
    <g transform="translate(80, ${460 + headlineLines.length * 76})">
      <text fill="#D8D1C5" font-family="system-ui, sans-serif" font-size="28" font-weight="400">
        ${subLines.map((l, i) => `<tspan x="0" y="${i * 42}">${escapeXml(l)}</tspan>`).join('')}
      </text>
    </g>

    <!-- Value Pill -->
    <g transform="translate(80, 920)">
      <rect width="520" height="64" rx="32" fill="#163321" stroke="#2D5A3C" stroke-width="1.5" />
      <text x="260" y="40" fill="#A1D1AF" font-family="system-ui, sans-serif" font-size="20" font-weight="600" text-anchor="middle">
        🌱 Naturally Grown • Fresh Doorstep Delivery
      </text>
    </g>
    `;
  }

  // Common Brand Footer
  svg += `
  <g transform="translate(80, 1160)">
    <line x1="0" y1="0" x2="920" y2="0" stroke="#2D5A3C" stroke-width="1.5" opacity="0.6" />
    <text x="0" y="52" fill="#FFFFFF" font-family="Georgia, serif" font-size="30" font-weight="bold" letter-spacing="3">
      PUREVEGIES
    </text>
    <text x="0" y="84" fill="#8EB79C" font-family="system-ui, sans-serif" font-size="15" letter-spacing="1">
      Naturally Grown • Thoughtfully Delivered • No Land Required
    </text>
    <text x="920" y="68" fill="#A1D1AF" font-family="system-ui, sans-serif" font-size="18" font-weight="600" text-anchor="end">
      www.purevegies.in
    </text>
  </g>
</svg>
`;

  return svg;
}

// Batch render function
async function renderAll() {
  const publicDir = path.join(__dirname, '../public');

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const relUrl = post.imageUrl; // e.g. /social-media/generated/natural-farming/post-001.png
    const fullPngPath = path.join(publicDir, relUrl);
    const fullSvgPath = fullPngPath.replace(/\.png$/, '.svg');
    const dir = path.dirname(fullPngPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const svgContent = createSvgForPost(post, 1080, 1350);

    // Save SVG
    fs.writeFileSync(fullSvgPath, svgContent, 'utf8');

    // Render 1080x1350 PNG with sharp
    try {
      await sharp(Buffer.from(svgContent)).png({ quality: 90 }).toFile(fullPngPath);
    } catch (err) {
      console.error(`Failed to render PNG for post ${post.number}:`, err);
    }

    if ((i + 1) % 25 === 0 || i === posts.length - 1) {
      console.log(`Rendered ${i + 1} / ${posts.length} images...`);
    }
  }

  console.log('All 200 images generated successfully!');
}

renderAll().catch((err) => console.error('Error during generation:', err));
