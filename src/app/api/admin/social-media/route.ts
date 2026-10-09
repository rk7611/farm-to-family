import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_SOCIAL_POSTS_STORE, SocialMediaPostItem } from '@/lib/socialMediaStore';

// In-memory runtime cache for server updates
let runtimePosts: SocialMediaPostItem[] = [...INITIAL_SOCIAL_POSTS_STORE];

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

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const pillar = searchParams.get('pillar');
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.toLowerCase();

  let filtered = [...runtimePosts];

  if (pillar && pillar !== 'all') {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === pillar.toLowerCase()
    );
  }

  if (status && status !== 'all') {
    filtered = filtered.filter(
      (p) => p.approvalStatus.toLowerCase() === status.toLowerCase() ||
             p.imageStatus.toLowerCase() === status.toLowerCase()
    );
  }

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.headline.toLowerCase().includes(search) ||
        p.postNumber.toLowerCase().includes(search) ||
        p.hook.toLowerCase().includes(search) ||
        p.caption.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    total: filtered.length,
    posts: filtered,
  });
}

export async function PATCH(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin authentication required.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json(
        { error: 'Post ID and updates payload required' },
        { status: 400 }
      );
    }

    const postIndex = runtimePosts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    runtimePosts[postIndex] = {
      ...runtimePosts[postIndex],
      ...updates,
    };

    return NextResponse.json({
      success: true,
      post: runtimePosts[postIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error processing updates' },
      { status: 500 }
    );
  }
}
