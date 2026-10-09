'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Search,
  FileText,
  Megaphone,
  FolderOpen,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sprout,
  Users,
  Compass,
  ArrowRight,
  Filter,
  Eye,
  Tag,
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  Lock,
  Unlock,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAdminAuth } from '@/lib/adminAuth';
import { SOCIAL_POSTS_200, SocialPostItem } from '@/lib/socialPosts200';
import { MEDIA_KIT_AUDIT, MediaKitAuditItem } from '@/lib/mediaKitAudit';
import {
  CAMPAIGN_CONCEPTS,
  CTA_LIBRARY,
  HASHTAG_CLUSTERS,
  ASSET_FOLDERS,
  CampaignConcept,
} from '@/lib/campaignConcepts';

type ActiveTab = 'posts200' | 'audit100' | 'campaigns20' | 'folders10' | 'toolkit';

export default function SocialMediaKitPage() {
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('posts200');

  // Posts 200 state
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalPost, setActiveModalPost] = useState<SocialPostItem | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Audit state
  const [auditStatusFilter, setAuditStatusFilter] = useState<string>('all');
  const [auditSearchQuery, setAuditSearchQuery] = useState<string>('');
  const [copiedAuditId, setCopiedAuditId] = useState<number | null>(null);

  // Toolkit copy state
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Filter 200 posts
  const filteredPosts = useMemo(() => {
    return SOCIAL_POSTS_200.filter((post) => {
      const matchPillar =
        selectedPillar === 'all' || post.pillar.toLowerCase() === selectedPillar.toLowerCase();
      const matchFormat =
        selectedFormat === 'all' ||
        post.format.toLowerCase().includes(selectedFormat.toLowerCase());
      const query = searchQuery.toLowerCase();
      const matchSearch =
        !query ||
        post.hook.toLowerCase().includes(query) ||
        post.caption.toLowerCase().includes(query) ||
        post.postNumber.toLowerCase().includes(query) ||
        post.hashtags.toLowerCase().includes(query);

      return matchPillar && matchFormat && matchSearch;
    });
  }, [selectedPillar, selectedFormat, searchQuery]);

  // Filter Audit items
  const filteredAudit = useMemo(() => {
    return MEDIA_KIT_AUDIT.filter((item) => {
      const matchStatus =
        auditStatusFilter === 'all' || item.status.startsWith(auditStatusFilter);
      const query = auditSearchQuery.toLowerCase();
      const matchSearch =
        !query ||
        item.originalHeadline.toLowerCase().includes(query) ||
        item.updatedHeadline.toLowerCase().includes(query) ||
        item.identifiedIssue.toLowerCase().includes(query) ||
        item.postNumber.includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchStatus && matchSearch;
    });
  }, [auditStatusFilter, auditSearchQuery]);

  // Copy handler
  const handleCopyText = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(identifier);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  const handleCopyPostCaption = (post: SocialPostItem) => {
    navigator.clipboard.writeText(post.caption);
    setCopiedPostId(post.postNumber);
    setTimeout(() => setCopiedPostId(null), 2500);
  };

  // Download 200 Posts JSON
  const handleDownloadPostsJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(SOCIAL_POSTS_200, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'purevegies-200-social-media-posts.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Download 200 Posts CSV
  const handleDownloadPostsCsv = () => {
    const headers = [
      'Post Number',
      'Pillar',
      'Format',
      'Hook',
      'Caption',
      'Script',
      'CTA',
      'Visual Direction',
      'Hashtags',
      'Target Platforms',
    ];
    const escapeCsv = (str: string) => `"${str.replace(/"/g, '""')}"`;

    const rows = SOCIAL_POSTS_200.map((p) => [
      escapeCsv(p.postNumber),
      escapeCsv(p.pillar),
      escapeCsv(p.format),
      escapeCsv(p.hook),
      escapeCsv(p.caption),
      escapeCsv(p.script),
      escapeCsv(p.cta),
      escapeCsv(p.visualDirection),
      escapeCsv(p.hashtags),
      escapeCsv(p.targetPlatforms.join(', ')),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const a = document.createElement('a');
    a.href = encodeURI(csvContent);
    a.download = 'purevegies-200-social-posts.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Download Audit JSON
  const handleDownloadAuditJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(MEDIA_KIT_AUDIT, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = 'purevegies-100-asset-audit.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const pillarsList = [
    { id: 'all', label: 'All 200 Posts', count: 200 },
    { id: 'natural farming', label: '1. Natural Farming', count: 30 },
    { id: 'managed family farming', label: '2. Managed Farming', count: 35 },
    { id: 'family food & farm-to-family', label: '3. Family Food', count: 30 },
    { id: 'weekend farm stays & vacations', label: '4. Weekend Stays', count: 35 },
    { id: 'retirement & new chapter experiences', label: '5. Retirement Escapes', count: 35 },
    { id: 'premium / hni private farm', label: '6. Private Farm (HNI)', count: 20 },
    { id: 'brand story & engagement', label: '7. Brand & Education', count: 15 },
  ];

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
                ADMIN-ONLY AREA
              </span>
              <h1 className="font-serif text-2xl font-bold text-white">
                Social Media Kit Restricted
              </h1>
              <p className="text-xs text-zinc-300 leading-relaxed">
                This media library is restricted to verified administrators. Please enter your administrator passphrase to access the library.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const ok = login(adminKeyInput.trim());
                if (!ok) setAuthError(true);
                else setAuthError(false);
              }}
              className="space-y-4 text-left"
            >
              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Admin Passphrase:
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
                <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-300 text-xs">
                  Invalid administrator credentials.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#A1D1AF] hover:bg-[#8EC9AB] text-[#102115] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Verify Admin Access</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#234531] text-[11px] text-zinc-400">
              <Link href="/admin" className="underline hover:text-white">
                Return to Admin Console
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-10">
        {/* Admin Direct Link Banner */}
        <div className="bg-[#102115] text-white p-4 rounded-2xl border border-[#2D5A3C] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#20412B] flex items-center justify-center text-[#A1D1AF]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block">
                Social Media Content Studio (With Actual Generated Images &amp; ZIPs)
              </span>
              <span className="text-xs text-zinc-300">
                Generate, approve, and download high-resolution 1080×1350 assets for all 200 posts.
              </span>
            </div>
          </div>
          <Link
            href="/admin/social-media"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A1D1AF] hover:bg-[#8EC9AB] text-[#102115] font-bold text-xs transition self-start sm:self-auto"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {/* Header Hero Banner */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172F1F] text-[#A1D1AF] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#A1D1AF]" />
            <span>PureVegies Social Media &amp; Content Command Studio</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115]">
            200 Social Media Posts &amp; Content Hub
            <br />
            <span className="text-[#628A6F] font-normal italic">
              Natural Farming • Managed Agriculture • Farm Stays • Retirement
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-3xl mx-auto">
            The complete brand marketing library: exactly 200 distinct social media posts across 7
            content pillars, 100-asset media kit audit, 20 master marketing campaigns, themed asset
            folders, and copyable CTA &amp; hashtag clusters.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
            <div className="bg-white p-3.5 rounded-2xl border border-[#D8D1C5] shadow-xs text-center">
              <span className="text-2xl font-bold font-serif text-[#102115] block">200</span>
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">
                Social Posts
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#D8D1C5] shadow-xs text-center">
              <span className="text-2xl font-bold font-serif text-[#102115] block">100</span>
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">
                Assets Audited
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#D8D1C5] shadow-xs text-center">
              <span className="text-2xl font-bold font-serif text-[#102115] block">20</span>
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">
                Master Campaigns
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-[#D8D1C5] shadow-xs text-center">
              <span className="text-2xl font-bold font-serif text-[#102115] block">10</span>
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">
                Asset Folders
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Navigation */}
        <div className="flex items-center justify-center border-b border-[#D8D1C5] overflow-x-auto gap-2 pb-px">
          <button
            onClick={() => setActiveTab('posts200')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'posts200'
                ? 'border-[#172F1F] text-[#172F1F] bg-white rounded-t-xl'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#2D5A3C]" />
            <span>200 Social Media Posts</span>
            <span className="px-2 py-0.5 rounded-full bg-[#E2ECE5] text-[#20412B] text-[10px] font-mono">
              200
            </span>
          </button>

          <button
            onClick={() => setActiveTab('audit100')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'audit100'
                ? 'border-[#172F1F] text-[#172F1F] bg-white rounded-t-xl'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#C48248]" />
            <span>100-Asset Content Audit</span>
            <span className="px-2 py-0.5 rounded-full bg-[#F4EFE7] text-[#935D29] text-[10px] font-mono">
              100
            </span>
          </button>

          <button
            onClick={() => setActiveTab('campaigns20')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'campaigns20'
                ? 'border-[#172F1F] text-[#172F1F] bg-white rounded-t-xl'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Megaphone className="w-4 h-4 text-[#20412B]" />
            <span>20 Master Campaigns</span>
            <span className="px-2 py-0.5 rounded-full bg-[#E2ECE5] text-[#20412B] text-[10px] font-mono">
              20
            </span>
          </button>

          <button
            onClick={() => setActiveTab('folders10')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'folders10'
                ? 'border-[#172F1F] text-[#172F1F] bg-white rounded-t-xl'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <FolderOpen className="w-4 h-4 text-[#2D5A3C]" />
            <span>10 Themed Folders</span>
          </button>

          <button
            onClick={() => setActiveTab('toolkit')}
            className={`flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'toolkit'
                ? 'border-[#172F1F] text-[#172F1F] bg-white rounded-t-xl'
                : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#2D5A3C]" />
            <span>Marketing Toolkit &amp; CTAs</span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: 200 SOCIAL MEDIA POSTS LIBRARY */}
        {/* ==================================================== */}
        {activeTab === 'posts200' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Toolbar */}
            <div className="bg-white p-5 rounded-3xl border border-[#D8D1C5] shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hooks, topics, hashtags (#001 - #200)..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-[#D8D1C5] bg-[#FAF8F5] text-xs focus:outline-none focus:ring-2 focus:ring-[#172F1F]"
                  />
                </div>

                {/* Actions & Export */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={handleDownloadPostsJson}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold shadow-xs transition"
                  >
                    <Download className="w-3.5 h-3.5 text-[#A1D1AF]" />
                    <span>Download JSON</span>
                  </button>

                  <button
                    onClick={handleDownloadPostsCsv}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#D8D1C5] hover:bg-zinc-50 text-zinc-800 text-xs font-semibold shadow-xs transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#2D5A3C]" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Pillar Selector Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {pillarsList.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPillar(p.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                      selectedPillar === p.id
                        ? 'bg-[#172F1F] text-white shadow-xs'
                        : 'bg-[#FAF8F5] border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
                    }`}
                  >
                    <span>{p.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        selectedPillar === p.id
                          ? 'bg-white/20 text-white'
                          : 'bg-zinc-200 text-zinc-700'
                      }`}
                    >
                      {p.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Format Filter Bar */}
              <div className="flex items-center justify-between text-xs text-zinc-600 pt-2 border-t border-zinc-100 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-semibold text-zinc-700">Format:</span>
                  {['all', 'reel', 'carousel', 'single photo', 'linkedin'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`capitalize px-2.5 py-0.5 rounded-md text-[11px] font-medium transition ${
                        selectedFormat === fmt
                          ? 'bg-[#E2ECE5] text-[#20412B] font-bold'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] text-zinc-500 font-mono">
                  Showing <strong>{filteredPosts.length}</strong> of 200 posts
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.postNumber}
                  className="bg-white rounded-3xl p-5 border border-[#D8D1C5] shadow-xs hover:shadow-md transition flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#172F1F] text-[#A1D1AF]">
                        {post.postNumber}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#D8D1C5] text-zinc-600">
                        {post.format}
                      </span>
                    </div>

                    {/* Pillar Badge */}
                    <span className="text-[11px] font-semibold text-[#2D5A3C] block">
                      {post.pillar}
                    </span>

                    {/* Hook Headline */}
                    <h3 className="font-serif font-bold text-base text-[#102115] leading-snug group-hover:text-[#20412B] transition">
                      &ldquo;{post.hook}&rdquo;
                    </h3>

                    {/* Caption Preview */}
                    <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-zinc-100 font-sans">
                      {post.caption}
                    </p>

                    {/* Visual Direction Mini */}
                    <div className="text-[11px] text-zinc-500 space-y-0.5">
                      <span className="font-semibold text-zinc-700 block">Visual Direction:</span>
                      <p className="line-clamp-2 italic">{post.visualDirection}</p>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyPostCaption(post)}
                      className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                        copiedPostId === post.postNumber
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#FAF8F5] border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
                      }`}
                    >
                      {copiedPostId === post.postNumber ? (
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

                    <button
                      onClick={() => setActiveModalPost(post)}
                      className="p-2 rounded-full bg-[#172F1F] text-white hover:bg-[#20412B] transition"
                      title="View Full Post & Script"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#A1D1AF]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: 100-ASSET CONTENT AUDIT */}
        {/* ==================================================== */}
        {activeTab === 'audit100' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Audit Executive Summary */}
            <div className="bg-[#102115] text-white p-6 sm:p-8 rounded-3xl border border-[#234531] shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C48248]">
                    Brand Positioning &amp; Compliance Audit
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                    100-Asset Media Kit Content Audit
                  </h2>
                </div>

                <button
                  onClick={handleDownloadAuditJson}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#102115] hover:bg-zinc-100 font-semibold text-xs rounded-full transition self-start sm:self-auto"
                >
                  <Download className="w-4 h-4 text-[#20412B]" />
                  <span>Download Audit (JSON)</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-[#163321] p-3 rounded-2xl border border-white/10 text-center">
                  <span className="text-xl font-bold font-mono text-emerald-400 block">Status A</span>
                  <span className="text-[11px] text-zinc-300">KEEP: Aligned</span>
                </div>
                <div className="bg-[#163321] p-3 rounded-2xl border border-white/10 text-center">
                  <span className="text-xl font-bold font-mono text-blue-400 block">Status B</span>
                  <span className="text-[11px] text-zinc-300">UPDATE: Brand Polish</span>
                </div>
                <div className="bg-[#163321] p-3 rounded-2xl border border-white/10 text-center">
                  <span className="text-xl font-bold font-mono text-amber-400 block">Status C</span>
                  <span className="text-[11px] text-zinc-300">REWRITE: Natural Farming</span>
                </div>
                <div className="bg-[#163321] p-3 rounded-2xl border border-white/10 text-center">
                  <span className="text-xl font-bold font-mono text-rose-400 block">Status D</span>
                  <span className="text-[11px] text-zinc-300">REPLACE: Land Ownership</span>
                </div>
                <div className="bg-[#163321] p-3 rounded-2xl border border-white/10 text-center col-span-2 sm:col-span-1">
                  <span className="text-xl font-bold font-mono text-purple-400 block">Status E</span>
                  <span className="text-[11px] text-zinc-300">VISUAL: Conceptual Tag</span>
                </div>
              </div>

              <div className="text-xs text-zinc-300 leading-relaxed bg-[#163321]/60 p-4 rounded-2xl border border-white/5 space-y-2">
                <p>
                  <strong>Audit Summary:</strong> All 100 existing promotional assets have been
                  thoroughly audited. References to legacy &ldquo;Farm-to-Family&rdquo; have been
                  upgraded to <strong>PureVegies</strong>. Unsupported &ldquo;100% organic&rdquo;
                  claims have been reframed into truthful <strong>Natural Farming</strong>{' '}
                  principles (living soil, microbial nourishment, zero synthetic chemicals). All
                  ambiguities regarding customer land ownership have been clarified to confirm that{' '}
                  <strong>PureVegies provides and manages all farmland</strong>.
                </p>
              </div>
            </div>

            {/* Audit Filter & Search */}
            <div className="bg-white p-4 rounded-2xl border border-[#D8D1C5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={auditSearchQuery}
                  onChange={(e) => setAuditSearchQuery(e.target.value)}
                  placeholder="Filter audit items..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-full border border-[#D8D1C5] bg-[#FAF8F5] text-xs focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['all', 'A', 'B', 'C', 'D'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setAuditStatusFilter(st)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide transition ${
                      auditStatusFilter === st
                        ? 'bg-[#172F1F] text-white'
                        : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                    }`}
                  >
                    {st === 'all' ? 'All (100)' : `Status ${st}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Audit Table / Card View */}
            <div className="space-y-4">
              {filteredAudit.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-[#D8D1C5] shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-md bg-[#172F1F] text-[#A1D1AF]">
                        #{item.postNumber}
                      </span>
                      <span className="text-xs font-bold text-zinc-800">{item.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                          item.status.startsWith('A')
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status.startsWith('B')
                            ? 'bg-blue-100 text-blue-800'
                            : item.status.startsWith('C')
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.status}
                      </span>

                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                        {item.visualTag}
                      </span>
                    </div>
                  </div>

                  {/* Issues & Recommendations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-100 space-y-1">
                      <span className="font-bold text-rose-900 block flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-rose-600" />
                        <span>Identified Issue:</span>
                      </span>
                      <p className="text-rose-800 leading-relaxed">{item.identifiedIssue}</p>
                    </div>

                    <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 space-y-1">
                      <span className="font-bold text-emerald-900 block flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Recommended Change:</span>
                      </span>
                      <p className="text-emerald-800 leading-relaxed">{item.recommendedChange}</p>
                    </div>
                  </div>

                  {/* Updated Content Preview */}
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-zinc-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#102115]">
                        Updated Headline: &ldquo;{item.updatedHeadline}&rdquo;
                      </span>
                      <button
                        onClick={() => handleCopyText(item.updatedCaption, `audit-${item.id}`)}
                        className="text-[11px] text-[#2D5A3C] font-semibold flex items-center gap-1 hover:underline"
                      >
                        {copiedSnippet === `audit-${item.id}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-zinc-400" />
                            <span>Copy Compliant Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-zinc-600 leading-relaxed font-sans">{item.updatedCopy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: 20 MASTER CAMPAIGNS */}
        {/* ==================================================== */}
        {activeTab === 'campaigns20' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8D1C5] shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A3C]">
                Strategic Growth Engine
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#102115]">
                20 Master Marketing Campaigns
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">
                Comprehensive campaign briefs with audience targeting, core messaging, visual
                mood, 5 execution angles, and standardized UTM tracking parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CAMPAIGN_CONCEPTS.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-white rounded-3xl p-6 border border-[#D8D1C5] shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#172F1F] text-[#A1D1AF]">
                        {camp.id}
                      </span>
                      <span className="text-xs font-semibold text-zinc-500">
                        Campaign #{camp.number} of 20
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#102115]">{camp.name}</h3>
                    <p className="text-xs font-semibold text-[#628A6F] italic">&ldquo;{camp.tagline}&rdquo;</p>

                    <div className="space-y-2 text-xs">
                      <div>
                        <strong className="text-zinc-800">Objective:</strong>{' '}
                        <span className="text-zinc-600">{camp.objective}</span>
                      </div>
                      <div>
                        <strong className="text-zinc-800">Target Audience:</strong>{' '}
                        <span className="text-zinc-600">{camp.targetAudience}</span>
                      </div>
                      <div>
                        <strong className="text-zinc-800">Core Message:</strong>{' '}
                        <span className="text-zinc-600">{camp.coreMessage}</span>
                      </div>
                    </div>

                    {/* 5 Post Ideas */}
                    <div className="bg-[#FAF8F5] p-3 rounded-xl border border-zinc-200 text-xs space-y-1.5">
                      <span className="font-bold text-zinc-800 block">5 Post Execution Ideas:</span>
                      <ul className="space-y-1 list-disc list-inside text-zinc-600 text-[11px]">
                        {camp.postIdeas.map((idea, i) => (
                          <li key={i}>{idea}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Campaign Footer */}
                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#20412B] bg-[#E2ECE5] px-3 py-1 rounded-full">
                      CTA: {camp.primaryCta}
                    </span>

                    <button
                      onClick={() => handleCopyText(`https://www.purevegies.in/?${camp.utmCampaign}`, camp.id)}
                      className="text-xs text-zinc-600 hover:text-zinc-900 flex items-center gap-1 font-semibold"
                      title="Copy Tracking URL"
                    >
                      {copiedSnippet === camp.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>UTM Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy UTM</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: 10 THEMED ASSET FOLDERS */}
        {/* ==================================================== */}
        {activeTab === 'folders10' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8D1C5] shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A3C]">
                Asset Architecture &amp; Photography Protocols
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#102115]">
                10 Themed Media Kit Folders
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed max-w-3xl">
                Organized structure for high-resolution photo assets, Reels b-roll, graphics, and
                conceptual renders. All planned experiences must be tagged{' '}
                <code>CONCEPTUAL / STOCK / AI</code> until operational.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ASSET_FOLDERS.map((folder, idx) => (
                <div
                  key={folder.folderName}
                  className="bg-white rounded-3xl p-6 border border-[#D8D1C5] shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-[#2D5A3C]" />
                      <h3 className="font-mono text-sm font-bold text-[#102115]">
                        {folder.folderName}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#D8D1C5] text-zinc-600">
                      Folder {idx + 1} of 10
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed">{folder.description}</p>

                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-zinc-200 text-xs space-y-1">
                    <strong className="text-zinc-800 block">Visual Guidelines:</strong>
                    <p className="text-zinc-600 text-[11px] leading-relaxed">{folder.guidelines}</p>
                  </div>

                  <div className="text-[11px] font-mono text-[#20412B] bg-[#E2ECE5] px-3 py-1.5 rounded-xl">
                    <strong>Tagging Rule:</strong> {folder.taggingRule}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: MARKETING TOOLKIT & CTAs */}
        {/* ==================================================== */}
        {activeTab === 'toolkit' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* CTA Library */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8D1C5] shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A3C]">
                  Conversion Engine
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115]">
                  Official Call-to-Action (CTA) Library
                </h2>
                <p className="text-xs text-zinc-600">
                  Targeted CTAs categorized by user persona. Click any CTA to copy the exact text.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(CTA_LIBRARY).map(([key, ctas]) => (
                  <div key={key} className="bg-[#FAF8F5] p-4 rounded-2xl border border-zinc-200 space-y-3">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#20412B]">
                      {key.toUpperCase()} CTAs
                    </h3>
                    <div className="space-y-2">
                      {ctas.map((cta, i) => (
                        <div
                          key={i}
                          onClick={() => handleCopyText(cta.text, `cta-${key}-${i}`)}
                          className="bg-white p-2.5 rounded-xl border border-[#D8D1C5] hover:border-[#172F1F] transition cursor-pointer flex items-center justify-between text-xs group"
                        >
                          <div>
                            <span className="font-bold text-zinc-800 block">&ldquo;{cta.text}&rdquo;</span>
                            <span className="text-[10px] text-zinc-500">{cta.purpose}</span>
                          </div>
                          {copiedSnippet === `cta-${key}-${i}` ? (
                            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          ) : (
                            <Copy className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hashtag Clusters */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D8D1C5] shadow-xs space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D5A3C]">
                  Discovery &amp; Reach
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#102115]">
                  Hashtag Strategy Clusters
                </h2>
                <p className="text-xs text-zinc-600">
                  Never use identical hashtags repeatedly. Copy curated sets optimized for each content pillar.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(HASHTAG_CLUSTERS).map(([key, tags]) => (
                  <div key={key} className="bg-[#FAF8F5] p-4 rounded-2xl border border-zinc-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-xs font-bold uppercase text-[#20412B]">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </h3>
                      <button
                        onClick={() => handleCopyText(tags.join(' '), `tags-${key}`)}
                        className="text-[11px] font-semibold text-[#2D5A3C] hover:underline flex items-center gap-1"
                      >
                        {copiedSnippet === `tags-${key}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-zinc-400" />
                            <span>Copy Cluster</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono bg-white px-2 py-0.5 rounded-md border border-zinc-200 text-zinc-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flagship Retirement & Farm Stay Editorial Guide */}
            <div className="bg-[#102115] text-white p-6 sm:p-10 rounded-3xl border border-[#234531] shadow-xl space-y-6">
              <div className="space-y-2 border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C48248]">
                  Long-Form Content Engine
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Retirement Blog Campaign &amp; Editorial Roadmaps
                </h2>
                <p className="text-xs text-zinc-300">
                  Strategic thought-leadership articles positioning farm stays as the ultimate celebration of retirement.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="bg-[#163321] p-5 rounded-2xl border border-white/10 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#A1D1AF] block">FLAGSHIP ARTICLE</span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    &ldquo;People Go on Honeymoon After Marriage. Why Not Go on a Farm Vacation After Retirement?&rdquo;
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    Decades of deadlines, commutes, and heavy responsibilities deserve more than a
                    standard gold wristwatch. Position retirement as the ultimate promotion to personal
                    freedom, celebrated in restorative countryside peace.
                  </p>
                  <Link
                    href="/blog/retirement-deserves-a-farm-vacation"
                    className="inline-flex items-center gap-1.5 text-xs text-[#A1D1AF] font-bold hover:underline"
                  >
                    <span>Read Published Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="bg-[#163321] p-5 rounded-2xl border border-white/10 space-y-3">
                  <span className="text-xs font-mono font-bold text-[#A1D1AF] block">EDITORIAL PIPELINE</span>
                  <ul className="space-y-2 text-zinc-300">
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#A1D1AF]" />
                      <span>10 Meaningful Ways to Celebrate Retirement in 2026</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#A1D1AF]" />
                      <span>Why Children Should Gift Their Parents an Experience, Not Objects</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#A1D1AF]" />
                      <span>The Grounding Science: Why Walking on Living Soil Restores Seniors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#A1D1AF]" />
                      <span>Farm Stays vs 5-Star Hotel Boxes: Why Simplicity Feels Luxurious</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* POST PREVIEW MODAL */}
        {/* ==================================================== */}
        {activeModalPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-3xl w-full border border-[#D8D1C5] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#172F1F] text-[#A1D1AF]">
                    {activeModalPost.postNumber}
                  </span>
                  <span className="text-xs font-semibold text-zinc-700">
                    {activeModalPost.pillar} • {activeModalPost.format}
                  </span>
                </div>
                <button
                  onClick={() => setActiveModalPost(null)}
                  className="p-1 text-zinc-400 hover:text-zinc-800 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#628A6F] block">
                    HOOK / HEADLINE
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#102115] mt-1">
                    &ldquo;{activeModalPost.hook}&rdquo;
                  </h3>
                </div>

                {/* Script / Flow */}
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-zinc-200 space-y-1.5">
                  <span className="font-bold text-zinc-800 block">
                    Execution Script / Slide Flow:
                  </span>
                  <p className="text-zinc-700 font-mono leading-relaxed whitespace-pre-wrap">
                    {activeModalPost.script}
                  </p>
                </div>

                {/* Ready to Post Caption */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-800">
                      Full Caption (Ready to Post):
                    </span>
                    <button
                      onClick={() => handleCopyPostCaption(activeModalPost)}
                      className="text-[11px] font-semibold text-[#2D5A3C] hover:underline flex items-center gap-1"
                    >
                      {copiedPostId === activeModalPost.postNumber ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
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
                  <textarea
                    readOnly
                    rows={8}
                    value={activeModalPost.caption}
                    className="w-full p-3 rounded-xl border border-[#D8D1C5] bg-white font-mono text-[11px] text-zinc-700 leading-relaxed focus:outline-none"
                  />
                </div>

                {/* Visual Direction & Platforms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                    <strong className="text-zinc-800 block mb-1">Visual Direction:</strong>
                    <p className="text-zinc-600 italic text-[11px]">{activeModalPost.visualDirection}</p>
                  </div>
                  <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                    <strong className="text-zinc-800 block mb-1">Target Platforms:</strong>
                    <div className="flex flex-wrap gap-1">
                      {activeModalPost.targetPlatforms.map((plat) => (
                        <span
                          key={plat}
                          className="px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-[10px] font-semibold text-zinc-700"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-zinc-100 bg-[#FAF8F5] flex items-center justify-between">
                <span className="text-xs font-bold text-[#20412B]">CTA: {activeModalPost.cta}</span>
                <button
                  onClick={() => setActiveModalPost(null)}
                  className="px-5 py-2 rounded-full bg-[#172F1F] text-white text-xs font-semibold hover:bg-[#20412B] transition"
                >
                  Done
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
