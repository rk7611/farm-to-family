import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { INITIAL_SOCIAL_POSTS_STORE, SocialMediaPostItem } from '@/lib/socialMediaStore';

function verifyAdmin(req: NextRequest): boolean {
  const adminKey = req.headers.get('x-admin-key');
  const cookieToken = req.cookies.get('pv_admin_token')?.value;
  return (
    adminKey === 'purevegies-admin-2026' ||
    adminKey === 'purevegies2026' ||
    adminKey === 'admin123' ||
    cookieToken === 'purevegies-admin-2026'
  );
}

function escapeXml(unsafe: string) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text: string, maxCharsPerLine = 22) {
  const words = text.split(' ');
  const lines: string[] = [];
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

function renderSvg(post: SocialMediaPostItem, instructions?: string, format: 'portrait' | 'square' | 'story' = 'portrait') {
  let width = 1080;
  let height = 1350;
  if (format === 'square') height = 1080;
  if (format === 'story') height = 1920;

  const headlineLines = wrapText(post.headline, 22);
  const subLines = wrapText(post.supportingLine, 36);
  const categoryEsc = escapeXml(post.category.toUpperCase());
  const postNumEsc = escapeXml(post.postNumber);
  const ctaEsc = escapeXml(post.cta || 'Build My Farm Plan');

  // Check if instructions change styling
  const isSunrise = instructions?.toLowerCase().includes('sunrise') || false;
  const isPremium = instructions?.toLowerCase().includes('premium') || post.category.includes('Premium');
  const isRetirement = post.category.includes('Retirement');

  let bgGradient = `
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F2215" />
      <stop offset="50%" stop-color="#183623" />
      <stop offset="100%" stop-color="#0A180E" />
    </linearGradient>
  `;

  if (isSunrise) {
    bgGradient = `
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D4F38" />
        <stop offset="50%" stop-color="#213E2A" />
        <stop offset="100%" stop-color="#5C3B1E" />
      </linearGradient>
    `;
  } else if (isPremium) {
    bgGradient = `
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#141C16" />
        <stop offset="100%" stop-color="#090E0A" />
      </linearGradient>
    `;
  } else if (isRetirement) {
    bgGradient = `
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1A3324" />
        <stop offset="60%" stop-color="#2A4D36" />
        <stop offset="100%" stop-color="#4A341C" />
      </linearGradient>
    `;
  }

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${bgGradient}
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
  <circle cx="540" cy="400" r="320" fill="#20412B" opacity="0.3" />
  <circle cx="950" cy="${height - 200}" r="400" fill="#183623" opacity="0.35" />
  <rect x="40" y="40" width="${width - 80}" height="${height - 80}" rx="28" fill="none" stroke="#2D5A3C" stroke-width="2" opacity="0.5" />

  <!-- Top Badge -->
  <g transform="translate(80, 100)">
    <rect width="280" height="48" rx="24" fill="#20412B" />
    <text x="140" y="30" fill="#A1D1AF" font-family="system-ui, sans-serif" font-size="15" font-weight="700" text-anchor="middle" letter-spacing="2">
      ${categoryEsc}
    </text>
  </g>
  <text x="${width - 80}" y="132" fill="#628A6F" font-family="monospace" font-size="18" font-weight="700" text-anchor="end">
    ${postNumEsc}
  </text>

  <!-- Main Headline -->
  <g transform="translate(80, ${Math.floor(height * 0.32)})">
    <text fill="#FFFFFF" font-family="Georgia, serif" font-size="64" font-weight="bold">
      ${headlineLines.map((l, i) => `<tspan x="0" y="${i * 76}">${escapeXml(l)}</tspan>`).join('')}
    </text>
  </g>

  <!-- Supporting Line -->
  <g transform="translate(80, ${Math.floor(height * 0.34) + headlineLines.length * 76})">
    <text fill="#D8D1C5" font-family="system-ui, sans-serif" font-size="28" font-weight="400">
      ${subLines.map((l, i) => `<tspan x="0" y="${i * 42}">${escapeXml(l)}</tspan>`).join('')}
    </text>
  </g>

  <!-- Value Pill -->
  <g transform="translate(80, ${Math.floor(height * 0.68)})">
    <rect width="520" height="64" rx="32" fill="#163321" stroke="#2D5A3C" stroke-width="1.5" />
    <text x="260" y="40" fill="#A1D1AF" font-family="system-ui, sans-serif" font-size="20" font-weight="600" text-anchor="middle">
      🌱 Naturally Grown • Fresh Doorstep Delivery
    </text>
  </g>

  <!-- Bottom Brand Footer -->
  <g transform="translate(80, ${height - 180})">
    <line x1="0" y1="0" x2="${width - 160}" y2="0" stroke="#2D5A3C" stroke-width="1.5" opacity="0.6" />
    <text x="0" y="52" fill="#FFFFFF" font-family="Georgia, serif" font-size="30" font-weight="bold" letter-spacing="3">
      PUREVEGIES
    </text>
    <text x="0" y="84" fill="#8EB79C" font-family="system-ui, sans-serif" font-size="15" letter-spacing="1">
      Naturally Grown • Thoughtfully Delivered • No Land Required
    </text>
    <text x="${width - 160}" y="68" fill="#A1D1AF" font-family="system-ui, sans-serif" font-size="18" font-weight="600" text-anchor="end">
      www.purevegies.in
    </text>
  </g>
</svg>
`;
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { postId, instructions, format = 'portrait' } = body;

    const post = INITIAL_SOCIAL_POSTS_STORE.find((p) => p.id === postId || p.number === Number(postId));
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const publicDir = path.join(process.cwd(), 'public');
    const relUrl = post.imageUrl;
    const fullPngPath = path.join(publicDir, relUrl);
    const fullSvgPath = fullPngPath.replace(/\.png$/, '.svg');

    const svgContent = renderSvg(post, instructions, format);
    fs.writeFileSync(fullSvgPath, svgContent, 'utf8');

    let w = 1080;
    let h = 1350;
    if (format === 'square') h = 1080;
    if (format === 'story') h = 1920;

    await sharp(Buffer.from(svgContent))
      .resize(w, h)
      .png({ quality: 90 })
      .toFile(fullPngPath);

    const updatedPrompt = instructions
      ? `${post.imagePrompt} [Custom Admin Note: ${instructions}]`
      : post.imagePrompt;

    return NextResponse.json({
      success: true,
      postId: post.id,
      imageUrl: `${post.imageUrl}?t=${Date.now()}`,
      imageStatus: 'GENERATED',
      approvalStatus: 'REVIEW',
      updatedPrompt,
      format,
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
