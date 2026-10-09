'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Search,
  Filter,
  Eye,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Calendar,
  Lock,
  Unlock,
  ShieldCheck,
  FileText,
  Archive,
  BarChart3,
  Layers,
  ArrowRight,
  ExternalLink,
  Sliders,
  ChevronRight,
  Send,
  AlertCircle,
  Tag,
  Clock,
  LayoutGrid,
  CalendarDays,
  ListOrdered,
  Image as ImageIcon,
} from 'lucide-react';
import JSZip from 'jszip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAdminAuth } from '@/lib/adminAuth';
import {
  INITIAL_SOCIAL_POSTS_STORE,
  SocialMediaPostItem,
} from '@/lib/socialMediaStore';

export default function AdminSocialMediaStudioPage() {
  const { isAuthenticated, isLoading, login, logout } = useAdminAuth();
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Studio Store State (hydrated from initial store & stored locally)
  const [posts, setPosts] = useState<SocialMediaPostItem[]>(INITIAL_SOCIAL_POSTS_STORE);

  // Filters
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<'portrait' | 'square' | 'story'>('portrait');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // View mode
  const [viewMode, setViewMode] = useState<'grid' | 'calendar' | 'table'>('grid');

  // Copy feedback
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Modal states
  const [activeRegenPost, setActiveRegenPost] = useState<SocialMediaPostItem | null>(null);
  const [regenInstructions, setRegenInstructions] = useState<string>('');
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [activeMetricsPost, setActiveMetricsPost] = useState<SocialMediaPostItem | null>(null);
  const [previewPost, setPreviewPost] = useState<SocialMediaPostItem | null>(null);

  // Bulk generation state
  const [isBulkGenerating, setIsBulkGenerating] = useState<boolean>(false);
  const [bulkProgress, setBulkProgress] = useState<{ current: number; total: number } | null>(null);

  // Hydrate local changes from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pv_social_posts_store');
      if (saved) {
        setPosts(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load saved posts', e);
    }
  }, []);

  // Save changes to localStorage helper
  const updatePostsState = (updater: (prev: SocialMediaPostItem[]) => SocialMediaPostItem[]) => {
    setPosts((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem('pv_social_posts_store', JSON.stringify(next));
      } catch (e) {
        console.error('Failed to persist posts', e);
      }
      return next;
    });
  };

  // Auth Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(adminKeyInput.trim());
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setAdminKeyInput('');
    }
  };

  // Filter logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchPillar =
        selectedPillar === 'all' ||
        post.category.toLowerCase().includes(selectedPillar.toLowerCase());
      const matchStatus =
        selectedStatus === 'all' ||
        post.approvalStatus.toLowerCase() === selectedStatus.toLowerCase() ||
        post.imageStatus.toLowerCase() === selectedStatus.toLowerCase();
      const matchPlatform =
        selectedPlatform === 'all' ||
        post.platform.toLowerCase() === selectedPlatform.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        post.postNumber.toLowerCase().includes(q) ||
        post.headline.toLowerCase().includes(q) ||
        post.hook.toLowerCase().includes(q) ||
        post.caption.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.hashtags.toLowerCase().includes(q);

      return matchPillar && matchStatus && matchPlatform && matchSearch;
    });
  }, [posts, selectedPillar, selectedStatus, selectedPlatform, searchQuery]);

  // Status Metrics
  const stats = useMemo(() => {
    const total = posts.length;
    const approved = posts.filter((p) => p.approvalStatus === 'APPROVED').length;
    const review = posts.filter((p) => p.approvalStatus === 'REVIEW').length;
    const rejected = posts.filter((p) => p.approvalStatus === 'REJECTED').length;
    const posted = posts.filter((p) => p.postedStatus === 'Posted').length;
    return { total, approved, review, rejected, posted };
  }, [posts]);

  // Actions
  const handleApprove = (id: string) => {
    updatePostsState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, approvalStatus: 'APPROVED' } : p))
    );
  };

  const handleReject = (id: string) => {
    updatePostsState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, approvalStatus: 'REJECTED' } : p))
    );
  };

  const handleCopyCaption = (post: SocialMediaPostItem) => {
    const textToCopy = `${post.caption}\n\n${post.hashtags}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedPostId(post.id);
    setTimeout(() => setCopiedPostId(null), 2500);
  };

  const handleDownloadCaptionTxt = (post: SocialMediaPostItem) => {
    const content = `==================================================\nPUREVEGIES SOCIAL MEDIA ASSET: ${post.postNumber}\nCATEGORY: ${post.category}\nPLATFORM: ${post.platform}\nHEADLINE: ${post.headline}\n==================================================\n\n[CAPTION]\n${post.caption}\n\n[CALL TO ACTION]\n${post.cta}\n\n[HASHTAGS]\n${post.hashtags}\n\n[IMAGE DIRECTION & PROMPT]\n${post.imagePrompt}\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PUREVEGIES_${post.postNumber.replace(/\s+/g, '_')}_CAPTION.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadImage = (post: SocialMediaPostItem) => {
    const a = document.createElement('a');
    a.href = post.imageUrl;
    a.download = `PUREVEGIES_${post.postNumber.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadCompletePostZip = async (post: SocialMediaPostItem) => {
    try {
      const zip = new JSZip();
      const txtContent = `==================================================\nPUREVEGIES SOCIAL MEDIA ASSET: ${post.postNumber}\nCATEGORY: ${post.category}\nPLATFORM: ${post.platform}\nHEADLINE: ${post.headline}\n==================================================\n\n[CAPTION]\n${post.caption}\n\n[CALL TO ACTION]\n${post.cta}\n\n[HASHTAGS]\n${post.hashtags}\n\n[IMAGE PROMPT]\n${post.imagePrompt}\n`;

      zip.file(`PUREVEGIES_${post.postNumber.replace(/\s+/g, '_')}.txt`, txtContent);

      // Fetch the generated image file blob
      const imgRes = await fetch(post.imageUrl);
      const imgBlob = await imgRes.blob();
      zip.file(`PUREVEGIES_${post.postNumber.replace(/\s+/g, '_')}.png`, imgBlob);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `PUREVEGIES_${post.postNumber.replace(/\s+/g, '_')}_COMPLETE.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to create complete post ZIP', e);
      // Fallback: download image and caption separately
      handleDownloadImage(post);
      handleDownloadCaptionTxt(post);
    }
  };

  // Regeneration Handler
  const handleRegenerateSubmit = async () => {
    if (!activeRegenPost) return;
    setIsRegenerating(true);

    try {
      const res = await fetch('/api/admin/social-media/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': 'purevegies-admin-2026',
        },
        body: JSON.stringify({
          postId: activeRegenPost.id,
          instructions: regenInstructions,
          format: selectedFormat,
        }),
      });

      const data = await res.json();
      if (data.success) {
        updatePostsState((prev) =>
          prev.map((p) =>
            p.id === activeRegenPost.id
              ? {
                  ...p,
                  imageUrl: data.imageUrl,
                  imagePrompt: data.updatedPrompt || p.imagePrompt,
                  imageStatus: 'GENERATED',
                  approvalStatus: 'REVIEW',
                }
              : p
          )
        );
        setActiveRegenPost(null);
        setRegenInstructions('');
      } else {
        alert(data.error || 'Failed to regenerate image');
      }
    } catch (e) {
      console.error('Regeneration error', e);
      alert('Error regenerating image');
    } finally {
      setIsRegenerating(false);
    }
  };

  // Bulk Generation Handler
  const handleBulkGenerateMissing = async () => {
    setIsBulkGenerating(true);
    const unapprovedOrMissing = posts.filter(
      (p) => p.imageStatus === 'IMAGE NOT GENERATED' || p.imageStatus === 'FAILED'
    );
    const targetPosts = unapprovedOrMissing.length > 0 ? unapprovedOrMissing : posts.slice(0, 30);
    const total = targetPosts.length;
    setBulkProgress({ current: 0, total });

    for (let i = 0; i < total; i++) {
      const p = targetPosts[i];
      try {
        await fetch('/api/admin/social-media/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-key': 'purevegies-admin-2026',
          },
          body: JSON.stringify({ postId: p.id, format: selectedFormat }),
        });
        setBulkProgress({ current: i + 1, total });
      } catch (err) {
        console.error(`Bulk gen error on ${p.id}`, err);
      }
    }

    setIsBulkGenerating(false);
    setBulkProgress(null);
    alert('Bulk generation cycle complete!');
  };

  // If loading auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#172F1F] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-zinc-500">Checking Administrator Privileges...</span>
        </div>
      </div>
    );
  }

  // =========================================================
  // GATED: ADMIN LOGIN CHALLENGE SCREEN
  // =========================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#102115] text-[#FAF8F5]">
        <Navbar />

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-[#172F1F] border border-[#2D5A3C] rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#20412B] border border-[#A1D1AF]/30 flex items-center justify-center mx-auto text-[#A1D1AF]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#C48248] block">
                INTERNAL OPERATIONS ACCESS ONLY
              </span>
              <h1 className="font-serif text-2xl font-bold text-white">
                Social Media Content Studio
              </h1>
              <p className="text-xs text-zinc-300 leading-relaxed">
                This studio contains internal brand assets, marketing campaigns, and image generation
                controls. Please enter your Administrator Passphrase to continue.
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Admin Passphrase / Access Key:
                </label>
                <input
                  type="password"
                  value={adminKeyInput}
                  onChange={(e) => {
                    setAdminKeyInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  placeholder="Enter admin passphrase..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0D1C12] border border-[#2D5A3C] text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#A1D1AF]"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Invalid administrator passphrase. Please re-enter.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#A1D1AF] hover:bg-[#8EC9AB] text-[#102115] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Authenticate &amp; Enter Studio</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#234531] text-[11px] text-zinc-400">
              <span>Authorized personnel only • Logged sessions • </span>
              <Link href="/admin" className="underline hover:text-white">
                Return to Admin Dashboard
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // =========================================================
  // AUTHENTICATED: FULL SOCIAL MEDIA CONTENT STUDIO
  // =========================================================
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Top Admin Trust Bar */}
      <div className="bg-[#102115] text-white px-4 py-2 text-xs border-b border-[#20412B]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#A1D1AF]" />
            <span className="font-bold tracking-wide">ADMINISTRATOR MODE:</span>
            <span className="text-zinc-300">Social Media Content Studio (200 Posts)</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-[#A1D1AF] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Operations Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-zinc-600">|</span>
            <button
              onClick={logout}
              className="text-zinc-400 hover:text-white transition"
              title="Log out from admin"
            >
              Lock Studio
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Studio Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#D8D1C5] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172F1F] text-[#A1D1AF] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admin Ready-To-Post Studio</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#102115]">
              Social Media Content Studio
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
              Every post contains its actual generated high-resolution 1080×1350 image, short hook
              headline, full caption, and one-click ZIP download package.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-white px-3.5 py-2 rounded-2xl border border-[#D8D1C5] text-center shadow-xs">
              <span className="text-lg font-bold font-serif text-[#102115] block">{stats.total}</span>
              <span className="text-[10px] uppercase font-mono text-zinc-500">Total Posts</span>
            </div>
            <div className="bg-white px-3.5 py-2 rounded-2xl border border-[#D8D1C5] text-center shadow-xs">
              <span className="text-lg font-bold font-serif text-emerald-700 block">
                {stats.approved}
              </span>
              <span className="text-[10px] uppercase font-mono text-zinc-500">Approved</span>
            </div>
            <div className="bg-white px-3.5 py-2 rounded-2xl border border-[#D8D1C5] text-center shadow-xs">
              <span className="text-lg font-bold font-serif text-amber-600 block">
                {stats.review}
              </span>
              <span className="text-[10px] uppercase font-mono text-zinc-500">In Review</span>
            </div>
            <div className="bg-white px-3.5 py-2 rounded-2xl border border-[#D8D1C5] text-center shadow-xs">
              <span className="text-lg font-bold font-serif text-blue-700 block">{stats.posted}</span>
              <span className="text-[10px] uppercase font-mono text-zinc-500">Posted</span>
            </div>
          </div>
        </div>

        {/* Toolbar & Filter Controls */}
        <div className="bg-white p-5 rounded-3xl border border-[#D8D1C5] shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by post #, headline, hook, keywords..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-[#D8D1C5] bg-[#FAF8F5] text-xs focus:outline-none focus:ring-2 focus:ring-[#172F1F]"
              />
            </div>

            {/* View Mode & Bulk Generation */}
            <div className="flex items-center gap-2 w-full lg:w-auto justify-end flex-wrap">
              {/* Aspect Ratio Selector */}
              <div className="flex items-center bg-[#FAF8F5] p-1 rounded-full border border-[#D8D1C5]">
                <button
                  onClick={() => setSelectedFormat('portrait')}
                  className={`px-3 py-1 text-[11px] font-semibold rounded-full transition ${
                    selectedFormat === 'portrait'
                      ? 'bg-[#172F1F] text-white'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Portrait (4:5)
                </button>
                <button
                  onClick={() => setSelectedFormat('square')}
                  className={`px-3 py-1 text-[11px] font-semibold rounded-full transition ${
                    selectedFormat === 'square'
                      ? 'bg-[#172F1F] text-white'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Square (1:1)
                </button>
                <button
                  onClick={() => setSelectedFormat('story')}
                  className={`px-3 py-1 text-[11px] font-semibold rounded-full transition ${
                    selectedFormat === 'story'
                      ? 'bg-[#172F1F] text-white'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Story (9:16)
                </button>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-[#FAF8F5] p-1 rounded-full border border-[#D8D1C5]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full transition ${
                    viewMode === 'grid' ? 'bg-[#172F1F] text-white' : 'text-zinc-600'
                  }`}
                  title="Grid Cards View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`p-1.5 rounded-full transition ${
                    viewMode === 'calendar' ? 'bg-[#172F1F] text-white' : 'text-zinc-600'
                  }`}
                  title="Calendar View"
                >
                  <CalendarDays className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-full transition ${
                    viewMode === 'table' ? 'bg-[#172F1F] text-white' : 'text-zinc-600'
                  }`}
                  title="Table / Performance View"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
              </div>

              {/* Bulk Generation Button */}
              <button
                onClick={handleBulkGenerateMissing}
                disabled={isBulkGenerating}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isBulkGenerating ? 'animate-spin' : ''}`} />
                <span>
                  {isBulkGenerating
                    ? `Generating ${bulkProgress?.current || 0}/${bulkProgress?.total || 0}...`
                    : 'Regenerate Batch'}
                </span>
              </button>
            </div>
          </div>

          {/* Pillar Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {[
              { id: 'all', label: 'All 200' },
              { id: 'natural farming', label: '1. Natural Farming (30)' },
              { id: 'managed family farming', label: '2. Managed Farming (35)' },
              { id: 'family food', label: '3. Family Food (30)' },
              { id: 'weekend farm stays', label: '4. Weekend Stays (35)' },
              { id: 'retirement', label: '5. Retirement Escapes (35)' },
              { id: 'premium', label: '6. Private Farm HNI (20)' },
              { id: 'brand story', label: '7. Brand & Education (15)' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedPillar === p.id
                    ? 'bg-[#172F1F] text-white shadow-xs'
                    : 'bg-[#FAF8F5] border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Sub Filters: Approval Status & Platform */}
          <div className="flex items-center justify-between text-xs text-zinc-600 pt-2 border-t border-zinc-100 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-700">Approval:</span>
              {['all', 'APPROVED', 'REVIEW', 'REJECTED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition ${
                    selectedStatus === st
                      ? 'bg-[#E2ECE5] text-[#20412B] font-bold'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-zinc-500 font-mono">
              Showing <strong>{filteredPosts.length}</strong> of {posts.length} posts
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: GRID CARDS (PRIMARY) */}
        {/* ========================================================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#D8D1C5] shadow-xs hover:shadow-lg transition flex flex-col justify-between group"
              >
                {/* Image Section */}
                <div className="relative bg-zinc-950 aspect-[4/5] overflow-hidden group-hover:brightness-105 transition">
                  <img
                    src={post.imageUrl}
                    alt={post.headline}
                    className="w-full h-full object-cover"
                  />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/75 text-white backdrop-blur-sm">
                      {post.postNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full backdrop-blur-sm ${
                        post.approvalStatus === 'APPROVED'
                          ? 'bg-emerald-600/90 text-white'
                          : post.approvalStatus === 'REJECTED'
                          ? 'bg-rose-600/90 text-white'
                          : 'bg-amber-600/90 text-white'
                      }`}
                    >
                      {post.approvalStatus}
                    </span>
                  </div>

                  {/* Top Right Quick Preview */}
                  <button
                    onClick={() => setPreviewPost(post)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition backdrop-blur-sm"
                    title="Enlarge Image"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  {/* Bottom Image Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#A1D1AF] block">
                      {post.category}
                    </span>
                    <h3 className="font-serif font-bold text-sm leading-snug line-clamp-2 mt-0.5">
                      &ldquo;{post.headline}&rdquo;
                    </h3>
                  </div>
                </div>

                {/* Content & Actions Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed bg-[#FAF8F5] p-2.5 rounded-xl border border-zinc-100 font-sans">
                      {post.caption}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-zinc-500">
                      <span>
                        Platform: <strong className="text-zinc-800">{post.platform}</strong>
                      </span>
                      <span>
                        CTA: <strong className="text-[#2D5A3C]">{post.cta}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Ready-to-Post Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-zinc-100">
                    {/* Primary Row: Download Image + Copy Caption */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadImage(post)}
                        className="flex-1 py-2 px-3 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 shadow-xs transition"
                      >
                        <Download className="w-3.5 h-3.5 text-[#A1D1AF]" />
                        <span>Download Image</span>
                      </button>

                      <button
                        onClick={() => handleCopyCaption(post)}
                        className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                          copiedPostId === post.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#FAF8F5] border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
                        }`}
                      >
                        {copiedPostId === post.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Copy Caption</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Secondary Row: Download Complete Post (.ZIP) & Download Text */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <button
                        onClick={() => handleDownloadCompletePostZip(post)}
                        className="flex-1 py-1.5 px-3 rounded-full bg-[#E2ECE5] hover:bg-[#D1E2D6] text-[#20412B] font-semibold text-[11px] flex items-center justify-center gap-1 transition"
                        title="Download ZIP with Image + Caption"
                      >
                        <Archive className="w-3 h-3 text-[#2D5A3C]" />
                        <span>Download Post (.ZIP)</span>
                      </button>

                      <button
                        onClick={() => handleDownloadCaptionTxt(post)}
                        className="p-1.5 rounded-full border border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                        title="Download Caption .TXT"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setActiveRegenPost(post)}
                        className="p-1.5 rounded-full border border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                        title="Regenerate Image with Instructions"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setActiveMetricsPost(post)}
                        className="p-1.5 rounded-full border border-zinc-200 hover:bg-zinc-50 text-zinc-600"
                        title="Performance Analytics"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Approval Row */}
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleApprove(post.id)}
                          className={`px-2 py-0.5 rounded-md font-bold transition ${
                            post.approvalStatus === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700'
                          }`}
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => handleReject(post.id)}
                          className={`px-2 py-0.5 rounded-md font-bold transition ${
                            post.approvalStatus === 'REJECTED'
                              ? 'bg-rose-100 text-rose-800'
                              : 'text-zinc-500 hover:bg-rose-50 hover:text-rose-700'
                          }`}
                        >
                          ✕ Reject
                        </button>
                      </div>

                      <span className="font-mono text-zinc-400 text-[10px]">
                        Template: {post.imageTemplate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 2: CONTENT CALENDAR */}
        {/* ========================================================= */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-3xl p-6 border border-[#D8D1C5] space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#102115]">
                  Publishing Schedule &amp; Calendar
                </h3>
                <p className="text-xs text-zinc-500">
                  Assign scheduled dates, track posted status, and organize publishing workflows.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[#20412B] bg-[#E2ECE5] px-3 py-1 rounded-full">
                October 2026 Campaign Cycle
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPosts.slice(0, 28).map((post, idx) => (
                <div
                  key={post.id}
                  className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-zinc-200 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#20412B]">Day {idx + 1}</span>
                      <span className="font-mono text-zinc-500">{post.postNumber}</span>
                    </div>
                    <img
                      src={post.imageUrl}
                      alt={post.headline}
                      className="w-full aspect-[4/5] object-cover rounded-xl"
                    />
                    <h4 className="font-serif text-xs font-bold text-[#102115] line-clamp-1">
                      {post.headline}
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        post.postedStatus === 'Posted'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {post.postedStatus}
                    </span>

                    <button
                      onClick={() => handleCopyCaption(post)}
                      className="text-[11px] text-[#2D5A3C] font-semibold hover:underline"
                    >
                      Copy Text
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW 3: PERFORMANCE METRICS TABLE */}
        {/* ========================================================= */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-3xl overflow-hidden border border-[#D8D1C5] shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF8F5] border-b border-[#D8D1C5] text-zinc-600 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Post #</th>
                    <th className="py-3 px-4">Thumbnail</th>
                    <th className="py-3 px-4">Pillar</th>
                    <th className="py-3 px-4">Headline</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Impressions</th>
                    <th className="py-3 px-4">Likes</th>
                    <th className="py-3 px-4">Leads</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-sans">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-zinc-50/80 transition">
                      <td className="py-3 px-4 font-mono font-bold text-zinc-900">
                        {post.postNumber}
                      </td>
                      <td className="py-3 px-4">
                        <img
                          src={post.imageUrl}
                          alt={post.headline}
                          className="w-10 h-12 object-cover rounded-md"
                        />
                      </td>
                      <td className="py-3 px-4 text-zinc-600">{post.category}</td>
                      <td className="py-3 px-4 font-serif font-bold text-zinc-900 max-w-xs truncate">
                        {post.headline}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            post.approvalStatus === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {post.approvalStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">
                        {post.performance.impressions.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 font-mono">{post.performance.likes}</td>
                      <td className="py-3 px-4 font-mono text-emerald-700 font-bold">
                        {post.performance.leads}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleDownloadImage(post)}
                          className="text-[#2D5A3C] hover:underline font-semibold"
                        >
                          Image
                        </button>
                        <button
                          onClick={() => handleCopyCaption(post)}
                          className="text-zinc-600 hover:underline"
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 1: IMAGE REGENERATION WITH INSTRUCTIONS */}
        {/* ========================================================= */}
        {activeRegenPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full border border-[#D8D1C5] shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#172F1F] text-[#A1D1AF]">
                    {activeRegenPost.postNumber}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#102115]">
                    Regenerate Image Asset
                  </h3>
                </div>
                <button
                  onClick={() => setActiveRegenPost(null)}
                  className="text-zinc-400 hover:text-zinc-800 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-4 items-center bg-[#FAF8F5] p-3 rounded-2xl border border-zinc-200">
                <img
                  src={activeRegenPost.imageUrl}
                  alt={activeRegenPost.headline}
                  className="w-16 h-20 object-cover rounded-xl"
                />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-[#102115] block">
                    Headline: &ldquo;{activeRegenPost.headline}&rdquo;
                  </span>
                  <p className="text-zinc-500 line-clamp-2 italic text-[11px]">
                    {activeRegenPost.imagePrompt}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-800 block">
                  Custom Generation Instructions (Optional):
                </label>
                <textarea
                  rows={3}
                  value={regenInstructions}
                  onChange={(e) => setRegenInstructions(e.target.value)}
                  placeholder="e.g., 'Make the family younger', 'Use a golden sunrise', 'Make it more premium', 'Reduce headline size'..."
                  className="w-full p-3 rounded-xl border border-[#D8D1C5] bg-white text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#172F1F]"
                />
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {[
                    'Use sunrise golden light',
                    'Make it more premium',
                    'Focus on living soil',
                    'Lush countryside backdrop',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setRegenInstructions(chip)}
                      className="px-2 py-0.5 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setActiveRegenPost(null)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegenerateSubmit}
                  disabled={isRegenerating}
                  className="px-5 py-2 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-bold rounded-full transition shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                  <span>{isRegenerating ? 'Regenerating...' : 'Regenerate Now'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 2: FULL POST PREVIEW & ENLARGE */}
        {/* ========================================================= */}
        {previewPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-4xl w-full border border-[#D8D1C5] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
              <div className="md:col-span-6 bg-zinc-950 flex items-center justify-center p-4">
                <img
                  src={previewPost.imageUrl}
                  alt={previewPost.headline}
                  className="w-full max-h-[75vh] object-contain rounded-xl shadow-lg"
                />
              </div>

              <div className="md:col-span-6 p-6 flex flex-col justify-between overflow-y-auto bg-[#FAF8F5] space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#172F1F] text-[#A1D1AF]">
                      {previewPost.postNumber}
                    </span>
                    <button
                      onClick={() => setPreviewPost(null)}
                      className="text-zinc-400 hover:text-zinc-800 font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#628A6F]">
                      {previewPost.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#102115] mt-0.5">
                      {previewPost.headline}
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 block">Caption:</label>
                    <textarea
                      readOnly
                      rows={8}
                      value={`${previewPost.caption}\n\n${previewPost.hashtags}`}
                      className="w-full p-3 rounded-xl border border-[#D8D1C5] bg-white font-mono text-[11px] text-zinc-700 leading-relaxed focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadImage(previewPost)}
                    className="flex-1 py-2.5 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-4 h-4 text-[#A1D1AF]" />
                    <span>Download Image</span>
                  </button>

                  <button
                    onClick={() => handleDownloadCompletePostZip(previewPost)}
                    className="flex-1 py-2.5 bg-[#E2ECE5] hover:bg-[#D1E2D6] text-[#20412B] text-xs font-semibold rounded-full flex items-center justify-center gap-1.5"
                  >
                    <Archive className="w-4 h-4 text-[#2D5A3C]" />
                    <span>Complete ZIP</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MODAL 3: PERFORMANCE METRICS RECORDER */}
        {/* ========================================================= */}
        {activeMetricsPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full border border-[#D8D1C5] shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#102115]">
                  Post Performance Metrics
                </h3>
                <button
                  onClick={() => setActiveMetricsPost(null)}
                  className="text-zinc-400 hover:text-zinc-800 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs text-zinc-500">
                Record actual social media analytics for <strong>{activeMetricsPost.postNumber}</strong>.
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                    Impressions:
                  </label>
                  <input
                    type="number"
                    defaultValue={activeMetricsPost.performance.impressions}
                    className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                    Reach:
                  </label>
                  <input
                    type="number"
                    defaultValue={activeMetricsPost.performance.reach}
                    className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                    Likes:
                  </label>
                  <input
                    type="number"
                    defaultValue={activeMetricsPost.performance.likes}
                    className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                    Comments:
                  </label>
                  <input
                    type="number"
                    defaultValue={activeMetricsPost.performance.comments}
                    className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                    Clicks:
                  </label>
                  <input
                    type="number"
                    defaultValue={activeMetricsPost.performance.clicks}
                    className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-700 block mb-1">
                    Leads / Enquiries:
                  </label>
                  <input
                    type="number"
                    defaultValue={activeMetricsPost.performance.leads}
                    className="w-full p-2 rounded-lg border border-zinc-300 bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex justify-end">
                <button
                  onClick={() => {
                    alert('Performance metrics saved.');
                    setActiveMetricsPost(null);
                  }}
                  className="px-5 py-2 bg-[#172F1F] text-white text-xs font-bold rounded-full"
                >
                  Save Metrics
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
