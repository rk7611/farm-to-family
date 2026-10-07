'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Download,
  Copy,
  Check,
  Filter,
  Search,
  ExternalLink,
  Share2,
  Layers,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface SocialPost {
  id: number;
  postNumber: string;
  badge: string;
  headline: string;
  subtitle: string;
  copy: string;
  stat: string;
  category: string;
  theme: string;
  cta: string;
  hashtags: string;
  imagePng: string;
  imageSvg: string;
  caption: string;
}

export default function SocialMediaKitPage() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeModalPost, setActiveModalPost] = useState<SocialPost | null>(null);

  useEffect(() => {
    fetch('/social-media/social-posts-catalog.json')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to load social posts:', err));
  }, []);

  const categories = [
    { id: 'all', label: 'All 100 Posts' },
    { id: 'Brand Manifesto & Core Promise', label: 'Brand Manifesto (10)' },
    { id: 'Plan Spotlights & Subscriptions', label: 'Plan Spotlights (10)' },
    { id: 'The City Problem & Solution', label: 'City Problem & Solution (10)' },
    { id: 'The 6-Step Journey', label: '6-Step Journey (10)' },
    { id: 'Trust, Science & Verification', label: 'Trust & Science (10)' },
    { id: 'Crop Spotlights & Harvest Profiles', label: 'Crop Spotlights (10)' },
    { id: 'Technology & Telemetry', label: 'Tech & IoT Camera (10)' },
    { id: 'Our Estates & Agronomists', label: 'Estates & Agronomists (10)' },
    { id: 'Farm Visits & Family Experiences', label: 'Farm Visits (10)' },
    { id: 'Nutrition, Wellness & Testimonials', label: 'Wellness & Stories (10)' },
  ];

  const filteredPosts = posts.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.copy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.stat.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyCaption = (post: SocialPost) => {
    navigator.clipboard.writeText(post.caption);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadAllJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'farm-to-family-100-social-posts.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Page Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172F1F] text-[#A1D1AF] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#A1D1AF]" />
            <span>Official Social Media Campaign Hub</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#102115]">
            100 Promotional Creatives
            <br />
            <span className="text-[#628A6F] font-normal italic">For Instagram & Facebook</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            A comprehensive, high-resolution 1080x1080 marketing suite covering our brand philosophy,
            pricing plans, living soil science, crop spotlights, farm visits, and customer stories.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleDownloadAllJson}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold rounded-full shadow-xs transition"
            >
              <FileText className="w-4 h-4 text-[#A1D1AF]" />
              <span>Download Complete 100-Post Catalog (JSON)</span>
            </button>
            <span className="text-xs text-zinc-500 font-mono">100 PNGs • 100 SVGs • Ready to Post</span>
          </div>
        </div>

        {/* Flagship AI Visual Highlights Banner */}
        <div className="bg-[#102115] text-white rounded-3xl p-6 sm:p-10 border border-[#234531] shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C48248]">
                Flagship Photorealistic Master Creatives
              </span>
              <h2 className="font-serif text-2xl font-bold text-white mt-0.5">
                Campaign Hero Visual Artwork
              </h2>
            </div>
            <span className="text-xs font-mono text-[#A1D1AF]">Ultra-HD 8K Renderings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 bg-[#163321] p-4 rounded-2xl border border-white/10">
              <div className="aspect-square rounded-xl overflow-hidden shadow-md">
                <img
                  src="/social-media/flagship-hero-01-purevegies.png"
                  alt="Flagship Harvest Estate"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">Hero 01: Private Agro-Estate & Dawn Harvest</span>
                  <span className="text-[#A1D1AF] text-[11px] font-mono">purevegies.in • purevegies.com</span>
                </div>
                <a
                  href="/social-media/flagship-hero-01-purevegies.png"
                  download="purevegies-flagship-hero-01.png"
                  className="p-2 bg-white text-[#102115] rounded-lg hover:bg-zinc-100 font-bold"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="space-y-3 bg-[#163321] p-4 rounded-2xl border border-white/10">
              <div className="aspect-square rounded-xl overflow-hidden shadow-md">
                <img
                  src="/social-media/flagship-hero-02-purevegies.png"
                  alt="Family Farm Visit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">Hero 02: Family Harvest Experience & Agronomist</span>
                  <span className="text-[#A1D1AF] text-[11px] font-mono">purevegies.in • purevegies.com</span>
                </div>
                <a
                  href="/social-media/flagship-hero-02-purevegies.png"
                  download="purevegies-family-farm-visit.png"
                  className="p-2 bg-white text-[#102115] rounded-lg hover:bg-zinc-100 font-bold"
                  title="Download Image"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search headlines, crops, or topics..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#D8D1C5] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#172F1F]"
              />
            </div>

            <div className="text-xs text-zinc-500 font-medium">
              Showing <strong className="text-zinc-900">{filteredPosts.length}</strong> of 100 promotional creatives
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === c.id
                    ? 'bg-[#172F1F] text-white shadow-xs'
                    : 'bg-white border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* 100 Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#D8D1C5] shadow-xs hover:shadow-lg transition flex flex-col justify-between group"
            >
              {/* Image Preview (Click to open modal) */}
              <div
                onClick={() => setActiveModalPost(post)}
                className="aspect-square bg-zinc-900 relative cursor-pointer overflow-hidden"
              >
                <img
                  src={post.imagePng}
                  alt={post.headline}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 text-white font-mono text-[10px] backdrop-blur-sm">
                  #{post.postNumber}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                  <span>Click to Preview & Copy</span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#628A6F] block truncate">
                    {post.badge}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-[#102115] mt-1 leading-snug line-clamp-2">
                    {post.headline} {post.subtitle}
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">{post.copy}</p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopyCaption(post)}
                    className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      copiedId === post.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#FAF8F5] border border-[#D8D1C5] text-zinc-700 hover:bg-[#F4EFE7]'
                    }`}
                  >
                    {copiedId === post.id ? (
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

                  <a
                    href={post.imagePng}
                    download={`farm-to-family-post-${post.postNumber}.png`}
                    className="p-1.5 bg-[#172F1F] hover:bg-[#20412B] text-white rounded-full transition shadow-xs"
                    title="Download 1080x1080 PNG"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Large Preview & One-Click Copy */}
        {activeModalPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-4xl w-full border border-[#D8D1C5] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
              {/* Image Preview Column */}
              <div className="md:col-span-6 bg-zinc-950 flex items-center justify-center p-4">
                <img
                  src={activeModalPost.imagePng}
                  alt={activeModalPost.headline}
                  className="w-full max-h-[70vh] object-contain rounded-xl shadow-lg"
                />
              </div>

              {/* Text & Captions Column */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#FAF8F5] space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E2ECE5] text-[#20412B] text-[11px] font-mono font-bold">
                      POST #{activeModalPost.postNumber} OF 100
                    </span>
                    <button
                      onClick={() => setActiveModalPost(null)}
                      className="p-1 text-zinc-400 hover:text-zinc-800 text-sm font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#628A6F]">
                      {activeModalPost.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#102115] mt-0.5">
                      {activeModalPost.headline} {activeModalPost.subtitle}
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 flex items-center justify-between">
                      <span>Ready-to-Post Caption (Instagram & Facebook):</span>
                      <button
                        onClick={() => handleCopyCaption(activeModalPost)}
                        className="text-[11px] text-[#2D5A3C] font-semibold flex items-center gap-1 hover:underline"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy Text</span>
                      </button>
                    </label>
                    <textarea
                      readOnly
                      rows={9}
                      value={activeModalPost.caption}
                      className="w-full p-3 rounded-xl border border-[#D8D1C5] bg-white text-xs font-mono text-zinc-700 leading-relaxed focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex items-center gap-3">
                  <a
                    href={activeModalPost.imagePng}
                    download={`farm-to-family-post-${activeModalPost.postNumber}.png`}
                    className="flex-1 py-3 px-4 bg-[#172F1F] hover:bg-[#20412B] text-white text-xs font-semibold rounded-full flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download 1080x1080 PNG</span>
                  </a>

                  <a
                    href={activeModalPost.imageSvg}
                    download={`farm-to-family-post-${activeModalPost.postNumber}.svg`}
                    className="py-3 px-4 bg-white border border-[#D8D1C5] hover:bg-zinc-50 text-zinc-800 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5"
                  >
                    <span>SVG</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
